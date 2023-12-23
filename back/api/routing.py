from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path
from .consumers import ApplicationConsumer

websocket_urlpatterns = [
    path('ws/applications', ApplicationConsumer.as_asgi()),
]