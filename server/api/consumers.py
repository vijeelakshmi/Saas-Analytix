import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.utils import timezone
from datetime import timedelta
from decimal import Decimal

class DashboardConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'dashboard_updates'
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message', '')
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'dashboard_message',
                'message': message
            }
        )
    
    async def dashboard_message(self, event):
        message = event['message']
        
        await self.send(text_data=json.dumps({
            'message': message
        }))

class InsightsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'live_pulse'
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        
        # Start sending periodic updates
        await self.send_live_updates()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def send_live_updates(self):
        import asyncio
        while True:
            await asyncio.sleep(5)
            await self.send(text_data=json.dumps({
                'active_sessions': self.get_random_sessions(),
                'api_calls': self.get_random_api_calls(),
                'timestamp': str(timezone.now())
            }))
    
    @database_sync_to_async
    def get_random_sessions(self):
        import random
        return random.randint(1200, 2000)
    
    @database_sync_to_async
    def get_random_api_calls(self):
        import random
        return random.randint(800, 1500)