from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Sum, Count
from .models import Transaction
from .serializers import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [AllowAny]  # Changed to AllowAny for testing
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['customer_name', 'customer_email']
    ordering_fields = ['amount', 'created_at']
    ordering = ['-created_at']
    
    def get_queryset(self):
        return Transaction.objects.all()  # Return all for testing
    
    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get transaction summary statistics"""
        queryset = self.get_queryset()
        
        total_transactions = queryset.count()
        total_revenue = queryset.aggregate(total=Sum('amount'))['total'] or 0
        avg_transaction = queryset.aggregate(avg=Sum('amount'))['avg'] or 0
        
        data = {
            'total_transactions': total_transactions,
            'total_revenue': total_revenue,
            'average_transaction': avg_transaction,
            'completed_count': queryset.filter(status='completed').count(),
            'pending_count': queryset.filter(status='pending').count(),
        }
        return Response(data)