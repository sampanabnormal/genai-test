from django.db import models
from django.contrib.auth.models import User

# File model
class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=255)
    file = models.FileField(upload_to='uploads/')
    encrypted = models.BooleanField(default=False)
    shared_with = models.ManyToManyField(User, related_name='shared_files', blank=True)

    def __str__(self):
        return self.file_name
