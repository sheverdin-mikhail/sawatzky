from django.urls import path
from . import views

urlpatterns = [
    path('users/me/', views.AuthUserView.as_view()),
    path('users/<int:user_id>/', views.UserDetailView.as_view()),
    path('applications/', views.ApplicationListView.as_view()),
    path('applications/create/', views.ApplicationCreateView.as_view()),
    path('applications/<int:pk>/', views.ApplicationDetailView.as_view()),
    path('clients/', views.ClientListView.as_view()),
    path('clients/create/', views.ClientCreateView.as_view()),
    path('clients/<int:pk>/', views.ClientDetailView.as_view()),
]
