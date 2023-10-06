from django.contrib import admin
from .models import (
    User,
    Application,
    Client,
    ClientMember,
    CompanyMember,
    LegalEntity,

) 
# Register your models here.

admin.site.register(User)
admin.site.register(Application)
admin.site.register(Client)
admin.site.register(ClientMember)
admin.site.register(CompanyMember)
admin.site.register(LegalEntity)