from django.contrib import admin
from .models import *


class QuizChoiceInline(admin.TabularInline):
    model = QuizChoice
    extra = 1


@admin.register(QuizQuestion)
class QuizQuestionAdmin(admin.ModelAdmin):
    inlines = [QuizChoiceInline]
    list_display = ("question_text", "is_active", "created_at")


@admin.register(QuizChoice)
class QuizChoiceAdmin(admin.ModelAdmin):
    list_display = ("choice_text", "question", "created_at")


@admin.register(CustomerQuizLog)
class CustomerQuizLogAdmin(admin.ModelAdmin):
    list_display = ("name", "created_at")
    filter_horizontal = ("selected_choices",)


admin.site.register(Quiz)
admin.site.register(QuizImage)
