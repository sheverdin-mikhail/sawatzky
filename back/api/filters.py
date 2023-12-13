from django_filters import rest_framework as filters

from .models import (
    Application,
    WorkTask,
    WorkMaterial,
    LegalEntity,
    SawatzkyEmployee,
)


'''Фильтр для Application'''
class ApplicationFilter(filters.FilterSet):
    legalEntity = filters.CharFilter(field_name="creator__legalEntity", lookup_expr="exact")
    ordering = filters.OrderingFilter(fields=("createdAt", 'id'), field_labels={"createdAt": "Дата создания"})
    creator = filters.CharFilter(field_name="creator__user__username", lookup_expr="exact")
    workObject = filters.CharFilter(method='filter_by_work_object')

    class Meta:
        model = Application
        fields = ['legalEntity', 'ordering', 'creator', 'workObject']

    def filter_by_work_object(self, queryset, name, value):
        workingObjects = value.split(',')
        return queryset.filter(creator__legalEntity__workObject__id__in=workingObjects)


'''Фильтр для WorkTask'''
class WorkTaskFilter(filters.FilterSet):
    status = filters.BooleanFilter(field_name="status", lookup_expr="exact")

    class Meta:
        model = WorkTask
        fields = ['status']


'''Фильтр для WorkMaterial'''
class WorkMaterialFilter(filters.FilterSet):
    status = filters.BooleanFilter(field_name="status", lookup_expr="exact")

    class Meta:
        model = WorkMaterial
        fields = ['status']


'''Фильтр для LegalEntity'''
class LegalEntityFilter(filters.FilterSet):
    status = filters.BooleanFilter(field_name="status", lookup_expr="exact")
    sawatzky = filters.BooleanFilter(field_name="sawatzky", lookup_expr="exact")
    class Meta:
        model = LegalEntity
        fields = ['sawatzky']


'''Фильтр для SawatzkyEmployee'''
class SawatzkyEmployeeFilter(filters.FilterSet):
    role = filters.ChoiceFilter(field_name='role', choices=SawatzkyEmployee.ROLES)
    class Meta:
        model = SawatzkyEmployee
        fields = ['role']
