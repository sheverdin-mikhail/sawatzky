import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import Application
from .serializers import (
    ApplicationWithCreatorSerializer
    )

class ApplicationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        print('accepted')

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        print(text_data)
        await self.send(text_data=json.dumps({
            'message': text_data
        }))
        await self.send_new_applications()

    @sync_to_async
    def get_new_applications(self):
        new_applications = Application.objects.filter(status='new')
        application_serializer = ApplicationWithCreatorSerializer(instance=new_applications, many=True)
        return application_serializer.data

    async def send_new_applications(self):
        new_applications = await self.get_new_applications()
        await self.send(text_data=json.dumps({'new_applications': new_applications}))
