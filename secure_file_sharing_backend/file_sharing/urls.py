from django.urls import path
from .views import FileUploadView, FileDownloadView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/file-upload/', FileUploadView.as_view(), name='file-upload'),
    path('api/file-download/<int:file_id>/', FileDownloadView.as_view(), name='file-download'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
