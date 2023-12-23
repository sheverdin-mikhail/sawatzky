import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async, async_to_sync
from .models import Application
from .serializers import (
    ApplicationWithCreatorSerializer,
    UserSerializer
    )

class ApplicationConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        user = self.scope['user']
        try:
            self.work_object_group_name = f"work_object_{user}"

            await self.accept()
            user_data = await  self.get_auth_user(user)
            if 'employee' in user_data:
                print(user_data['employee'])

            if 'sawatzkyEmployee' in user_data:
                employee = user_data['sawatzkyEmployee'] 
                await self.add_sawatzky_to_groups(employee)

            await self.send(text_data=json.dumps({'auth_user_connected': user_data}))
        except:
            await self.close()
        


    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        pass

    @sync_to_async
    def get_auth_user(self, user):
        user_serializer = UserSerializer(instance=user)
        return user_serializer.data

    @sync_to_async
    def get_new_applications(self):
        new_applications = Application.objects.filter(status='new')
        application_serializer = ApplicationWithCreatorSerializer(instance=new_applications, many=True)
        return application_serializer.data

    async def send_new_applications(self):
        new_applications = await self.get_new_applications()
        await self.send(text_data=json.dumps({'new_applications': new_applications}))

    async def add_sawatzky_to_groups(self, employee):
        is_dispatcher = [True if employee['role'] == 'dispatcher' or employee['role'] == 'dispatcherPerformer' else False]
        is_performer = [True if employee['role'] == 'performer' or employee['role'] == 'dispatcherPerformer' else False]

        try:
            if is_dispatcher:
                for work_object in employee['workingObjects']:
                    self.user_group_name = f"sawatzky_dispatcher_{work_object}"
                    await self.channel_layer.group_add(
                        self.user_group_name, self.channel_name
                    )
        except Exception as e:
            print(e)    
        try:
            if is_performer:
                for work_object in employee['workingObjects']:
                    self.user_group_name = f"sawatzky_performer_{work_object}"
                    await self.channel_layer.group_add(
                        self.user_group_name, self.channel_name
                    )
        except Exception as e:
            print(e)
    
    # async def add_clients_to_groups(self, employee):
    #     is_dispatcher = [True if employee['role'] == 'dispatcher' or employee['role'] == 'dispatcherPerformer' else False]
    #     is_performer = [True if employee['role'] == 'performer' or employee['role'] == 'dispatcherPerformer' else False]

    #     try:
    #         if is_dispatcher:
    #             for work_object in employee['workingObjects']:
    #                 self.user_group_name = f"sawatzky_dispatcher_{work_object['id']}"
    #                 await self.channel_layer.group_add(
    #                     self.user_group_name, self.channel_name
    #                 )
    #     except Exception as e:
    #         print(e)    
    #     try:
    #         if is_performer:
    #             for work_object in employee['workingObjects']:
    #                 self.user_group_name = f"sawatzky_performer_{work_object['id']}"
    #                 await self.channel_layer.group_add(
    #                     self.user_group_name, self.channel_name
    #                 )
    #     except Exception as e:
    #         print(e)
