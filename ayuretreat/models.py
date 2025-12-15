from django.db import models
from tinymce.models import HTMLField
from datetime import timedelta, date


class AyureTreat(models.Model):
    class Meta:
        db_table = "ayuretreat"

    event_start_date = models.DateField(null=True, blank=False)
    title = models.CharField(max_length=100, null=True, blank=False, default=None)
    description = models.CharField(max_length=1000, null=True, default=None)
    image = models.ImageField(upload_to="ayuretreat/images/", null=True, blank=True)
    tags = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=False, default=None)
    days_count = models.PositiveIntegerField(
        default=7, help_text="Number of days for the retreat"
    )
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def get_tags(self):
        if self.tags:
            return [tag.strip() for tag in self.tags.split(",")]
        return []

    @property
    def end_date(self):
        if self.event_start_date and self.days_count:
            return self.event_start_date + timedelta(days=self.days_count)
        return None

    @property
    def days_remaining(self):
        if self.event_start_date:
            remaining = (self.event_start_date - date.today()).days
            return max(remaining, 0)
        return None


class RetreatHighlight(models.Model):
    class Meta:
        db_table = "retreat_highlights"

    ayure_treat = models.ForeignKey(
        AyureTreat, on_delete=models.CASCADE, related_name="highlights"
    )
    content = HTMLField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return super().__str__()


class ProgramDay(models.Model):
    class Meta:
        db_table = "program_days"

    ayure_treat = models.ForeignKey(
        AyureTreat, on_delete=models.CASCADE, related_name="program_days"
    )
    day_number = models.PositiveIntegerField()
    content = HTMLField()
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.ayure_treat.title} - Day {self.day_number}"


class Whoisitfor(models.Model):
    class Meta:
        db_table = "who_is_it_for"

    ayure_treat = models.ForeignKey(
        AyureTreat, on_delete=models.CASCADE, related_name="who_is_it_for"
    )
    description = models.TextField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"Who is it for? {self.ayure_treat.title}"


class BookingInquiry(models.Model):
    class Meta:
        db_table = "booking_inquiries"
        ordering = ["-created_at"]

    ayure_treat = models.ForeignKey(
        AyureTreat, on_delete=models.CASCADE, related_name="booking_inquiries"
    )
    name = models.CharField(max_length=100, null=False, blank=False)
    email = models.EmailField(null=False, blank=False)
    phone_number = models.CharField(max_length=10, null=False, blank=False,default=None)
    reason_for_retreat = models.TextField(
        help_text="Why the person wants to join the retreat"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.ayure_treat.title}"
