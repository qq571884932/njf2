// pages/myCart/myCart.js
const util = require("../../utils/md5.js");
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
        check: 0
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