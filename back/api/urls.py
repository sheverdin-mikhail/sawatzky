from django.urls import path
from . import views

urlpatterns = [
    path('users/me/', views.AuthUserView.as_view()),
    path('users/<int:user_id>/', views.UserDetailView.as_view()),

    path('applications/', views.ApplicationListView.as_view()),
    path('applications/create/', views.ApplicationCreateView.as_view()),
    path('applications/update/<int:pk>/', views.ApplicationUpdateView.as_view()),
    path('applications/<int:pk>/', views.ApplicationDetailView.as_view()),

    path('clients/', views.ClientListView.as_view()),
    path('clients/create/', views.ClientCreateView.as_view()),
    path('clients/<int:pk>/', views.ClientDetailView.as_view()),

    path('entities/', views.LegalEntityListView.as_view()),
    path('entities/create/', views.LegalEntityCreateView.as_view()),
    path('entities/<int:pk>/', views.LegalEntityDetailView.as_view()),

    path('work_objects_groups/', views.WorkObjectsGroupListView.as_view()),
    path('work_objects_groups/create/', views.WorkObjectsGroupCreateView.as_view()),
    path('work_objects_groups/<int:pk>/', views.WorkObjectsGroupDetailView.as_view()),

    path('work_materials/', views.WorkMaterialListView.as_view()),
    path('work_materials/create/', views.WorkMaterialCreateView.as_view()),
    path('work_materials/<int:pk>/', views.WorkMaterialDetailView.as_view()),

    path('work_tasks/', views.WorkTaskListView.as_view()),
    path('work_tasks/create/', views.WorkTaskCreateView.as_view()),
    path('work_tasks/<int:pk>/', views.WorkTaskDetailView.as_view()),


    path('work_task_groups/', views.WorkTaskGroupListView.as_view()),
    path('work_task_groups/create/', views.WorkTaskGroupCreateView.as_view()),
    path('work_task_groups/<int:pk>/', views.WorkTaskGroupDetailView.as_view()),

    path('work_material_groups/', views.WorkMaterialGroupListView.as_view()),
    path('work_material_groups/create/', views.WorkMaterialGroupCreateView.as_view()),
    path('work_material_groups/<int:pk>/', views.WorkMaterialGroupDetailView.as_view()),

    path('work_objects/', views.WorkObjectListView.as_view()),
    path('work_objects/create/', views.WorkObjectCreateView.as_view()),
    path('work_objects/<int:pk>/', views.WorkObjectDetailView.as_view()),

    path('employee/create/', views.EmployeeCreateView.as_view()),

    path('documents/create/', views.DocumentsCreateView.as_view()),
    path('documents/<int:pk>/', views.DocumentsDetailView.as_view()),
]
