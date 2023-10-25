from django_filters import rest_framework as filters

from .models import (
    Application
)


'''Фильтр для Application'''
class ApplicationFilter(filters.FilterSet):
    legal_entity = filters.CharFilter(field_name="creator__legalEntity", lookup_expr="exact")
    ordering = filters.OrderingFilter(fields=("createdAt",'id'), field_labels={"createdAt": "Дата создания"})

    class Meta:
        model = Application
        fields = ['legal_entity', 'ordering']