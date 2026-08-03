import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from transactions.models import Transaction
from decimal import Decimal

# Create test user
if not User.objects.filter(username='testuser').exists():
    User.objects.create_user('testuser', 'test@example.com', 'testpass123')

# Create sample transactions
sample_transactions = [
    {'customer_name': 'Rose Petal Inc', 'customer_email': 'rose@petal.com', 'amount': 14200, 'status': 'completed', 'category': 'saas'},
    {'customer_name': 'Blush Cosmetics', 'customer_email': 'hello@blush.com', 'amount': 9750, 'status': 'completed', 'category': 'saas'},
    {'customer_name': 'Pink Spark Ventures', 'customer_email': 'info@pinkspark.com', 'amount': 4300, 'status': 'pending', 'category': 'consulting'},
    {'customer_name': 'Velvet Rose Studio', 'customer_email': 'contact@velvetrose.com', 'amount': 6290, 'status': 'completed', 'category': 'support'},
    {'customer_name': 'Rose Gold Agency', 'customer_email': 'agency@rosegold.com', 'amount': 11200, 'status': 'completed', 'category': 'saas'},
    {'customer_name': 'Crimson Tech', 'customer_email': 'tech@crimson.com', 'amount': 8400, 'status': 'completed', 'category': 'api'},
    {'customer_name': 'Pink Lotus Media', 'customer_email': 'media@pinklotus.com', 'amount': 3600, 'status': 'pending', 'category': 'consulting'},
    {'customer_name': 'Rosewater Solutions', 'customer_email': 'solutions@rosewater.com', 'amount': 15700, 'status': 'completed', 'category': 'saas'},
]

for tx in sample_transactions:
    Transaction.objects.create(**tx)

print("✅ Test data created successfully!")