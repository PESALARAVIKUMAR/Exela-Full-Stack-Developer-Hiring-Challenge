from fastapi import APIRouter
from fastapi_utils.cbv import cbv

from requests.electricity_bill import ElectricityBillCreateRequest
from services.electricity_bill_service import ElectricityBillService

router = APIRouter()


@cbv(router)
class ElectricityBillApi:

    electricity_bill_service = ElectricityBillService()

    @router.post("/")
    def create_bill(self, request: ElectricityBillCreateRequest):
        return self.electricity_bill_service.create_bill(request)

    @router.get("/")
    def get_bills(self, skip: int = 1, limit: int = 10):
        return self.electricity_bill_service.get_bills(page_number=skip, page_size=limit)
    
    @router.get("/{id}")
    def get_bill(self, id):
        return self.electricity_bill_service.get_bill(id)

    @router.delete("/{id}")
    def delete_bill(self, id):
        return self.electricity_bill_service.delete_bill(id)

    @router.post("/{id}")
    def update_bill(self, id, request: ElectricityBillCreateRequest):
        return self.electricity_bill_service.update_bill(id, request)
