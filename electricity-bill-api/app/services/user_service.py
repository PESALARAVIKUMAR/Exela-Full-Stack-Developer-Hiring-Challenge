from connection import session
from models.models import User
from requests.user import UserCreateRequest
from responses.common import ApiResponse


class UserService:

    def __init__(self):
        pass

    def create_user(self, request: UserCreateRequest):
        try:
            user = User(name=request.name, mobile=request.mobile, address=request.address, pincode=request.pincode)

            session.add(user)
            session.commit()
            session.close()
            
            return ApiResponse.success(data=user)
        except Exception as e:
            return ApiResponse.error(status=500, message=f"User creation failed, error = {e}")

        
    def get_users(self):
        users = session.query(User).all()

        session.close()

        return ApiResponse.success(data=users)

    def get_user(self, id):
        user = session.query(User).get(id)

        session.close()

        if user:
            return ApiResponse.success(data=user)
        else:
            return ApiResponse.error(status=404, message=f"User with id {id} not found")

    def delete_user(self, id):
        user = session.query(User).get(id)

        if user:
            session.delete(user)
            session.commit()
            session.close()
            return ApiResponse.success(data="User deleted successfully")
        else:
            return ApiResponse.error(status=404, message=f"User item with id {id} not found")

    def update_user(self, id, request: UserCreateRequest):
        try:
            user = session.query(User).get(id)

            if user:
                user.name = request.name
                user.mobile = request.mobile
                user.address = request.address
                user.pincode = request.pincode
                
                session.commit()
                session.close()
            else:
                return ApiResponse.error(status=404, message=f"User with id {id} not found")

            return ApiResponse.success(data=user)
        except Exception as e:
            return ApiResponse.error(status=500, message=f"User update failed, error = {e}")
