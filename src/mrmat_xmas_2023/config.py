import os
import logging
import pathlib
import dataclasses

import yaml
try:
    from yaml import CLoader as Loader, CDumper as Dumper      # pylint: disable=unused-import
except ImportError:
    from yaml import Loader, Dumper                 # pylint: disable=unused-import


class ConfigException(Exception):
    """
    A dedicated exception for mrmat-playground
    """

    def __init__(self,
                 status: int = 500,
                 msg: str = 'An unknown exception occurred',
                 task=None):
        self.status = status
        self.msg = msg
        if task:
            self.task = task
            task.state = 'failed'
            task.msg = msg

    def __repr__(self):
        return f'ConfigException(status={self.status}, msg="{self.msg}")'

    def __str__(self):
        return self.__repr__()


@dataclasses.dataclass(init=False)
class Config:
    """
    Configuration handling for mrmat_xmas_2023.

    Configuration values will pick up their values from their corresponding upper-case environment variables. If they
    are not present, a config file is provided and that config file actually exists then they are overridden by that
    config file.
    """

    backend_client_id: str = dataclasses.field(default=os.getenv('AZURE_CLIENT_ID'))
    backend_client_secret: str = dataclasses.field(default=os.getenv('AZURE_CLIENT_SECRET'))
    openapi_client_id: str = dataclasses.field(default=os.getenv('OPENAPI_CLIENT_ID'))
    testclient_client_id: str = dataclasses.field(default=os.getenv('TESTCLIENT_CLIENT_ID'))
    testclient_client_secret: str = dataclasses.field(default=os.getenv('TESTCLIENT_CLIENT_SECRET'))
    tenant_id: str = dataclasses.field(default=os.getenv('AZURE_TENANT_ID'))
    cosmos_endpoint: str = dataclasses.field(default=os.getenv('COSMOS_ENDPOINT',
                                                               'https://mrmat-cosmosdb.documents.azure.com:443/'))
    cosmos_key: str = dataclasses.field(default=os.getenv('COSMOS_KEY'))
    cosmos_db: str = dataclasses.field(default=os.getenv('COSMOS_DB',
                                                         'mrmat-cosmosdb'))
    cosmos_container: str = dataclasses.field(default=os.getenv('COSMOS_CONTAINER',
                                                                'xmas'))
    container_endpoint: str = dataclasses.field(default=os.getenv('CONTAINER_ENDPOINT',
                                                                  'https://stomrmatinfra.blob.core.windows.net/'))
    container_name: str = dataclasses.field(default=os.getenv('CONTAINER_NAME',
                                                              'xmas'))
    container_directory: str = dataclasses.field(default=os.getenv('CONTAINER_DIRECTORY',
                                                                   '2023'))

    def __init__(self, config_file: pathlib.Path = None):
        self._logger = logging.getLogger(f'{self.__class__.__module__}.{self.__class__.__name__}')
        if config_file:
            self.load(config_file)

    def load(self, config_file: pathlib.Path):
        """
        Override the defaults from a config file if it exists
        """
        if not config_file.exists():
            self._logger.debug('No configuration file exists, using defaults')
            return
        self._logger.debug(f'Loading config file at {config_file}')
        configurable = {field.name: field.type for field in dataclasses.fields(self)}
        try:
            with open(config_file, 'r', encoding='UTF-8') as c:
                configured = yaml.load(c, Loader=Loader)
                # Set the values for the intersection of what is configurable and actually configured
            for key in list(set(configurable.keys()) & set(configured.keys())):
                value = configured.get(key)
                if configurable.get(key) == pathlib.Path:
                    setattr(self, key, pathlib.Path(value))
                else:
                    setattr(self, key, value)
                self._logger.debug(f'Config file overrides {key} to {value}')
        except yaml.YAMLError as exc:
            raise ConfigException(status=400, msg='Invalid config file') from exc
