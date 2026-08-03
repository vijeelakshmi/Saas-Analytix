from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.models import Sum, Count, Avg
from django.utils import timezone
from datetime import timedelta
from .models import DashboardMetrics, RevenueTrend, SalesCategory, UserSegment
from .serializers import (
    DashboardMetricsSerializer, RevenueTrendSerializer, 
    SalesCategorySerializer, UserSegmentSerializer
)

class DashboardViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    def kpi_data(self, request):
        """Get all KPI metrics for dashboard"""
        data = {
            'total_revenue': 214280,
            'total_users': 34892,
            'active_users': 28450,
            'mrr': 118200,
            'growth_rate': 18.9,
            'churn_rate': 2.4,
            'arpu': 57.40,
            'ltv': 4520,
        }
        return Response(data)
    
    @action(detail=False, methods=['get'])
    def revenue_trend(self, request):
        """Get revenue trend for chart"""
        trends = [
            {'month': 'Jan', 'year': 2025, 'revenue': 72000},
            {'month': 'Feb', 'year': 2025, 'revenue': 79000},
            {'month': 'Mar', 'year': 2025, 'revenue': 88000},
            {'month': 'Apr', 'year': 2025, 'revenue': 105000},
            {'month': 'May', 'year': 2025, 'revenue': 124000},
            {'month': 'Jun', 'year': 2025, 'revenue': 142000},
        ]
        return Response(trends)
    
    @action(detail=False, methods=['get'])
    def sales_by_category(self, request):
        """Get sales distribution by category"""
        data = [
            {'name': 'SaaS', 'total_sales': 62300, 'percentage': 45},
            {'name': 'Support', 'total_sales': 35400, 'percentage': 25},
            {'name': 'Consulting', 'total_sales': 21200, 'percentage': 15},
            {'name': 'API', 'total_sales': 10800, 'percentage': 15},
        ]
        return Response(data)
    
    @action(detail=False, methods=['get'])
    def user_segments(self, request):
        """Get user segmentation data"""
        data = [
            {'name': 'Free Users', 'count': 19800, 'percentage': 56},
            {'name': 'Premium Rose', 'count': 15200, 'percentage': 44},
        ]
        return Response(data)


class MetricsViewSet(viewsets.ModelViewSet):
    """ViewSet for Dashboard Metrics"""
    queryset = DashboardMetrics.objects.all()
    serializer_class = DashboardMetricsSerializer
    permission_classes = [AllowAny]