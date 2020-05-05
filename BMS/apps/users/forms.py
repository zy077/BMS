from django import forms


class Register(forms.Form):
    """注册表单"""
    username = forms.CharField(label='用户名', max_length=128, required=True, widget=forms.TextInput(attrs={"class": "form-control"}))
    studnum = forms.CharField(label='学号', max_length=256, required=True, widget=forms.TextInput(attrs={"class": "form-control"}))
    password = forms.CharField(label='密码', max_length=256, required=True, widget=forms.PasswordInput(attrs={"class": "form-control"}))
    confir_password = forms.CharField(label="确认密码", max_length=256, required=True, widget=forms.PasswordInput(attrs={"class": "form-control"}))
