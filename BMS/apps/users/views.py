from django.shortcuts import render

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
        return render(request, 'register.html.html')

    def post(self, request):
        pass

class Login(View):
    """登录"""

    def get(self, request):
        pass

    def post(self, request):
        pass