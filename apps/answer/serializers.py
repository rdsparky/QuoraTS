from rest_framework import serializers
from .models import Answer


class AnswerSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_id = serializers.CharField(source="user.id", read_only=True)
    question_title = serializers.CharField(source="question.title", read_only=True)
    user_email = serializers.CharField(source="user.email", read_only=True)
    # question = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Answer
        fields = [
            "id",
            "question",
            "question_title",
            "user",
            "user_id",
            "user_email",
            "content",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "user",
            "user_id",
            "user_name",
            "question_title",
            "created_at",
            "updated_at",
        ]
