from django.contrib import admin
from .models import DashboardMetrics, RevenueTrend, SalesCategory

@admin.register(DashboardMetrics)
class DashboardMetricsAdmin(admin.ModelAdmin):
    list_display = ['date', 'total_revenue', 'total_users', 'growth_rate']
    list_filter = ['date']
    search_fields = ['date']

@admin.register(RevenueTrend)
class RevenueTrendAdmin(admin.ModelAdmin):
    list_display = ['month', 'year', 'revenue']
    list_filter = ['year']

@admin.register(SalesCategory)
class SalesCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'total_sales', 'percentage']