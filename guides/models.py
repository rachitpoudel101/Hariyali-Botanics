from django.db import models
from tinymce.models import HTMLField


# Create your models here.
class Guide(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="guide_photos/", blank=True, null=True)

    def __str__(self):
        return self.title


class GuideModule(models.Model):
    guide = models.ForeignKey(Guide, related_name="modules", on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=True)
    # description = models.TextField(blank=True)
    content = HTMLField(null=True, blank=True)
    image = models.ImageField(upload_to="guide_module_images/", blank=True, null=True)

    def __str__(self):
        return f"{self.guide.title} - {self.title}"


class GuideFAQ(models.Model):
    guide = models.ForeignKey(Guide, related_name="faqs", on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return f"FAQ: {self.question}"


class GuideCustomerSay(models.Model):
    guide = models.ForeignKey(
        Guide, related_name="customer_says", on_delete=models.CASCADE
    )
    customer_name = models.CharField(max_length=255)
    testimonial = models.TextField()
    # image = models.ImageField(upload_to='guide_customer_images/', blank=True, null=True)

    def __str__(self):
        return f"{self.customer_name} on {self.guide.title}"


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()

    def __str__(self):
        return f"FAQ: {self.question}"
