from django_filters import rest_framework as filters

from .models import (
    Application,
    WorkTask,
    WorkMaterial,
    LegalEntity,
)


'''Фильтр для Application'''
class ApplicationFilter(filters.FilterSet):
    legal_entity = filters.CharFilter(field_name="creator__legalEntity", lookup_expr="exact")
    ordering = filters.OrderingFilter(fields=("createdAt", 'id'), field_labels={"createdAt": "Дата создания"})

    class Meta:
        model = Application
        fields = ['legal_entity', 'ordering']


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
    sawatzki = filters.BooleanFilter(field_name="sawatzki", lookup_expr="exact")
    class Meta:
        model = LegalEntity
        fields = ['sawatzki']

