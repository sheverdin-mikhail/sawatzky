import os

from api.jwtmiddleware import JwtAuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from api.routing import websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
# Initialize Django ASGI application early to ensure the AppRegistry
# is populated before importing code that may import ORM models.
django_asgi_app = get_asgi_application()


application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": AllowedHostsOriginValidator(JwtAuthMiddlewareStack(URLRouter(websocket_urlpatterns))),
    }
)