# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
from django.utils.translation import gettext_lazy as _

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('email', 'full_name', 'is_staff', 'is_admin', 'is_active')
    list_filter = ('is_staff', 'is_admin', 'is_active')
    search_fields = ('email', 'full_name')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('full_name', 'bio', 'location')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_admin', 'groups', 'user_permissions')}),
        (_('Important Dates'), {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_active', 'is_staff', 'is_admin')}
        ),
    )

    filter_horizontal = ('groups', 'user_permissions',)
