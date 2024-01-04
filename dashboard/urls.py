from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from dashboard.views import main_page

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", main_page),
    path("graphs/", include("graphs.urls")),
]

urlpatterns += static(
    prefix=settings.MEDIA_URL,
    document_root=settings.MEDIA_ROOT,
)