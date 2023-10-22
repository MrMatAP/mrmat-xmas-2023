import typing
import pydantic


class User(pydantic.BaseModel):
    id: str
    name: str
    greeting: str
    language: str = 'en'
    hasPicture: bool = False
    userMessage: str = ''

    @staticmethod
    def from_cosmos(entry: typing.Dict):
        return User(id=entry.get('id'),
                    name=entry.get('name'),
                    greeting=entry.get('greeting'),
                    language=entry.get('language'),
                    hasPicture=entry.get('hasPicture'),
                    userMessage=entry.get('userMessage'))


class StatusResponse(pydantic.BaseModel):
    status: int
    msg: str


class XmasException(Exception):
    code: int = 500
    msg: str = 'An unknown error occurred'

    def __init__(self, code: int, msg: str):
        super().__init__()
        self.code = code
        self.msg = msg

    def __str__(self):
        return f'[{self.code}] {self.msg}'

    def __repr__(self):
        return f'XmasException(code={self.code}, msg={self.msg})'
