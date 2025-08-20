from django.db import models
# ...existing code...
class Hero(models.Model):
    video = models.FileField(upload_to='hero_videos/', blank=True, null=True)

    def __str__(self):
        return f"Hero Video {self.id}"