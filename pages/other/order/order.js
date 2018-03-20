var url = require("../../../utils/util.js");
/*
*   兄dei 我的代码没用十几年的开发经验是看不懂的！！！！
*   @line：切换页面
*   @cancel：取消订单
*   @order :订单列表===》》》此方法是列表的封装方法，具体请看几个列表！
*   @urge:崔发货
*   @hidd:隐藏“更多”按钮
*   @show:显示“更多”按钮
*   @queRenShouHuo :用户确认收货
*   @evaluate:立即评价=》》》》跳评价页面！！！
*   @Autologon:自动登陆
* */
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
        }],
        menuId: 0,
        minute: true,
        sort: 0,
        length: 0,
        orderView: "",
        stateStr: "待付款"
    },
    Autologon: function (state) {
        var Account = wx.getStorageSync('Account');
        var password = wx.getStorageSync('password');
        var _this = this;
        wx.request({
            url: url.url + 'user/login.do?loginAccount=' + Account + '&userPwd=' + password + '&tag=2',
            header: {'content-type': 'application/json'},
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result == "success") {
                    console.log(res.data.content.token);
                    wx.setStorageSync('token', res.data.content.token)
                    console.log("自动登陆成功！！！");
                    wx.request({
                        url: `${url.url}goodsHome/getOrderList.do?states=${state}`,
                        header: {"token": wx.getStorageSync('token')},
                        method: 'GET',
                        dataType: 'json',
                        responseType: 'text',
                        success: function (res) {
                            console.log(res);
                            if (res.data.result == "success") {
                                console.log("开始渲染");
                                wx.hideLoading();
                                _this.setData({
                                    list: res.data.content.data
                                })
                            } else {

                            }
                        }
                    })
                } else {
                    wx.redirectTo({
                        url: '../../login/login/login',
                    })
                }
                wx.setStorageSync('login', res.data);
                wx.setStorageSync('token', res.data.content.token)
                wx.setStorageSync('Account', Account);
                wx.setStorageSync('password', password)
            },
            fail: function (res) {
                wx.showToast({
                    title: '网络超时',
                    icon: 'none',
                    duration: 1500,
                    mask: true
                })
            }
        })
    },
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
                    wx.hideLoading();
                } else {
                    that.Autologon(state)
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
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
                    wx.hideLoading();
                    that.Autologon(0);
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
    line: function (e, that) {
        var cache = wx.getStorageSync("login");
        var that = this;
        var fun = function (state) {
            that.setData({
                menuId: e.target.dataset.index
            })
            that.load(state, that);
        }
        if (e.target.dataset.index == 0) {//待付款
            fun(0);
            that.setData({stateStr: "待付款"})
        } else if (e.target.dataset.index == 1) {//待成团
            fun(17);
            that.setData({stateStr: "待成团"})
        } else if (e.target.dataset.index == 2) {//待发货
            fun(1);
            that.setData({stateStr: "待发货"})
        } else if (e.target.dataset.index == 3) {//待收货
            fun(2);
            that.setData({stateStr: "待收货"})
        } else if (e.target.dataset.index == 4) {//评价
            fun(3);
            that.setData({stateStr: "评价"})
        } else if (e.target.dataset.index == 5) {//完成
            fun(99);
            that.setData({
                stateStr: "完成"
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
    urge: function (e) {
        console.log(e);
        var cache = wx.getStorageSync("login");//获取缓存
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
    show: function (e) {
        if (e.currentTarget.id == this.data.orderView) {
            this.setData({
                orderView: ""
            })
            return;
        } else {
            this.setData({
                orderView: e.currentTarget.id
            })
        }
    },
    hidd: function (e) {
        if (this.data.orderView != "") {
            this.setData({
                orderView: "hide"
            })
        }
    },
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
    evaluate: function (res) {
        wx.showToast({
            title: '加载中....',
            icon: 'loading',
            duration: 2000,
            success: function (v) {
                wx.navigateTo({
                    url: `../evaluate/evaluate?orderNo=${res.currentTarget.dataset.orderno}&merchantID=${res.currentTarget.dataset.merchantid}&goodsID=${res.currentTarget.dataset.goodsid}`
                })
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
    queRenShouHuo: function (e) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '是否确认收货',
            success: function (res) {
                if (res.confirm) {
                    var cache = wx.getStorageSync("login"); //获取缓存
                    console.log(e.currentTarget.dataset.orderno);
                    wx.request({
                        url: `${url.url}goodsHome/queRenShouHou.do?userID=${cache.content.userID}&orderNo=${e.currentTarget.dataset.orderno}&keyID=${e.currentTarget.dataset.keyid}`,
                        data: '',
                        header: {
                            "token": cache.content.token
                        },
                        method: 'POST',
                        dataType: 'json',
                        responseType: 'text',
                        success: function (res) {
                            if (res.data.result === "success") {
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 2000,
                                    success: function (res) {

                                    }
                                })
                            } else {
                                wx.showToast({
                                    title: res.data.error,
                                    icon: 'none',
                                    duration: 2000,
                                    success: function (res) {
                                        fun(2, that);
                                    }
                                })
                            }
                        },
                        fail: function (res) {
                            console.log("服务器炸了！！！")
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })


    }
})