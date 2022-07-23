import enum
from datetime import datetime
from connection import *
from sqlalchemy import Column, ForeignKey, Integer, String, Enum, DateTime, Float
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from models.common import HouseType, ElectricityBillStatus


class ElectricityBill(Base):
    __tablename__ = 'electricitybill'

    id = Column(Integer, autoincrement=True, primary_key=True)
    
    units_consumed = Column(Integer)
    amount = Column(Float)
    bill_created_on = Column(DateTime(), nullable=False)
    paid_on = Column(DateTime(), nullable=False)
    house_type = Column(String, nullable=False)
    status = Column(Enum(ElectricityBillStatus), default=ElectricityBillStatus.PENDING, nullable=False)

    created_on = Column(DateTime(), default=datetime.now(), nullable=False)
    modified_on = Column(DateTime(), default=datetime.now(), nullable=False)

    user_id = Column(Integer, ForeignKey("user.id"), index=True)
    user = relationship("User", back_populates="electricity_bills")


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, autoincrement=True, primary_key=True)
    
    name = Column(String)
    mobile = Column(String, unique=True)
    address = Column(String)
    pincode = Column(String)
    house_type = Column(Enum(HouseType), default=HouseType.HOUSE_HOLD, nullable=False)

    created_on = Column(DateTime(), default=datetime.now(), nullable=False)
    modified_on = Column(DateTime(), default=datetime.now(), nullable=False)

    electricity_bills = relationship("ElectricityBill", back_populates="user")


Base.metadata.create_all(engine)
