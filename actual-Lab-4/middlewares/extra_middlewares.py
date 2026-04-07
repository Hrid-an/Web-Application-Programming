import logging
import time
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class LoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.start_time = time.time()
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {request.method} {request.path}")
    
    def process_response(self, request, response):
        if hasattr(request, 'start_time'):
            duration = (time.time() - request.start_time) * 1000
            print(f"Completed in {duration:.2f}ms - Status: {response.status_code}")
        return response

class ErrorHandlingMiddleware(MiddlewareMixin):
    def process_exception(self, request, exception):
        print(f"Error: {str(exception)}")
        # Log error here
        return None