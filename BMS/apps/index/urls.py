from django.conf.urls import url

from . import views

urlpatterns = {
    url(r'', views.index, name='index'),  # 注册首页路由
}