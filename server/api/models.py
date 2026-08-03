from django.db import models
from django.contrib.auth.models import User

class DashboardMetrics(models.Model):
    date = models.DateField(auto_now_add=True)
    total_revenue = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    total_users = models.IntegerField(default=0)
    active_subscribers = models.IntegerField(default=0)
    growth_rate = models.FloatField(default=0)
    mrr = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    churn_rate = models.FloatField(default=0)
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = "Dashboard Metrics"
    
    def __str__(self):
        return f"Metrics for {self.date}"

class RevenueTrend(models.Model):
    month = models.CharField(max_length=20)
    year = models.IntegerField()
    revenue = models.DecimalField(max_digits=15, decimal_places=2)
    
    class Meta:
        unique_together = ('month', 'year')
        ordering = ['year', 'month']
    
    def __str__(self):
        return f"{self.month} {self.year}: ${self.revenue}"

class SalesCategory(models.Model):
    name = models.CharField(max_length=100)
    total_sales = models.DecimalField(max_digits=15, decimal_places=2)
    percentage = models.FloatField(default=0)
    color = models.CharField(max_length=20, default='#ec4899')
    
    def __str__(self):
        return self.name

class UserSegment(models.Model):
    name = models.CharField(max_length=50)
    count = models.IntegerField()
    percentage = models.FloatField()
    
    def __str__(self):
        return self.name