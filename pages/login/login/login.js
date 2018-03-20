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
                    that.setData({
                        ifLoading: false
                    })
                    wx.switchTab({
                        url: '../../my/my',
                        success: function (e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onLoad();
                        }
                    })
                    wx.setStorage({
                        key: 'login',
                        data: res.data
                    })
                    // wx.setStorageSync('login', res.data);
                    wx.setStorageSync('token', res.data.content.token)
                    wx.setStorageSync('Account', e.detail.value.userPhone);
                    wx.setStorageSync('password', util.hex_md5(e.detail.value.password))
                } else {
                    that.setData({
                        ifLoading: false
                    })
                    wx.showToast({
                        title: "asds",//res.data.error
                        icon: 'none',
                        duration: 1500,
                        mask: true,
                    })
                    return;
                }
            },
            fail: function (res) {
                that.setData({
                    ifLoading: false
                })
                wx.showToast({
                    title: '网络超时',
                    icon: 'none',
                    duration: 1500,
                    mask: true,
                })
            }
        })
    }
})