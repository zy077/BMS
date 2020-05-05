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
        return render(request, 'base.html')

    def post(self, request):
        pass
