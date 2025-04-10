from django.db import models
from apps.question.models import Question
from apps.user.models import User
from common.models import BaseModel


class Answer(BaseModel):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers"
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="answers")
    content = models.TextField()


class AnswerLike(BaseModel):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="liked_answers"
    )
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name="likes")

    class Meta:
        unique_together = ("user", "answer")

    def save(self, *args, **kwargs):
        if self.answer.user == self.user:
            raise ValueError("You cannot like your own answer.")
        super().save(*args, **kwargs)
