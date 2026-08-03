from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashboardViewSet, MetricsViewSet

router = DefaultRouter()
router.register(r'dashboard', DashboardViewSet, basename='dashboard')
router.register(r'metrics', MetricsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]