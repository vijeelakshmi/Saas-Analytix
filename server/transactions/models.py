from django.db import models
from django.contrib.auth.models import User

class Transaction(models.Model):
    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('pending', 'Pending'),
        ('refunded', 'Refunded'),
        ('failed', 'Failed'),
    ]
    
    CATEGORY_CHOICES = [
        ('saas', 'SaaS'),
        ('support', 'Support'),
        ('consulting', 'Consulting'),
        ('api', 'API'),
    ]
    
    customer_name = models.CharField(max_length=200)
    customer_email = models.EmailField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='saas')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions', null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.customer_name} - ${self.amount}"