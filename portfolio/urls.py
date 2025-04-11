from django.urls import path
from portfolio.views import index, contact_view, blog_view, blog_post

urlpatterns = [
    path('', index, name='index'),
    path('contact/', contact_view, name='contact'),
    path('blog/', blog_view, name='blog'),
    path('blog/<int:post_id>/', blog_post, name='blog_post'),
]