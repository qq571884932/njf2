// pages/addrlist/addrlist.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //   addr: []
        two: true,
        three: true,
        if_one: false,
        if_two: true,
        if_three: true,
        choose_one: "请选择",
        choose_two: "请选择",
        choose_three: "请选择",
        left: 0
    },
    /*
        省列表点击事件
    */
    province: function (e) {
        this.setData({
            if_one: true,
            if_two: false,
            two: false,
            choose_one: e.currentTarget.dataset.name
        })
        var that = this;
        var link = require("../../../../utils/util.js");
        wx.request({
            url: `${link.url}other/getArea.do?type=2&areaCode=${e.currentTarget.dataset.code}`,
            header: {
                "token": wx.getStorageSync("login").content.token
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result === "success") {
                    console.log(res);
                    that.setData({
                        addr_two: res.data.content,
                        left: 250
                    })
                }
            },
            fail: function (res) {
                console.log("A");
            }
        })
    },
    /*
      市列表点击事件
    */
    c: function (e) {
        var that = this;
        that.setData({
            three: false,
            if_two: true,
            if_three: false,
            choose_two: e.currentTarget.dataset.name
        })
        var link = require("../../../../utils/util.js");
        wx.request({
            url: `${link.url}other/getArea.do?type=3&areaCode=${e.currentTarget.dataset.code}`,
            header: {
                "token": wx.getStorageSync("login").content.token
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result === "success") {
                    console.log(res);
                    that.setData({
                        addr_three: res.data.content,
                        left: 500
                    })
                }
            },
            fail: function (res) {
                console.log("A");
            }
        })
    },
    /*
      县列表点击事件
    */
    county: function (e) {
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];  //当前页面
        var prevPage = pages[pages.length - 2]; //上一个页面
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        var a = this.data.choose_one;
        var b = this.data.choose_two;
        var c = e.currentTarget.dataset.name;
        // console.log(a+b+c);
        console.log(prevPage);
        prevPage.setData({
            addr: a + " " + b + " " + c
        })
        wx.navigateBack();
    },
    /*
      省按钮点击事件
    */
    p0: function (e) {
        if (this.data.left != 0) {
            this.setData({
                left: 0,
                if_one: false,
                if_two: true,
                if_three: true,
                two: true,
                three: true,
            })
        }
    },
    /*
      市区按钮点击事件
    */
    c250: function (e) {
        console.log(this.data.left);
        if (this.data.left != 250) {
            this.setData({
                left: 250,
                if_one: true,
                if_two: false,
                if_three: true,
                two: false,
                three: true,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var link = require("../../../../utils/util.js");
        wx.request({
            url: `${link.url}other/getArea.do?type=1`,
            header: {
                "token": wx.getStorageSync("login").content.token
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result === "success") {
                    console.log(res.data.content);
                    that.setData({
                        addr: res.data.content
                    })
                }
            },
            fail: function (res) {
                console.log("A");
            }
        })
    }
})