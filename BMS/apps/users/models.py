# from django.db import models
# from datetime import datetime
# from django.contrib.auth.hashers import make_password, check_password
# from django.contrib.auth.models import AbstractUser
#
#
# # Create your models here.
#
# class User(AbstractUser):
#     """用户模型类"""
#     # username = models.CharField(verbose_name='用户名', max_length=20)
#     mobile = models.CharField(verbose_name='手机号', max_length=11, unique=True)
#     # email = models.CharField(verbose_name='邮箱', max_length=20, unique=True)
#     # password = models.CharField(verbose_name="密码", max_length=50)
#     studnum = models.CharField(verbose_name="学号", unique=True, max_length=20)
#     # last_login = models.DateTimeField(verbose_name="最近登录", default=datetime.now)
#     # is_superuser = models.BooleanField(verbose_name="是否是管理员", default=False)
#
#     class Meat:
#         db_table = "users"  # 指明数据表名
#         verbose_name = '用户'  # 在admin站点中显示的名称
#         verbose_name_plural = '用户'  # 显示复数名称
#
#     def __str__(self):
#         """定义每个数据对象的显示信息"""
#         return self.username
#
#     def save(self, *args, **kwargs):
#         """对密码进行加密"""
#         self.password = make_password(self.password, salt=None, hasher='pbkdf2_sha256')
#         super(User, self).save(*args, **kwargs)
#     #
#     # def check_password(self, raw_password, hash_password):
#     #     """验证密码是否正确"""
#     #     return check_password(raw_password, hash_password)
