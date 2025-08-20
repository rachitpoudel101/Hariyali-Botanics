
from django.shortcuts import render

from .models import HeroSection

# def hero_section(request):
# 	hero = HeroSection.objects.first()
# 	video_url = hero.video_url if hero and hero.video_url else '/static/media/test.mp4'
# 	return render(request, 'base/hero.html', {'video_url': video_url})
