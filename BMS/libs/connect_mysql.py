"""
功能：连接mysql，执行sql语句，返回执行结果
"""
from django.db import connections
import logging

logger = logging.getLogger('django')


def query_all(dbname, sql, params=[]):
    """
    功能：执行sql，返回所有的执行结果
    :param dbname: 数据库名
    :param sql: 要执行的sql语句
    :param params: sql语句所需参数列表（可选）
    :return: 返回执行结果
    """
    try:
        with connections[dbname].cursor() as cursor:
            cursor.execute(sql, params)
            ret = cursor.fetchall()
    except Exception as e:
        logger.error("执行sql语句出错：{}".format(e))
    return ret


def query_one(dbname, sql, params=[]):
    """
    功能：执行sql，返回所有的执行结果
    :param dbname: 数据库名
    :param sql: 要执行的sql语句
    :param params: sql语句所需参数列表（可选）
    :return: 返回一条执行结果
    """
    try:
        with connections[dbname].cursor() as cursor:
            cursor.execute(sql, params)
            ret = cursor.fetchone()
    except Exception as e:
        logger.error("执行sql语句出错：{}".format(e))
    return ret


def execute_sql(dbname, sql, params=[]):
    """
    功能：执行sql，返回所有的执行结果
    :param dbname: 数据库名
    :param sql: 要执行的sql语句
    :param params: sql语句所需参数列表（可选）
    :return: 返回受影响的行数
    """
    try:
        with connections[dbname].cursor() as cursor:
            cursor.execute(sql, params)
            ret = cursor.rowcount
    except Exception as e:
        logger.error("执行sql语句出错：{}".format(e))
    return ret
