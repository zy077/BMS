from django.conf.urls import url

from . import views

# urlpatterns是django自动识别的路由列表变量
urlpatterns = {
    url(r'^register/$', views.Register.as_view(), name="register"),  # 注册
}