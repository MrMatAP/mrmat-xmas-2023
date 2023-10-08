import typing
import pydantic


class User(pydantic.BaseModel):
    id: str
    year: int = 2023
    name: str

    @staticmethod
    def from_cosmos(entry: typing.Dict):
        return User(id=entry.get('id'),
                    year=entry.get('year'),
                    name=entry.get('name'))
