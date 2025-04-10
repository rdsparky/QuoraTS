from rest_framework import viewsets, permissions
from .models import Answer
from .serializers import AnswerSerializer
from django_filters.rest_framework import DjangoFilterBackend


class AnswerViewSet(viewsets.ModelViewSet):
    serializer_class = AnswerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["user", "question"]

    def get_queryset(self):
        return Answer.objects.filter(is_active=True)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
