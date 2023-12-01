from django.contrib import admin
from .models import (
    User,
    Application,
    Employee,
    Employee,
    LegalEntity,
    WorkTask,
    WorkTaskGroup,
    ApplicationWorkTask
) 
# Register your models here.

admin.site.register(User)
admin.site.register(ApplicationWorkTask)
admin.site.register(Application)
admin.site.register(Employee)
admin.site.register(LegalEntity)
admin.site.register(WorkTask)
admin.site.register(WorkTaskGroup)