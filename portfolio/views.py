from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from portfolio.models import Experience, Seminar, TechStack, BlogPost, Contact


def index(request):
    experiences = Experience.objects.order_by('-start_date')
    seminars = Seminar.objects.order_by('-date')
    tech_stacks = TechStack.objects.order_by('category', 'name')
    tech_categories = {tech.category for tech in tech_stacks}
    blog_posts = BlogPost.objects.order_by('-created_date')

    context = {
        'experiences': experiences,
        'seminars': seminars,
        'tech_stacks': tech_stacks,
        'tech_categories': tech_categories,
        'blog_posts': blog_posts,
    }

    return render(request, 'index.html', context)


def contact_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        if name and email and subject and message:
            Contact.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            messages.success(request, 'Your message has been sent! Thank you for reaching out.')
            return redirect('contact')
        else:
            messages.error(request, 'Please fill out all fields.')

    return render(request, 'contact.html')


def blog_view(request):
    blog_posts = BlogPost.objects.all().order_by('-created_date')
    return render(request, 'blog.html', {'blog_posts': blog_posts})


def blog_post(request, post_id):
    post = get_object_or_404(BlogPost, id=post_id)
    blog_posts = BlogPost.objects.order_by('-created_date')
    return render(request, 'blog_post.html', {'post': post, 'blog_posts': blog_posts})


def custom_404_view(request, exception):
    return render(request, '404.html', status=404)


def custom_500_view(request):
    return render(request, '500.html', status=500)