// pages/myCart/myCart.js
const util = require("../../utils/md5.js");
const handleData = require("../../utils/data.js");
var urltotal = getApp().urltotal();
var token = wx.getStorageSync("token");
Page({
    /**
     * 页面样式
     */
    clickStyle: function (e) {
        console.log(e.target.dataset.d)
        this.setData({
            styleState1: !e.target.dataset.d
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        editView: 0,
        styleState1: true,
        check: 0,
        isLogin: 0,
        cartGoodsList: [],
        totalMoney: 0,
        allCheck: false
    },
    /**
     * 点击全选
     */
    sonCheckAll: function (event) {
        var checkID = event.currentTarget.id;
        var myCheck = this.data.check;
        if (checkID == myCheck) {
            this.setData({
                check: 0
            })
        } else {
            this.setData({
                check: checkID
            })
        }
    },
    cartSuccess: function (event) {
        console.log(event.target.dataset.id)
        var that = this;
        var max = this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].goodsStock;
        var min = this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].minOrderDigit;
        var num = this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].digit;
        var id = event.target.dataset.id;
        wx.request({
            url: getApp().urltotal() + "goodsHome/modifySingleNum.do",
            method: "POST",
            header: {
                token: token
            },
            data: {
                digit: num,
                keyID: id
            },
            success: function (data) {
                console.log(data);
                if (data.data.result == "success") {
                    wx.showToast({
                        title: "修改成功",
                        icon: 'none',
                        duration: 2000
                    })
                    that.setData({
                        editView: 0
                    })
                } else {
                    wx.showToast({
                        title: data.data.error,
                        icon: 'none',
                        duration: 2000
                    })
                    that.setData({
                        editView: 0
                    })
                }
            }
        })
    },
    /**
     * 点击显示
     */
    toggleEditView: function (event) {


        var itemID = event.currentTarget.id;
        var editNum = this.data.editView;
        if (itemID == editNum) {
            this.setData({
                editView: 0
            })
        } else {
            this.setData({
                editView: itemID
            })
        }
    },
    doData: function () {
        // wx.requestPayment(
        //     {
        //         'timeStamp': '1520660993',
        //         'nonceStr': '1fVBRrSqduYzzsNz',
        //         'package': 'wx20180310134954d96bfdf05e0629151343',
        //         'signType': 'MD5',
        //         'paySign': util.hex_md5("appId = wxffb441f4637fceaf&timeStamp=1520660993&nonceStr=1fVBRrSqduYzzsNz&package=wx20180310134954d96bfdf05e0629151343&signType=MD5"),
        //         'success': function (res) {
        //             console.log("成功")
        //          },
        //         'fail': function (res) {
        //             console.log("失败")
        //         },
        //         'complete': function (res) { }
        //  })
// var jsonArr=[
// {
// "w":"1"
// },
// {
//  "w": "2"
// }];
// var jsonD=require("../../utils/data.js")
// console.log(jsonD.addJsonProperty(jsonArr))
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        var that = this;
        //加载后判断
        wx.getStorage({
            key: 'token',
            success: function (res) {
                if (res.data != "") {
                    that.setData({
                        isLogin: 1
                    })
                    that.getCart();
                    that.setData({
                        allCheck: false
                    })
                } else {
                    that.setData({
                        isLogin: 2
                    })
                }
            },
            fail: function () {
                that.setData({
                    isLogin: 2
                })
            }
        })
    },
//查看购物车
    getCart: function () {
        var that = this;
        console.log(token);
        wx.request({
            url: urltotal + "goodsHome/getMyCart.do?userID",
            header: {
                token: token
    },
            success: function (data) {
                console.log(data);
                if (data.data.result == "success") {
                    that.setData({
                        cartGoodsList: handleData.addProperty(data.data.content)
                    })
                    console.log(handleData.addProperty(data.data.content));
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
    //跳登录
    toLogin: function () {
        wx.navigateTo({
            url: '/pages/login/WxAccredit/WxAccredit',
        })
    },
    checkboxChange: function (event) {
        var that = this;
        var ob = this.data.cartGoodsList[event.target.id].dataList;
        //console.log(event)
        var isCheck = this.data.cartGoodsList[event.target.id].isShopCheck;
        this.data.cartGoodsList[event.target.id].isShopCheck = !isCheck;
        for (var i = 0; i < ob.length; i++) {
            console.log(this.data.cartGoodsList[event.target.id].dataList[i].isGoodsCheck)
            this.data.cartGoodsList[event.target.id].dataList[i].isGoodsCheck = !isCheck;
        }
        that.setData({
            cartGoodsList: that.data.cartGoodsList
        })
        // console.log(this.data.cartGoodsList[0].isShopCheck)
        that.updatePrice()
    },
    checkboxChange2: function (event) {

        //console.log(event.target.dataset.index)
        var isCheck = this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].isGoodsCheck;
        var that = this;
        var rel = true;
        var ob = this.data.cartGoodsList[event.target.id].dataList;
        this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].isGoodsCheck = !isCheck;


        for (var i = 0; i < ob.length; i++) {
            console.log(this.data.cartGoodsList[event.target.id].dataList[i].isGoodsCheck)
            if (!ob[i].isGoodsCheck) {
                rel = false;
            }
        }
        this.data.cartGoodsList[event.target.id].isShopCheck = rel;
        // console.log(event.target.id)
        that.setData({
            cartGoodsList: that.data.cartGoodsList
        })
        that.updatePrice()
    },
    updatePrice: function () {
        var pirce = 0;
        var pirce2 = 0;
        var arr = this.data.cartGoodsList;
        for (var i = 0; i < arr.length; i++) {
            // console.log(arr[i].dataList);
            for (var j = 0; j < arr[i].dataList.length; j++) {
                pirce2 = pirce2 + arr[i].dataList[j].discountPrice
                if (arr[i].dataList[j].isGoodsCheck) {
                    pirce = pirce + arr[i].dataList[j].discountPrice
                }
            }
        }
        if (pirce == pirce2) {
            this.setData({
                allCheck: true
            })
        } else {
            this.setData({
                allCheck: false
            })
        }
        this.setData({
            totalMoney: pirce
        })
    },
    allCheck: function () {
        var arr = this.data.cartGoodsList;
        for (var i = 0; i < arr.length; i++) {
            arr[i].isShopCheck = !this.data.allCheck
            for (var j = 0; j < arr[i].dataList.length; j++) {
                arr[i].dataList[j].isGoodsCheck = !this.data.allCheck
            }
        }
        this.setData({
            allCheck: !this.data.allCheck
        })
        this.setData({
            cartGoodsList: arr
        })
        this.updatePrice()
    },
    add: function (event) {
        var num = this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].digit;
        if (num >= this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].goodsStock) {
            return;
        }
        this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].digit = num + 1;
        this.setData({
            cartGoodsList: this.data.cartGoodsList
        })

    },
    minus: function (event) {
        var num = this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].digit;
        if (num <= this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].minOrderDigit) {
            return;
        }
        this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].digit = num - 1;
        this.setData({
            cartGoodsList: this.data.cartGoodsList
        })
    },
    //离开时触发事件
    blur: function (event) {
        var max = this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].goodsStock;
        var min = this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].minOrderDigit;
        var num = this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].digit;
        var num2 = event.detail.value;
        if (max < num2) {
            wx.showToast({
                title: '不能大于库存',
                icon: "none"
            })
        } else if (min > num2) {
            wx.showToast({
                title: '不能小于最小起定量',
                icon: "none"
            })
        } else {
            this.data.cartGoodsList[event.target.id].dataList[event.target.dataset.index].digit = num2;
        }
        this.setData({
            cartGoodsList: this.data.cartGoodsList
        })
        console.log(num2);
    }
})