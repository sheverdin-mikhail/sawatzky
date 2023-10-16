from django.contrib import admin
from .models import (
    User,
    Application,
    Client,
    Employee,
    Employee,
    LegalEntity,
    WorkTask,
    WorkTaskGroup
) 
# Register your models here.

admin.site.register(User)
admin.site.register(Application)
admin.site.register(Client)
admin.site.register(Employee)
admin.site.register(LegalEntity)
admin.site.register(WorkTask)
admin.site.register(WorkTaskGroup)