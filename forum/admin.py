from django.contrib import admin
from .models import Forum,ForumComments

# Register your models here.
admin.site.register(Forum)
admin.site.register(ForumComments)