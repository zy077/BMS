from django.http import JsonResponse
from django.shortcuts import render, redirect
# from users.models import User
import logging

# Create your views here.
from django.views import View


class Register(View):
    """注册"""

    def get(self, request):
        """
        注册
        :param request:包含了请求信息的请求对象
        :return:响应对象
        """
        return render(request, 'register.html')

    def post(self, request):
        pass


class Login(View):
    """登录"""

    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        # 1、获取参数
        username = request.POST.get("username")
        password = request.POST.get("password")
        # 2、校验参数
        # if not username or not password:
        #     return render(request, 'login.html', {"message": "参数不全"})
        # try:
        #     user = User.objects.get(username=username)
        # except Exception as e:
        #     logging.error(e)
        #     return render(request, 'login.html', {"message": "用户名错误"})
        # if not user:
        #     return render(request, 'login.html', {"message": "该用户不存在"})
        # if not user.check_password(password):
        #     return render(request, 'login.html', {"message": "密码错误"})
        # # 3、逻辑处理
        # # 4、返回响应
        # return redirect('/index/')


def logout(request):
    """退出登录"""
    pass
