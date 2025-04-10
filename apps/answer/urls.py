from rest_framework.routers import DefaultRouter
from .views import AnswerViewSet

router = DefaultRouter()
router.register(r"", AnswerViewSet, basename="answer")

urlpatterns = router.urls
