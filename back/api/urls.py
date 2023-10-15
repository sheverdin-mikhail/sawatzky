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

    path('entitys/', views.LegalEntityListView.as_view()),
    path('entitys/create/', views.LegalEntityCreateView.as_view()),
    path('entitys/<int:pk>/', views.LegalEntityDetailView.as_view()),

    path('work_objects_group/', views.WorkObjectsGroupListView.as_view()),
    path('work_objects_group/create/', views.WorkObjectsGroupCreateView.as_view()),
    path('work_objects_group/<int:pk>/', views.WorkObjectsGroupDetailView.as_view()),

    path('work_material/', views.WorkMaterialListView.as_view()),
    path('work_material/create/', views.WorkMaterialCreateView.as_view()),
    path('work_material/<int:pk>/', views.WorkMaterialDetailView.as_view()),

    path('work_task/', views.WorkTaskListView.as_view()),
    path('work_task/create/', views.WorkTaskCreateView.as_view()),
    path('work_task/<int:pk>/', views.WorkTaskDetailView.as_view()),
]
