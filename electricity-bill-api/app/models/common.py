import enum


class HouseType(str, enum.Enum):
    HOUSE_HOLD = "HOUSE_HOLD"
    COMMERCIAL = "COMMERCIAL"


class ElectricityBillStatus(str, enum.Enum):
    PENDING = "PENDING"
    PAID = "PAID"

