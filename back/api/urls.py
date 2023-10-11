from django.urls import path
from . import views

urlpatterns = [
    path('users/me/', views.AuthUserView.as_view()),
    path('users/<int:user_id>/', views.UserDetailView.as_view()),
    path('applications/', views.ApplicationListView.as_view()),
    path('applications/create/', views.ApplicationCreateView.as_view()),
    path('applications/<int:pk>/', views.ApplicationDetailView.as_view()),
]
