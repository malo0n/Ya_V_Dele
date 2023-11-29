from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

from .yasg import urlpatterns as yasg_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("quit.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += yasg_urls
