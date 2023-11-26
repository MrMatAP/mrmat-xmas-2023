import pytest
import fastapi.testclient

from conftest import missing_configuration
from mrmat_xmas_2023 import __version_header__, __version__, cosmos_container_client
from mrmat_xmas_2023.model import User, StatusResponse


def test_healthz(client: fastapi.testclient.TestClient):
    """
    Make sure we get a response header containing the API version is in the healthz response
    Args:
        testclient: Test API client from the fixture
    """
    response = client.get('/api/healthz')
    assert response.status_code == 200
    assert __version_header__ in response.headers
    assert response.headers.get(__version_header__) == __version__


@pytest.mark.skipif(missing_configuration(), reason='Missing configuration')
def test_get_users(client: fastapi.testclient.TestClient,
                   admin_token: str):
    response = client.get('/api/users')
    assert response.status_code == 401
    assert response.headers.get(__version_header__) == __version__

    response = client.get('/api/users', headers={'Authorization': f'Bearer {admin_token}'})
    assert response.status_code == 200
    assert type(response.json()) is list


@pytest.mark.skipif(missing_configuration(), reason='Missing configuration')
def test_create_user(client: fastapi.testclient.TestClient,
                     admin_token: str,
                     test_user: User):
    response = client.post('/api/users')
    assert response.status_code == 401
    assert response.headers.get(__version_header__) == __version__

    response = client.post('/api/users',
                           headers={'Authorization': f'Bearer {admin_token}'},
                           json=test_user.model_dump())
    assert response.status_code == 200
    output = response.json()
    assert type(output) is dict
    user = User.model_validate(output)
    assert user.id != test_user.id  # We want an auto-generated uuid
    assert user.name == test_user.name
    assert user.greeting == test_user.greeting
    assert user.language == test_user.language
    assert user.hasPicture == test_user.hasPicture
    assert user.userMessage == test_user.userMessage
    assert user.year == test_user.year

    xmas_container_client = cosmos_container_client()
    xmas_container_client.delete_item(item=user.id, partition_key=user.id)


@pytest.mark.skipif(missing_configuration(), reason='Missing configuration')
def test_get_user(client: fastapi.testclient.TestClient,
                  test_user_created: User):
    response = client.get(f'/api/users/{test_user_created.id}')
    assert response.status_code == 200
    user = User.model_validate(response.json())
    assert user.id == test_user_created.id
    assert user.name == test_user_created.name
    assert user.greeting == test_user_created.greeting
    assert user.language == test_user_created.language
    assert user.hasPicture == test_user_created.hasPicture
    assert user.userMessage == test_user_created.userMessage
    assert user.year == test_user_created.year


@pytest.mark.skipif(missing_configuration(), reason='Missing configuration')
def test_update_user(client: fastapi.testclient.TestClient,
                     test_user_created: User):
    test_user_created.userMessage = 'Updated message'
    response = client.put(f'/api/users/{test_user_created.id}', json=test_user_created.model_dump())
    assert response.status_code == 200
    user = User.model_validate(response.json())
    assert user.id == test_user_created.id
    assert user.name == test_user_created.name
    assert user.greeting == test_user_created.greeting
    assert user.language == test_user_created.language
    assert user.hasPicture == test_user_created.hasPicture
    assert user.userMessage == test_user_created.userMessage
    assert user.year == test_user_created.year


def test_unknown_user(client: fastapi.testclient.TestClient):
    response = client.get(f'/api/users/i-dont-exist')
    assert response.status_code == 401
    output = StatusResponse.model_validate(response.json())
    assert output.status == 401
    assert output.msg == 'Hello Stranger'
