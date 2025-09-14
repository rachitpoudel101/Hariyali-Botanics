from django.contrib import admin
from .models import AyureTreat, RetreatHighlight, ProgramDay ,Whoisitfor, BookingInquiry
import csv
from django.http import HttpResponse

@admin.register(BookingInquiry)
class BookingInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'ayure_treat', 'reason_for_retreat')
    actions = ['export_as_csv']

    def export_as_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=booking_inquiries.csv'
        writer = csv.writer(response)
        writer.writerow(['Name', 'Email', 'AyureTreat', 'Reason'])
        for obj in queryset:
            writer.writerow([
                obj.name,
                obj.email,
                obj.ayure_treat.title if obj.ayure_treat else '',
                obj.reason_for_retreat,
            ])
        return response
    export_as_csv.short_description = "Export Selected as CSV"

admin.site.register(AyureTreat)
admin.site.register(RetreatHighlight)
admin.site.register(ProgramDay)
admin.site.register(Whoisitfor)
