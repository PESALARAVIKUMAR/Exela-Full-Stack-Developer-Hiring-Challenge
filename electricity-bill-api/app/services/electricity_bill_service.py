from connection import session
from models.common import ElectricityBillStatus
from models.models import ElectricityBill
from requests.electricity_bill import ElectricityBillCreateRequest
from responses.common import ApiResponse
from sqlalchemy import desc, asc


class ElectricityBillService:

    def __init__(self):
        pass

    def create_bill(self, request: ElectricityBillCreateRequest):
        try:
            bill = ElectricityBill(user_id=request.user_id, units_consumed=request.units_consumed, amount=request.amount,
                bill_created_on=request.bill_created_on, paid_on=request.paid_on, house_type=request.house_type, status=ElectricityBillStatus.PAID)

            session.add(bill)
            session.commit()
            session.close()
            
            return ApiResponse.success(data=bill)
        except Exception as e:
            return ApiResponse.error(status=500, message=f"Bill creation failed, error = {e}")

        
    def get_bills(self, user_id=None, page_number=1, page_size=10, sortAmount=None):
        bills = []
        skip = (page_number - 1) * page_size
        limit = page_size
        if user_id:
            base_query = session.query(ElectricityBill).filter(ElectricityBill.user_id==user_id)

            if sortAmount:
                base_query = base_query.order_by(asc(ElectricityBill.amount)) if sortAmount == 'ASC' else base_query.order_by(desc(ElectricityBill.amount))
            
            bills = base_query.offset(skip).limit(limit).all()
            total_bills_count = base_query.count()
        else:
            bills = session.query(ElectricityBill).all()
        

        session.close()

        return ApiResponse.success(data={'bills': bills, 'count': total_bills_count})

    def get_bill(self, id):
        bill = session.query(ElectricityBill).get(id)

        session.close()

        if bill:
            return ApiResponse.success(data=bill)
        else:
            return ApiResponse.error(status=404, message=f"Bill item with id {id} not found")

    def delete_bill(self, id):
        bill = session.query(ElectricityBill).get(id)

        if bill:
            session.delete(bill)
            session.commit()
            session.close()
            return ApiResponse.success(data="Bill deleted successfully")
        else:
            return ApiResponse.error(status=404, message=f"Bill item with id {id} not found")

    def update_bill(self, id, request: ElectricityBillCreateRequest):
        try:
            bill = session.query(ElectricityBill).get(id)

            if bill:
                bill.units_consumed = request.units_consumed
                bill.amount = request.amount
                bill.bill_created_on = request.bill_created_on
                bill.paid_on = request.paid_on
                bill.house_type = request.house_type
                
                session.commit()
                session.close()
            else:
                return ApiResponse.error(status=404, message=f"Bill item with id {id} not found")

            return ApiResponse.success(data=bill)
        except Exception as e:
            return ApiResponse.error(status=500, message=f"Bill update failed, error = {e}")
