# file_sharing/views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views import View
from django.core.files.storage import FileSystemStorage
from django.conf import settings

class FileUploadView(View):
    @csrf_exempt  # Disable CSRF for this view
    def post(self, request):
        if 'file' in request.FILES:
            uploaded_file = request.FILES['file']
            fs = FileSystemStorage(location=settings.MEDIA_ROOT)
            filename = fs.save(uploaded_file.name, uploaded_file)
            return JsonResponse({'message': 'File uploaded successfully.', 'file_id': filename}, status=200)
        else:
            return JsonResponse({'error': 'No file provided.'}, status=400)


class FileDownloadView(View):
    @csrf_exempt  # Disable CSRF for this view
    def get(self, request, file_id):
        fs = FileSystemStorage(location=settings.MEDIA_ROOT)
        try:
            file_path = fs.url(file_id)  # Get file URL path
            response = fs.open(file_id)  # Open the file to send as response
            response['Content-Disposition'] = f'attachment; filename="{file_id}"'
            return response
        except:
            return JsonResponse({'error': 'File not found.'}, status=404)
