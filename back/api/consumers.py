import json
from channels.generic.websocket import AsyncWebsocketConsumer, JsonWebsocketConsumer
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
            await self.accept()
            user_data = await  self.get_auth_user(user)
            if 'employee' in user_data:
                print(user_data['employee'])

            if 'sawatzkyEmployee' in user_data:
                employee = user_data['sawatzkyEmployee'] 
                await self.add_sawatzky_to_groups(employee)
                try:
                    is_dispatcher, _ = await self.get_sawatzky_employee_role(employee)
                    if is_dispatcher:
                        await self.send_new_applications()
                except Exception as e:
                    print(e)
            #     group_name = f'sawatzky_dispatcher_{employee["workingObjects"][0]}'

            # try:
            #     await self.channel_layer.group_send(
            #             group_name,
            #             {
            #                 'type': 'user_connected',
            #                 'username': 'username',
            #                 'message': f'User {user_data["fio"]} is connected!'
            #             }
            #         )
            # except Exception as e:
            #     print(e)
            # await self.send(text_data=json.dumps({'auth_user_connected': user_data}))
        except Exception as e:
            print(e)
            await self.close(code=3000)


    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            action = data.get('action')

            if action == 'create_application':
                application_data = data.get('application_data')
                work_object = application_data.get('work_object')

                dispatchers_group_name = f"sawatzky_dispatcher_{work_object}"
                await self.channel_layer.group_send(
                    dispatchers_group_name,
                    {
                        'type': 'send_application_notification',
                        'application_data': application_data
                    }
                )

        except json.JSONDecodeError:
            pass

    async def send_application_notification(self, event):
        application_data = event.get('application_data')

        await self.send(text_data=json.dumps({
            'action': 'newApplication',
            'data': application_data
        }))

    @sync_to_async
    def get_auth_user(self, user):
        user_serializer = UserSerializer(instance=user)
        return user_serializer.data
    
    async def user_connected(self, event):
        await self.send(text_data=json.dumps({
            'action': 'userConnected',
            'data': event["message"]
        }))

    @sync_to_async
    def get_new_applications(self):
        new_applications = Application.objects.filter(status='new')
        application_serializer = ApplicationWithCreatorSerializer(instance=new_applications, many=True)
        return application_serializer.data

    async def send_new_applications(self):
        new_applications = await self.get_new_applications()
        for application in new_applications:
            await self.send(text_data=json.dumps({
                'action': 'newApplication',
                'data': json.dumps(application)
            }))

    async def add_sawatzky_to_groups(self, employee):
        
        is_dispatcher, is_performer = await self.get_sawatzky_employee_role(employee)
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

    @sync_to_async
    def get_sawatzky_employee_role(self, employee):
        is_dispatcher = [True if employee['role'] == 'dispatcher' or employee['role'] == 'dispatcherPerformer' else False]
        is_performer = [True if employee['role'] == 'performer' or employee['role'] == 'dispatcherPerformer' else False]
        return [is_dispatcher, is_performer]
