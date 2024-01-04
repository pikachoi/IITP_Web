from django.urls import path
from .consumer import LineGraphConsumer, LineGraphConsumer2

ws_urlpatterns = [
    path('ws/gg/', LineGraphConsumer.as_asgi()),
    path('ws/gg2/', LineGraphConsumer2.as_asgi()),
]