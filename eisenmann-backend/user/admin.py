from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from user.models import CustomUser

# Register your models here.


class UserAdminConfig(UserAdmin):
    model = CustomUser
    search_fields = ('email', 'last_name', 'first_name',)
    list_filter = ('email', 'last_name', 'first_name', 'is_active', 'is_staff')
    ordering = ('-date_joined',)
    list_display = ('email', 'last_name', 'first_name',
                    'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'password')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'last_name', 'first_name', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(CustomUser, UserAdminConfig)
