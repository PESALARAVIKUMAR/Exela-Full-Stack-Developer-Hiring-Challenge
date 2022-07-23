from pydantic import BaseModel
from datetime import datetime
from models.common import HouseType

class UserCreateRequest(BaseModel):
    name: str
    mobile: str
    address: str
    pincode: str
