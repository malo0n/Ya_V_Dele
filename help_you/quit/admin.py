from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import BadHabits


USER = get_user_model()


class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'username', 'date_of_birth', 'about_me', 'gender')
    list_display_links = ('name', 'username')
    search_fields = ('name',)
    list_filter = ('name',)


class BadHabitsAdmin(admin.ModelAdmin):
    list_display = ('title',)
    list_display_links = ('title',)
    search_fields = ('title',)
    list_filter = ('title',)


admin.site.register(USER, UserAdmin)
admin.site.register(BadHabits, BadHabitsAdmin)