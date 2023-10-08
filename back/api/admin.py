from django.contrib import admin
from .models import (
    User,
    Application,
    Client,
    Employee,
    Employee,
    LegalEntity,

) 
# Register your models here.

admin.site.register(User)
admin.site.register(Application)
admin.site.register(Client)
admin.site.register(Employee)
admin.site.register(LegalEntity)