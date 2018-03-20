// pages/login/login.js
const url = getApp().urltotal();
const util = require("../../../utils/md5.js");
Page({
    /*获取当前页url*/
    /**
     * 页面的初始数据
     */
    data: {
        ifLoading: false
    },
    formSubmit: function (e) {
        var that = this;
        this.setData({
            ifLoading: true
        })
        wx.request({
            method: 'POST',
            url: url + 'user/login.do?loginAccount=' + e.detail.value.userPhone + '&userPwd=' + util.hex_md5(e.detail.value.password) + '&tag=2',//接口地址
            header: {'content-type': 'application/json'},
            success: function (res) {
                if (res.data.result == "success") {
                    wx.switchTab({
                        url: '../../my/my',
                        success: function (e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onLoad();
                        }
                    })
                    wx.setStorageSync('login', res.data);
                    wx.setStorageSync('token', res.data.content.token)
                } else {
                    console.log(res.data.error);
                    return;
                }
            },
            fail: function () {
                console.log("登录失败")
            }
        })
    }
})