from django.shortcuts import render, get_object_or_404
from .models import Blog


def index(request):
    """Main index page view with top blogs"""
    blogs = Blog.objects.all().order_by("-id")[:4]  
    return render(request, "Normal/index.html", {"blogs": blogs})


def blog(request):
    blogs = Blog.objects.all().order_by("-id")  
    print(f"Found {blogs.count()} blogs")  
    return render(request, "Normal/blog.html", {"blogs": blogs})


def blog_detail(request, blog_id):
    blog = get_object_or_404(Blog, id=blog_id)
    return render(request, "Normal/blog-detail.html", {"blog": blog})


def get_top_blogs(request):
    """Get top 3 blogs for homepage"""
    image = Blog.objects.filter(is_top=True).first()  
    if image:
        return render(request, "Normal/blog.html", {"image": image})
