from django.db import models
from tinymce.models import HTMLField


class Blog(models.Model):
    class Meta:
        db_table = "blog"

    name = models.CharField(max_length=50, null=True, blank=False, default=None)
    title = models.CharField(max_length=100, null=True, blank=False, default=None)
    # description = models.CharField(max_length=1000, null=True, default=None)
    content = HTMLField(null=True, blank=True)
    image = models.ImageField(upload_to="blog/images/", null=True, blank=True)
    tags = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name

    def get_tags(self):
        if self.tags:
            return [tag.strip() for tag in self.tags.split(",")]
        return []
