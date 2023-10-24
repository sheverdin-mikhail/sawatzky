from django_filters import rest_framework as filters

from .models import (
    Application
)


#Фильтр для Application
class ApplicationFilter(filters.FilterSet):

    class Meta:
        model = Application
        fields = []