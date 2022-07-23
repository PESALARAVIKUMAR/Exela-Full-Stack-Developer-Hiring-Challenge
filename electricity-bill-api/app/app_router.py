from fastapi.routing import APIRouter

from api import electricity_bill_api, user_api

app_router = APIRouter()

app_router.include_router(electricity_bill_api.router, prefix="/v1/bill")
app_router.include_router(user_api.router, prefix="/v1/user")
