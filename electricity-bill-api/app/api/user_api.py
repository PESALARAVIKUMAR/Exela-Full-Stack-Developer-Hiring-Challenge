from fastapi import APIRouter
from fastapi_utils.cbv import cbv

from requests.user import UserCreateRequest

from services.electricity_bill_service import ElectricityBillService
from services.user_service import UserService


router = APIRouter()


@cbv(router)
class UserApi:

    electricity_bill_service = ElectricityBillService()
    user_service = UserService()

    @router.post("/")
    def create_user(self, request: UserCreateRequest):
        return self.user_service.create_user(request)

    @router.get("/")
    def get_users(self):
        return self.user_service.get_users()

    @router.get("/{user_id}/bills")
    def get_user_bills(self, user_id, skip: int = 1, limit: int = 10, sortAmount: str = None):
        return self.electricity_bill_service.get_bills(user_id, page_number=skip, page_size=limit, sortAmount=sortAmount)
    
    @router.get("/{id}")
    def get_user(self, id):
        return self.user_service.get_user(id)

    @router.delete("/{id}")
    def delete_user(self, id):
        return self.user_service.delete_user(id)

    @router.post("/{id}")
    def update_user(self, id, request: UserCreateRequest):
        return self.user_service.update_user(id, request)
