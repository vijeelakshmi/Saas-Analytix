from datetime import datetime, timedelta
from decimal import Decimal
from .models import DashboardMetrics

def calculate_growth_rate(current: Decimal, previous: Decimal) -> float:
    """Calculate growth rate percentage"""
    if previous == 0:
        return 0.0
    return float(((current - previous) / previous) * 100)

def generate_monthly_metrics():
    """Generate monthly metrics for dashboard"""
    from transactions.models import Transaction
    from django.db.models import Sum
    
    now = datetime.now()
    current_month = Transaction.objects.filter(
        created_at__month=now.month,
        status='completed'
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    previous_month = Transaction.objects.filter(
        created_at__month=now.month - 1 if now.month > 1 else 12,
        status='completed'
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    metrics = DashboardMetrics.objects.create(
        total_revenue=current_month,
        total_users=Transaction.objects.values('user').distinct().count(),
        growth_rate=calculate_growth_rate(current_month, previous_month),
        mrr=current_month,
        churn_rate=2.4
    )
    
    return metrics