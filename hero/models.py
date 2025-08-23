from django.db import models


class Hero(models.Model):
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    video = models.FileField(upload_to="hero_videos/", blank=True, null=True)

    def __str__(self):
        return f"Hero Video {self.id} - {self.title}"
