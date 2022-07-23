from pydantic import BaseModel
from datetime import datetime


class ElectricityBillCreateRequest(BaseModel):
    user_id: int
    units_consumed: int
    amount: int
    bill_created_on: datetime
    paid_on: datetime
    house_type: str
