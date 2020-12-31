from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
import logging
from django.http import HttpResponse
from django.db.models import Q
import re

# Create your views here.
from django.views import View

logger = logging.getLogger('django')

class Register(View):
    """注册"""

    def get(self, request):
        """
        注册
        :param request:包含了请求信息的请求对象
        :return:响应对象
        """
        return render(request, 'users/register.html')

    def post(self, request):
        """
        注册保存数据
        :param request:
        :return:
        """
        # 获取数据
        post_param = request.POST
        username = post_param.get('username')
        email = post_param.get('email')
        password = post_param.get("password")
        # 检验参数
        try:
            user = User.objects.filter(Q(username=username) | Q(email=email))
        except Exception as e:
            logging.info("查询用户失败：{}".format(e))
        if user.exists():
            return render(request, 'users/register.html', {"message": "该用户名或邮箱已存在！"})

        if not re.match(r'^[0-9a-zA-Z_]{0,19}@[0-9a-zA-Z]{1,13}\.[com,cn,net]{1,3}$',email):
            return render(request, 'users/register.html', {"message": "邮箱规则错误！"})

        if len(password) < 8:
            return render(request, 'users/register.html', {"message": "请输入大于8位的密码！"})

        User.objects.create_user(username=username, email=email, password=password)
        return HttpResponse("注册成功！")


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
        #     users = User.objects.get(username=username)
        # except Exception as e:
        #     logging.error(e)
        #     return render(request, 'login.html', {"message": "用户名错误"})
        # if not users:
        #     return render(request, 'login.html', {"message": "该用户不存在"})
        # if not users.check_password(password):
        #     return render(request, 'login.html', {"message": "密码错误"})
        # # 3、逻辑处理
        # # 4、返回响应
        # return redirect('/index/')


def logout(request):
    """退出登录"""
    pass
