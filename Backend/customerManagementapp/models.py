from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10, blank=True, default='')
    address = models.TextField(max_length=200)
    company = models.CharField(max_length=100)

