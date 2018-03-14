// pages/user/order/order.js
var url = require("../../../utils/util.js");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        menu: [{
            name: "待付款",
            id: 0
        }, {
            name: "待成团",
            id: 1
        }, {
            name: "待发货",
            id: 2
        }, {
            name: "待收货",
            id: 3
        }, {
            name: "评价",
            id: 4
        }, {
            name: "完成",
            id: 5
        }
        ],
        menuId: 0,
        minute: true,
        sort: 0,
        length: 0,
        orderView: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    /*。。。。订单列表。。。。*/
    order: function (state, that) {
        var cache = wx.getStorageSync("login"); //获取缓存
        wx.request({
            url: `${url.url}goodsHome/getOrderList.do?states=${state}`,
            header: {"token": cache.content.token},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result == "success") {
                    that.setData({
                        list: res.data.content.data,
                        length: res.data.content.data.length
                    })
                    console.log(res);
                    wx.hideLoading();
                } else {
                    console.log(res);
                }
            }
        })
    },
    onLoad: function (options) {
        var that = this;
        var cache = wx.getStorageSync("login");
        wx.showLoading({
            title: '加载中',
            mask: true,
            success: function (res) {
                console.log("加载调用成功！！！")
            }
        })
        wx.request({
            url: `${url.url}goodsHome/getOrderList.do?states=0`,
            header: {
                "token": cache.content.token
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result == "success") {
                    that.setData({
                        list: res.data.content.data
                    })
                    wx.hideLoading();
                } else {
                    console.log(res);
                    wx.hideLoading();
                }
            }
        })
    },
    load: function (state, that) {
        wx.showLoading({
            title: '加载中',
            mask: true,
            success: function (res) {
                console.log(res);
            },
        })
        that.order(state, this)
    },
    /*
      切换页面
    */
    line: function (e, that) {
        var cache = wx.getStorageSync("login");
        var that = this;
        var fun = function (state) {
            that.setData({
                menuId: e.target.dataset.index
            })
            that.load(state, that);
            console.log(e.target.dataset.index);
        }
        if (e.target.dataset.index == 0) {//待付款
            fun(0, that)
        } else if (e.target.dataset.index == 1) {//待成团
            fun(17, that)
        } else if (e.target.dataset.index == 2) {//待发货
            fun(1, that)
        } else if (e.target.dataset.index == 3) {//待收货
            fun(2, that)
        } else if (e.target.dataset.index == 4) {//评价
            fun(3, that);
        } else if (e.target.dataset.index == 5) {//完成
            fun(99, that);
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
    /*
      取消订单
    */
    cancel: function (e) {
        console.log(e);
        var that = this;
        var cache = wx.getStorageSync("login");
        wx.showModal({
            title: '提示',
            content: '是否取消订单',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确认',
            confirmColor: '#000000',
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        url: `${url.url}goodsHome/cancelOrder.do?userID=${cache.content.userID}&keyID=${e.target.dataset.keyid}&orderNo=${e.target.dataset.orderno}`,
                        header: {
                            "token": cache.content.token
                        },
                        method: 'POST',
                        dataType: 'json',
                        responseType: 'text',
                        success: function (res) {
                            if (res.data.result == "success") {
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 1500,
                                    mask: true
                                })
                                setTimeout(function () {
                                    that.onLoad();
                                    wx.showToast({
                                        title: '提示',
                                        icon: 'success',
                                        duration: 1500,
                                        mask: true
                                    })
                                }, 1500)
                            } else {
                                console.log(res.content.error);
                            }
                        }
                    })
                } else if (res.cancel) {
                    console.log(res.cancel)
                }
            }
        })
    },
    /*
      催发货
    */
    urge: function (e) {
        console.log(e);
        var cache = wx.getStorageSync("login"); //获取缓存
        console.log(e.currentTarget.dataset.orderno);
        wx.request({
            url: `${url.url}user/saveSystemNews.do?orderKeyId=${e.currentTarget.dataset.keyid}&orderNo=${e.currentTarget.dataset.orderno}&content=1`,
            header: {
                "token": cache.content.token
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result == "success") {
                    wx.showToast({
                        title: '崔支付成功',
                        icon: 'success',
                        duration: 1500,
                        mask: true,
                        success: function (res) {
                            console.log("崔支付调用成功")
                        },
                    })
                }
            }
        })
    },
    /*
      更多按钮->>>显示
    */
    show: function (e) {
        var checkId = e.currentTarget.id;
        if (e.currentTarget.id == this.data.orderView) {
            this.setData({
                orderView: ""
            })
            return;
        }
        this.setData({
            orderView: checkId
        })
    },
    /*
      显示按钮隐藏->>>
    */
    hidd: function (e) {
        if (this.data.orderView != "") {
            this.setData({
                orderView: "hide"
            })
        }
    },
    /*/
      物流信息
    */
    logistics: function () {
        console.log("a");
    },
    del: function (e) {
        wx.showLoading({
            title: '执行中',
            mask: true
        })
        var cache = wx.getStorageSync("login"); //获取缓存
        console.log(e);
        wx.request({
            url: `${url.url}goodsHome/delOrder.do?keyId=${e.target.dataset.del}`,
            header: {
                "token": cache.content.token
            },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result == "success") {
                    wx.hideLoading();
                    console.log(res);
                }
            }
        })
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
        var cache = wx.getStorageSync("login"); //获取缓存
        var that = this;
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

    },
    /*
      用户确认收货
    */
    queRenShouHuo: function (e) {
        var cache = wx.getStorageSync("login"); //获取缓存
        wx.request({
            url: `${url.url}goodsHome/queRenShouHou.do?userID=${cache.content.userID}&orderNo=${dindanhao}&keyID=${keyId}`,
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
            },
            fail: function (res) {
            },
            complete: function (res) {
            },
        })
    }
})