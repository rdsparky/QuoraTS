from django.contrib import admin
from .models import Answer, AnswerLike


# Register your models here.
class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 0
    readonly_fields = ("user", "content", "created_at", "updated_at")
    can_delete = False


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ("question", "user", "short_content", "created_at")
    search_fields = ("content", "user__email", "question__title")
    list_filter = ("created_at",)

    def short_content(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content

    short_content.short_description = "Content"


@admin.register(AnswerLike)
class AnswerLikeAdmin(admin.ModelAdmin):
    list_display = ("user", "answer", "created_at")
    search_fields = ("user__email", "answer__content")
