var url = require("../../../utils/util.js");
var md5 = require("../../../utils/md5.js");

function fmtDate(obj) {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ifHide: true,
        style: "display:none",
        phone: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /*发送短信验证码*/
    Go: function (e) {
        var token = wx.getStorageSync("login");
        var timestamp = new Date().getTime();
        var timer = fmtDate(timestamp);
        var a = this.data.phone + timer + "njf2016";
        var s = md5.hex_md5(a);
        wx.request({
            url: `${url.url}user/sendSMS.do?type=1&userPhone=${this.data.phone}&token=${s}`,
            header: {
                "token": s
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result == "success") {
                    console.log("success")
                    wx.showLoading({
                        title: '发送中',
                        mask: true,
                        success: function (res) {
                            wx.showToast({
                                title: '发送成功',
                                icon: 'success',
                            })
                        },
                        fail: function (res) {
                            wx.hideLoading();
                        }
                    })
                } else {
                    var tit = res.data.error;
                    wx.showLoading({
                        title: '发送中',
                        mask: true,
                        success: function (res) {
                            wx.showToast({
                                title: tit,
                                icon: 'none',
                                mask: true,
                            })
                        },
                        fail: function (res) {
                            wx.hideLoading();
                        }
                    })

                }
            },
        })
    },
    /*
      清空功能
    */
    empty: function (e) {

    },
    /*
      输入手机号触发
    */
    _import: function (e) {
        var length = e.detail.value.length;
        if (length > 0) {
            this.setData({
                style: "display:block",
                phone: e.detail.value
            })
        } else {
            this.setData({
                style: "display:none",
                phone: e.detail.value
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})