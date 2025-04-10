from django.contrib import admin
from .models import Question
from apps.answer.admin import AnswerInline

# Register your models here.


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "created_at", "updated_at")
    list_filter = ("created_at", "tags")
    search_fields = ("title", "body", "user__email")
    inlines = [AnswerInline]
    filter_horizontal = ("tags",)
