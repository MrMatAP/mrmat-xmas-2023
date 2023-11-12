import azure.identity
import azure.cosmos
import azure.storage
import azure.storage.blob

from .config import Config


class AppIdentity:
    """
    A FastAPI dependency class holding the application AAD identity as a singleton
    """

    def __init__(self):
        self.identity = azure.identity.DefaultAzureCredential()

    def close(self):
        if self.identity:
            self.identity.close()

    def __call__(self, *args, **kwargs):
        return self.identity


class CosmosContainerClient:
    """
    A FastAPI dependency class holding the Azure Cosmos Client as a singleton
    """

    def __init__(self, config: Config, app_identity: AppIdentity):
        cosmos_client = azure.cosmos.CosmosClient(url=config.cosmos_endpoint, credential=app_identity())
        database_client = cosmos_client.get_database_client(config.cosmos_db)
        self.cosmos_container_client = database_client.get_container_client(config.cosmos_container)

    def __call__(self, *args, **kwargs) -> azure.cosmos.ContainerProxy:
        return self.cosmos_container_client


class BlobContainerClient:
    """
    A FastAPI dependency class holding the Azure Blob Container Client as a singleton
    """

    def __init__(self, config: Config, app_identity: AppIdentity):
        self.blob_container_client = azure.storage.blob.ContainerClient(account_url=config.container_endpoint,
                                                                        container_name=config.container_name,
                                                                        credential=app_identity())

    def close(self):
        if self.blob_container_client:
            self.blob_container_client.close()

    def __call__(self, *args, **kwargs) -> azure.storage.blob.ContainerClient:
        return self.blob_container_client
