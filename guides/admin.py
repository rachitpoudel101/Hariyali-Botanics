from django.contrib import admin
from .models import Guide, GuideModule, GuideFAQ, GuideCustomerSay, FAQ

admin.site.register(Guide)
admin.site.register(GuideModule)
admin.site.register(GuideFAQ)
admin.site.register(GuideCustomerSay)
admin.site.register(FAQ)
