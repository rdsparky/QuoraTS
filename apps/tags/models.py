from django.db import models
from common.models import BaseModel
# Create your models here.


class Tag(BaseModel):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name
