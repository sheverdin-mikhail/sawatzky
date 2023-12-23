import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Application

class ApplicationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        pass

    @sync_to_async
    def get_new_applications(self):
        new_applications = Application.objects.filter(status='new').count()
        return new_applications

    async def send_new_applications(self, event):
        new_applications = await self.get_new_applications()
        await self.send(text_data=json.dumps({'new_applications': new_applications}))
