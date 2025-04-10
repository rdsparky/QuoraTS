from django.db import models
from apps.user.models import User
from common.models import BaseModel
from apps.tags.models import Tag


class Question(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="questions")
    title = models.CharField(max_length=255)
    body = models.TextField()
    tags = models.ManyToManyField(Tag, related_name="questions", blank=True)

    def __str__(self):
        return f"{self.title}-{self.user}"
