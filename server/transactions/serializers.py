from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    formatted_amount = serializers.SerializerMethodField()
    formatted_date = serializers.SerializerMethodField()
    
    class Meta:
        model = Transaction
        fields = [
            'id', 'customer_name', 'customer_email', 'amount', 'formatted_amount',
            'status', 'category', 'description', 'created_at', 'formatted_date', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_formatted_amount(self, obj):
        return f"${obj.amount:,.2f}"
    
    def get_formatted_date(self, obj):
        return obj.created_at.strftime("%b %d, %Y")