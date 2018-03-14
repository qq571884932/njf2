// pages/site/site.js


Page({
    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var url = require("../../../../utils/util.js");
        var s = wx.getStorageSync("login");
        console.log(s);
        console.log(s.content.userID);
        wx.request({
            url: `${url.url}address/getAddresss.do?userID=${s.content.userID}&tag=${0}`,
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result === "success") {
                    console.log(res.data.content)
                    that.setData({
                        list: res.data.content
                    })
                } else {
                    console.log(res.data.error);
                }
            }
        })
    },
    radioChange: function (e) {
        var that = this;
        var s = wx.getStorageSync("login");
        var url = require("../../../../utils/util.js");
        console.log(s.content.token);
        wx.request({
            url: `${url.url}address/modifyisDefault.do?addressID=${e.detail.value}`,
            header: {
                "token": s.content.token
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                console.log(res);
                if (res.data.result == "success") {
                    console.log("设置成功！！！");
                    that.onLoad();//刷新数据
                } else {
                    console.log(res.data.error)
                }
            },
            fail: function (res) {
                console.log("接口调用失败！！！")
            },
        })
    },
    /*
        删除收货地址
    */
    del: function (e) {
        var that = this;
        var s = wx.getStorageSync("login");
        var url = require("../../../../utils/util.js");
        console.log(e.currentTarget.dataset.addressid);
        wx.request({
            url: `${url.url}address/delAddress.do?addressID=${e.currentTarget.dataset.addressid}`,
            header: {
                'token': s.content.token
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result == "success") {
                    console.log("OK");
                    that.onLoad();
                } else {
                    console.log(res.data.error);
                }
            },
            fail: function (res) {
                console.log("aaa");
            },
            complete: function (res) {
            },
        })
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