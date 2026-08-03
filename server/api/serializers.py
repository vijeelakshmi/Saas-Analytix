from rest_framework import serializers
from .models import DashboardMetrics, RevenueTrend, SalesCategory, UserSegment

class DashboardMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardMetrics
        fields = '__all__'

class RevenueTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevenueTrend
        fields = '__all__'

class SalesCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesCategory
        fields = '__all__'

class UserSegmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSegment
        fields = '__all__'

class KPISerializer(serializers.Serializer):
    total_revenue = serializers.DecimalField(max_digits=15, decimal_places=2)
    total_users = serializers.IntegerField()
    active_users = serializers.IntegerField()
    mrr = serializers.DecimalField(max_digits=15, decimal_places=2)
    growth_rate = serializers.FloatField()
    churn_rate = serializers.FloatField()
    arpu = serializers.DecimalField(max_digits=10, decimal_places=2)
    ltv = serializers.DecimalField(max_digits=10, decimal_places=2)