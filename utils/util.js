const formatTime = date =
>
{
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n =
>
{
    n = n.toString()
    return n[1] ? n : '0' + n
}

/*获取当前页url*/
function getCurrentPageUrl() {
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    var options = currentPage.options    //如果要获取url中所带的参数可以查看options
    //拼接url的参数
    var urlWithArgs = url + '?'
    for (var key in options) {
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
    return urlWithArgs
}

const url = "https://app.njf2016.com/";

function isPhone(val) {
    //手机号正则
    var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
    //电话
    if (!phoneReg.test(val)) {
        console.log("请输入正确手机号！")
        return false;
    }
}

/*微信登陆*/
var wxLogin = function (e) {
    wx.login({
        success: function (res) {
            if (res.code) {
                wx.request({
                    url: `${url}user/WXLogin.do?code=${res.code}`,
                    method: 'GET',
                    dataType: 'json',
                    responseType: 'text',
                    success: function (res) {

                    }
                })
            } else {

            }
        }
    })
}

module.exports = {
    getCurrentPageUrl: getCurrentPageUrl,
    getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
    formatTime: formatTime,
    url: url,
    isPhone: isPhone,
    wxLogin: wxLogin
}