import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from channels.exceptions import DenyConnection
from rest_framework.authtoken.models import Token

from .models import Message


class ChatConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def sync_database_operation(self, content, sender):
        Message.objects.create(content=content, chat_id=self.chat, sender_id=sender)


    @database_sync_to_async
    def get_user_from_token(self, token):
        try:
            return Token.objects.get(key=token).user
        except Token.DoesNotExist:
            return None
    

    async def connect(self):
        try:
            params = self.scope.get('query_string').decode('utf-8')
            params_dict = {}
            for key_value in params.split('&'):
                params = key_value.split('=')
                if len(params) == 2:
                    key, value = params
                    params_dict[key] = value
                else:
                    pass
            # params_dict = dict(kv.split('=') for kv in params.split('&'))
            self.chat = params_dict.get('chat_id', None)
        except:
            pass
        try:
            headers = self.scope.get('headers')
            for key, value in headers:
                if key == b'authorization':
                    authorization_value = value
            token = authorization_value.decode('utf-8').split()[-1]
            self.user = await self.get_user_from_token(token)
        except:
            pass
        if self.user:
            await self.channel_layer.group_add(
                f"chat_room_{self.chat}",
                self.channel_name
            )
            await self.accept()
        else:
            raise DenyConnection


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
                f"chat_room_{self.chat}",
                self.channel_name
            )


    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        content = text_data_json["content"]
        sender = self.user.id
        await self.sync_database_operation(content, sender)
        if self.user:
            await self.channel_layer.group_send(
                f"chat_room_{self.chat}",
                {
                    'type': 'chat.message',
                    'message': content
                }
            )
       

    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({'content': message}))
        