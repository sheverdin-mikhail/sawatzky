from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include 

from .swagger import schema_view

urlpatterns = [
    
    path('api/v1/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'), # API Документация Swagger
    path('api/admin/', admin.site.urls), # Админка
    path('api/v1/', include('api.urls')), # Апишка
    path('api/auth/', include('djoser.urls.jwt')), # Аунтификация по JWT

]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
