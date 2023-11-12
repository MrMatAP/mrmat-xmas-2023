import pytest
import fastapi.testclient
import azure.identity
from mrmat_xmas_2023 import app, config, cosmos_container_client
from mrmat_xmas_2023.model import User


def missing_configuration() -> bool:
    """
    Conditional to determine whether to skip a test because we lack the necessary configuration for admin credentials
    Args:
        config: The configuration object

    Returns:
        True when lacking configuration for testing with admin credentials, True otherwise
    """
    return config.tenant_id is None or config.testclient_client_id is None or config.testclient_client_secret is None


@pytest.fixture(scope='session')
def admin_token() -> str | bool:
    creds = azure.identity.ClientSecretCredential(tenant_id=config.tenant_id,
                                                  client_id=config.testclient_client_id,
                                                  client_secret=config.testclient_client_secret)
    return creds.get_token('api://xmas-backend/.default', tenant_id=config.tenant_id).token


@pytest.fixture(scope='session')
def client() -> fastapi.testclient.TestClient:
    yield fastapi.testclient.TestClient(app)


@pytest.fixture(scope='session')
def admin_client(client, admin_token) -> fastapi.testclient.TestClient:
    client.headers['Authorization'] = f'Bearer {admin_token}'
    yield client


@pytest.fixture(scope='session')
def test_user() -> User:
    return User(id='0', name='Test Person', greeting='Merry Test Christmas', language='en', hasPicture=False,
                userMessage='Everything is awesome')


@pytest.fixture(scope='session')
def test_user_created(test_user) -> User:
    xmas_container_client = cosmos_container_client()
    try:
        created = xmas_container_client.create_item(body=test_user.model_dump())
        yield User.from_cosmos(created)
    finally:
        xmas_container_client.delete_item(item=test_user.id, partition_key=test_user.id)
