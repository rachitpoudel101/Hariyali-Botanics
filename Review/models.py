from django.db import models


class CustomerReview(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100, blank=True)
    testimonial = models.TextField()

    def __str__(self):
        return f"{self.name} ({self.location})"
