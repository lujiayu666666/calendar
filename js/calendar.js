//随机数
function rn(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//根据数据条数随机生成相等数量的颜色
function randomColor(params) {
    var colorArr = [];
    for (var u = 0; u < params.length; u++) {
        colorArr.push(rn(30, 200) + ',' + rn(30, 200) + ',' + rn(30, 200));
    }
    return colorArr;
}
//起始距离
function initialDistance(params) {
    var initialArr = [],
        hour, initialMinut, initialWidth;
    for (var n = 0; n < params.length; n++) {
        hour = +params[n].startTime.split(':')[0] * 60;
        initialMinut = hour + (+params[n].startTime.split(':')[1]);
        initialWidth = $('.easyui-fullCalendar').find('th')[0].offsetWidth / 1440 * initialMinut
        initialArr.push(initialWidth)
    }
    return initialArr
}

//根据下标删除数组指定项
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp == obj) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
}

//分钟差
function MinuteDifference(startM, endM) {
    var startMArr = startM.split(':'),
        endMArr = endM.split(':'),
        sMinute = +startMArr[0] * 60 + (+startMArr[1]),
        eMinute = +endMArr[0] * 60 + (+endMArr[1]),
        timeDifference = eMinute - sMinute;
    return timeDifference;
}

//时间日期格式化
function getDate(datestr) {
    var temp = datestr.split("-");
    if (temp[1] === '01') {
        temp[0] = parseInt(temp[0], 10) - 1;
        temp[1] = '12';
    } else {
        temp[1] = parseInt(temp[1], 10) - 1;
    }
    var date = new Date(temp[0], temp[1], temp[2]);
    return date;
}

//获取时间段中的每个日期
function getDiffDate(start, end) {
    var startTime = getDate(start);
    var endTime = getDate(end);
    var dateArr = [];
    var res;
    while ((endTime.getTime() - startTime.getTime()) > 0) {
        var year = startTime.getFullYear();
        var month = startTime.getMonth().toString().length === 1 ? "0" + (parseInt(startTime.getMonth().toString(), 10) + 1) : (startTime.getMonth() + 1);
        var day = startTime.getDate().toString()
        dateArr.push(year + "-" + month + "-" + day);
        startTime.setDate(startTime.getDate() + 1);
    }
    var endTime = new Date(end),
        endYear = endTime.getFullYear(),
        endMonth = endTime.getMonth() + 1,
        endDay = endTime.getDate();

    endTime = endYear + '-' + endMonth + '-' + endDay;
    dateArr.push(endTime);
    return dateArr;
}

/**
 * @param {Array} params 
 * 作者:yj
 * 2018-12-26 16:39:22
 */
function calendar(params) {
    var height = $('.easyui-fullCalendar').find('td')[0].offsetHeight + 1,  //插入div高度
        len = $('td'),  //td
        colorArr = randomColor(params), //随机生成颜色colorArr.length === params.length
        marginLeftArr = initialDistance(params), //计算插入div的起始位置
        widthArr = [],   //插入div宽度
        dataArr = [],    //详细日期
        html;            //插入html
    //处理返回数据
    for (var r = 0; r < params.length; r++) {
        //所有数据的分钟差  arr
        widthArr.push($('.easyui-fullCalendar').find('th')[0].offsetWidth / 1440 * MinuteDifference(params[r].startTime, params[r].endTime));
        //所有数据的时间段  arr
        dataArr.push(getDiffDate(params[r].startDate, params[r].endDate));
    }
    //插入div
    for (let q = 0; q < len.length; q++) {
        for (let d = 0; d < dataArr.length; d++) {
            for (let s = 0; s < dataArr[d].length; s++) {
                if ($(len[q]).attr('abbr') === dataArr[d][s]) {
                    len[q].style.position = 'relative';
                    $(len[q]).children('span').css({ "position": "relative" });
                    len[q].style.zIndex = '3';
                    html = `<div class='bg' title='${$(len[q]).attr('abbr')} ${params[d].startTime}-${params[d].endTime}' style='width: ${widthArr[d]}px; 
                position:absolute; height:${height}px; top:0px; left:${marginLeftArr[d]}px; background: rgba(${colorArr[d]});'></div>`;
                    $(len[q]).append(html)
                }
            }
        }
    }
    $('.calendar-other-month').find('div').hide();
}

