from django.db import models
from django.utils import timezone


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    summary = models.CharField(max_length=500)
    image_url = models.CharField(max_length=500)
    created_date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=50)

    def __str__(self):
        return f'<BlogPost {self.title}>'


class Experience(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f'{self.title} at {self.company}'


class Seminar(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    location = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.title


class TechStack(models.Model):
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    proficiency = models.IntegerField()  # You might want to add validation for 1-10

    def __str__(self):
        return self.name


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'Contact from {self.name}'