from rest_framework import serializers
from .models import Question
from apps.tags.models import Tag


class QuestionSerializer(serializers.ModelSerializer):
    tags = serializers.ListField(child=serializers.CharField(), write_only=True)
    tag_names = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Question
        fields = [
            "id",
            "title",
            "body",
            "tags",
            "tag_names",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def get_tag_names(self, obj):
        return [tag.name for tag in obj.tags.all()]

    def create(self, validated_data):
        tag_names = validated_data.pop("tags", [])
        user = self.context["request"].user
        question = Question.objects.create(user=user, **validated_data)
        self._handle_tags(question, tag_names)
        return question

    def update(self, instance, validated_data):
        tag_names = validated_data.pop("tags", [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        self._handle_tags(instance, tag_names)
        return instance

    def _handle_tags(self, question, tag_names):
        tag_objs = []
        for tag_name in tag_names:
            tag, _ = Tag.objects.get_or_create(name=tag_name.lower())
            tag_objs.append(tag)
        question.tags.set(tag_objs)
