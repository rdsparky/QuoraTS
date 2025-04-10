from rest_framework import viewsets, permissions
from .models import Question
from .serializers import QuestionSerializer
from django_filters.rest_framework import DjangoFilterBackend


class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user"]

    def get_queryset(self):
        return Question.objects.filter(is_active=True)
