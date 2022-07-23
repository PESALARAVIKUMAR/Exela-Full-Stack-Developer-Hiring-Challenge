class ApiResponse:
    def success(status = 200, data = None):
        return { 'status': status, 'data': data }

    def error(status = 500, message = "Something error occurred"):
        return { 'status': status, 'error': message }