from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate


class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "full_name", "password", "bio", "location"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create_user(password=password, **validated_data)
        return user


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    id = serializers.UUIDField(read_only=True)
    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "full_name",
            "password",
            "bio",
            "location",
        ]

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(username=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password.")

        token = user.generate_tokens()

        return {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name,
            "bio": user.bio,
            "location": user.location,
            "access": token["access"],
            "refresh": token["refresh"],
        }
