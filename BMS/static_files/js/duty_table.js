function weekends() {
	for(var i = 0; i < 7; i++) {
		var tr = $('.minicalc').eq(0).find('tr').eq(i);
		if(!tr) break;

        tr.find('td').eq(0).css('color', 'red');
        tr.find('td').eq(6).css('color', 'red');


	}
}

function setVacationDay(year, month) {
    var post_data = {};
     post_data.year = year;
     post_data.month = month;
    $.post('/duty_mgm/get_vacation_by_month', post_data, function (resData) {
        resData = JSON.parse(resData);
        if(resData.status == 'success'){
              var dateList = resData.data;
              for(var i=0;i<dateList.length;i++){
                  var oneDate = dateList[i];
                  var date_day = String(oneDate.date);
                  var date_type = Number(oneDate.type);
                  if (date_type == 2){
                      $("td[ymd='"+date_day+"']").css('color', 'red');
                  }else if (date_type == 0){
                      $("td[ymd='"+date_day+"']").css('color', 'rgb(74, 155, 255)');
                  }else if(date_type == 1){
                      $("td[ymd='"+date_day+"']").css('color', 'rgb(47, 125, 47)');
                  }
              }
         }else{
             alert("获取当月假日信息失败！");
         }
    });
}

function find_person_in_list(dateStr, date_list, day_or_night) {
    for (var i = 0; i < date_list.length; i++){
        if (dateStr == date_list[i].date){
            if (day_or_night == 1){
                if (date_list[i].white == null || date_list[i].white.length == 0){
                    return "暂无";
                }else {
                    return date_list[i].white.join(" ");
                }
            }else if (day_or_night == 2){
                if (date_list[i].night == null || date_list[i].night.length == 0){
                    return "暂无";
                }else {
                    return date_list[i].night.join(" ");
                }
            }

        }
    }
}


function dom(id) {
	return document.getElementById(id);
};

/*通过className获取dom元素进行过滤*/
function domClass(pidDom, sClass) {
	var aEle = typeof pidDom == "string" ? dom(pidDom) : pidDom.getElementsByTagName('*');
	var arrs = [];
	for(var i = 0; i < aEle.length; i++) {
		if(aEle[i].className.indexOf(sClass) != -1) {
			arrs.push(aEle[i]);
		}
	}
	return arrs;
};

//简单混入
function mixin(obj, obj2) {
	for(var k in obj2) {
		if(obj2.hasOwnProperty(k)) {
			obj[k] = obj2[k];
		}
	}
	return obj;
};

//多对象混入
function mix(target, source) {
	var arr = [];
	var args = arr.slice.call(arguments);

	var i = 1;
	if(args.length == 1) {
		return target;
	};

	while((source = args[i++])) {
		for(var miniy in source) {
			if(source.hasOwnProperty(miniy)) {
				target[miniy] = source[miniy];
			}
		}
	}
	return target;
};

var Calender = (function() {
	/**
	 * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
	 * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
	 * Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
	 * Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
	 * Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
	 * Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
	 * Date()).format("yyyy-M-d h:m:s.S q ") ==> 2006-7-2 8:9:4.18
	 */
	Date.prototype.format = function(fmt) {
		var o = {
			"Y+": this.getFullYear(),
			"M+": this.getMonth() + 1,
			// 月份
			"d+": this.getDate(),
			// 日
			"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
			// 小时
			"H+": this.getHours(),
			// 小时
			"m+": this.getMinutes(),
			// 分
			"s+": this.getSeconds(),
			// 秒
			"q+": Math.floor((this.getMonth() + 3) / 3),
			// 季度
			"S": this.getMilliseconds()
				// 毫秒
		};
		var week = {
			"0": "日",
			"1": "一",
			"2": "二",
			"3": "三",
			"4": "四",
			"5": "五",
			"6": "六"
		};
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
		}
		if(/(E+)/.test(fmt)) {
			fmt = fmt
				.replace(
					RegExp.$1,
					((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" :
							"/u5468") :
						"") +
					week[this.getDay() + ""]);
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
					(("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	};

	//构造函数
	var miniCalender = function(opts) {
		this.id = opts.id;
		this.defaults = {
				width: 500,
				background: "#fff",
				color: "#999",
				format: "yyyy-MM-dd",
				start : 2010 ,
				end : 2100
			},
		this.options = mix(this.defaults, opts); //jquery extend原理
		this.yrange = this.options.yrange || miniCalender.YEARS;
		this.monthTag = this.options.monthTag || miniCalender.MONTHS;
		this.weekTag = this.options.weekTag || miniCalender.WEEKS;
		this.dbclick = this.options.dbclick;
		this.click = this.options.click;
	};

	//静态常量
	miniCalender.WEEKS = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
	miniCalender.MONTHS = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
	miniCalender.YEARS = [2010, 2100];

	//对miniCalender 函数 进行扩展
	miniCalender.prototype = {
		consturctor: miniCalender,

		//初始化
		init: function() {
			var args = arguments;
			var year = "",
				month = "";

			//如果传进来两个参数，就给year和month赋值，否则采用当前时间
			if(args.length == 2) {
				year = args[0];
				month = args[1];
			} else {
				var date = new Date();
				year = date.getFullYear();
				month = date.getMonth() + 1;
			};
			//初始化模板
			var domObj = this.template(year, month);

			var json = {};
			domClass(domObj, "mini_calcd").forEach(function(obj) {
				json[obj.getAttribute("ymd")] = obj;
			});
			if(this.success) this.success.call(json);
		},

		//模板函数
		template: function(year, month) {

			var $calc = this;
			var boxDom = dom($calc.id);
			var html = "<div class='minicalc'>" +
				"<div class='kcalcr'>" +
				"	<div class='minicln-controls'>" +
				"		<div class='minicln-control-button'>" +
				"			<p class='mini_calc_prev mini_prev'></p>" +
				"		</div>" +
				"		<div class='month'>" + year + " 年 " + $calc.monthTag[month - 1] + "</div>" +
				"		<div class='minicln-control-button rightalign'>" +
				"			<p class='mini_calc_next mini_next'></p>" +
				"		</div>" +
				"		<div class='minicalc_box' id='mini_cacle_" + $calc.id + "'></div>" +
				"	</div>" +
				"</div>" +
				"</div>";
			boxDom.innerHTML = html;
			//给盒子添加样式，比如说宽度，高度，背景色，
			$calc.css(boxDom, $calc.options);
			//绑定事件,上一年，下一年
			$calc.prevEvent(boxDom, year, month);
			$calc.nextEvent(boxDom, year, month);


			var post_data = {};
            post_data.year = year;
            post_data.month = month;
            var data_list ;
            $.ajax({
                type : "post",
                url : "/duty_mgm/get_duty_by_month",
                data : post_data,
                async : false,
                success : function(resData){
                    data_list = JSON.parse(resData).data;
                }
            });

			//创建一个表格
			var tableDom = $calc.element("table");
			$calc.css(tableDom, {
				height: $calc.options.height - 65
			});
			$calc.addClass(tableDom, "minicln-table");
			//创建表头
			var theadDom = $calc.element("thead");
			//创建一个tr
			var trDom = $calc.element("tr");
			$calc.addClass(trDom, "header-days");
			for(var i = 0, len = $calc.weekTag.length; i < len; i++) {
				var tdDom = $calc.element("td");
				$calc.addClass(tdDom, "header-day");
				tdDom.innerHTML = $calc.weekTag[i];
				trDom.appendChild(tdDom);
			};
			//将行添加到表头中
			$calc.append(theadDom, trDom);

			//创建表体
			var tbodyDom = $calc.element("tbody");

			//获取当月的天数
			var days = $calc.getMonthDay(year, month);
			//拿到上一个月的总天数，补齐前面的空格
			var pdays = $calc.getMonthDay(year, month - 1);
			//创建每个月的第一天的日期对象
			var date = new Date(year, month - 1, 1);
			var currentDate = new Date();
			var cdate = currentDate.getDate();
			//获取每个月的第一天是星期几
			var week = date.getDay();
			var j = 0; //记录天数
			var tdHtml = "";
			var cmark = false;
			var nindex = 1;
			var pwdays = pdays - week + 1;

			while(true) {

				tdHtml += "<tr>";
				//拿到一个月有多少天
				//拿到这个月第一天是星期几
				for(var i = 0; i < 7; i++) {
					var mark = "day";
					if(j == 0 && i == week) { //就去是寻找每个月第一天是星期几
						j++;
						if(j == cdate) mark = "day  today";
						var  ymd = year + "/" + month + "/" + j;
						var white = find_person_in_list(ymd, data_list, 1);
						var night = find_person_in_list(ymd, data_list, 2);
						tdHtml += "<td ymd='" + ymd + "' class='mini_calcd " + mark + "'>1";
						tdHtml += "<div class='white-name'>白： " + white + "</div>";
						tdHtml += "<div class='night-name'>晚： " + night + "</div></td>";
						cmark = true;
					} else if(j > 0 && j < days) {
						j++;
						if(j == cdate) mark = "day today";
						var  ymd = year + "/" + month + "/" + j;
						var white = find_person_in_list(ymd, data_list, 1);
						var night = find_person_in_list(ymd, data_list, 2);
						tdHtml += "<td ymd='" + year + "/" + month + "/" + j + "' class='mini_calcd " + mark + "'>" + j;
						tdHtml += "<div class='white-name'>白： " + white + "</div>";
						tdHtml += "<div class='night-name'>晚： " + night + "</div></td>";
					} else {
						//td填空格
						if(!cmark) {
							var oy = year;
							if(month == 1) {
								oy = year - 1;
							}
							var ymd = oy + "/" + (month - 1 == 0 ? 12 : month - 1) + "/" + pwdays;
							var white = find_person_in_list(ymd, data_list, 1);
						    var night = find_person_in_list(ymd, data_list, 2);
							tdHtml += "<td ymd='" + ymd + "' class='mini_calcd day empt'>" + pwdays ;
							tdHtml += "<div class='white-name'>白： " + white + "</div>";
						    tdHtml += "<div class='night-name'>晚： " + night + "</div></td>";
							pwdays++;
						} else {
							var oy = year;
							if(month == 12) {
							    oy = year + 1;
							}
							var ymd = oy + "/" + (month == 12? 1 :month +1) + "/" + nindex;
							var white = find_person_in_list(ymd, data_list, 1);
						    var night = find_person_in_list(ymd, data_list, 2);
							tdHtml += "<td ymd='" + ymd + "' class='mini_calcd day empt'>"
                                + nindex ;
							tdHtml += "<div class='white-name'>白： " + white + "</div>";
						    tdHtml += "<div class='night-name'>晚： " + night + "</div></td>";
							nindex++;
						}
					}
				}
				tdHtml += "</tr>";
				if(j >= days) break;
			};
			
			//追加拼接的日期文本
			tbodyDom.innerHTML = tdHtml;
			//追加元素
			$calc.append(tableDom, theadDom);
			$calc.append(tableDom, tbodyDom);
			$calc.append(dom("mini_cacle_" + $calc.id), tableDom);

			//给所有的td元素绑定点击事件
			domClass(tbodyDom, "mini_calcd").forEach(function(obj) {
				obj.ondblclick = function() {
					var ymd = this.getAttribute("ymd");
					var date = new Date();
					var hour = date.getHours();
					var min = date.getMinutes();
					var sec = date.getSeconds();
					var dataStr = ymd + " " + hour + ":" + min + ":" + sec;
					var rdate = new Date(dataStr);
					// if($calc.dbclick) $calc.dbclick.call(rdate, rdate.format($calc.options.format));
				}
				
				obj.onclick = function() {
					
					var ymd = this.getAttribute("ymd");
					// if($calc.click) $calc.click.call(rdate, rdate.format($calc.options.format));
                    var ymd_str1 = String(ymd).replace('\/',"_");
                    var ymd_str2 = String(ymd_str1).replace('\/',"_");
                    $.get('/duty_mgm/change_holiday_state_date='+ymd_str2, function (resData) {
                        resData = JSON.parse(resData);
                        if(resData.status == 'success'){
                              var res_str = resData.data;
                              $calc.template(year, month);
                              alert(res_str);
                         }else{
                             alert("修改当日信息失败！");
                         }
                    });
				}
			});
			weekends();
			setVacationDay(year, month);
			return boxDom;
		},

		nextEvent: function(dom, year, month) { //下一年
			var $calc = this;
			domClass(dom, "mini_next")[0].onclick = function() {
				var m = month + 1;
				var y = year;
				if(year == $calc.yrange[1] && m > 12) {
					alert("你已经到最大年限了...");
					return;
				}
				if(m > 12) {
					y = year + 1;
					m = 1;
				}

				$calc.template(y, m);
			};
		},
		prevEvent: function(dom, year, month) { //上一年
			var $calc = this;
			domClass(dom, "mini_prev")[0].onclick = function() {
				var m = month - 1;
				var y = year;
				if(year == $calc.yrange[0] && m == 0) {
					alert("你已经到最小年限了...");
					return;
				}
				if(m == 0) {
					y = year - 1;
					m = 12;
				}
				$calc.template(y, m);
			};
		},
		getMonthDay: function(year, month) { //拿到一个月有多少天，getDate()拿到今天是几号
			return new Date(year, month, 0).getDate(); //拿到上个月最后一天
		},
		addClass: function(dom, className) { //添加样式
			dom.className = className;
		},
		append: function(dom, subdom) { //追加元素
			dom.appendChild(subdom);
		},
		element: function(ele) { //创建元素
			return document.createElement(ele);
		},
		css: function(dom, opts) {
			for(var miniy in opts) {
				var v = opts[miniy];
				dom.style[miniy] = (typeof v === "number" ? v + "px" : v);
			}
		}
	};
	return miniCalender;
})();