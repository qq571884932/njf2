// pages/addsite/addsite.js

Page({
    /**
     * 页面的初始数据
     */
    data: {
        list: "所在地区：",
        addr: "",
        addressID: 0
    },
    formSubmit: function (e) {   /*提交*/
        var utils = require("../../../../utils/util.js");
        var login = wx.getStorageSync("login");
        var that = this;
        var xiangxi = e.detail.value.addr;//详细地址
        var ren = e.detail.value.consignee;//收货人
        var userID = login.content.userID;
        var phone = e.detail.value.userPhone;//手机号
        var addr = this.data.addr;//地址分割
        var arr = addr.split(" ");
        var provinceCityArea = addr;
        var sheng = arr[0];//省
        var shi = arr[1];//市
        var qu = arr[2];//区
        var isphone = utils.isPhone(phone);
        console.log(sheng + shi + qu + xiangxi);
        if (ren === "") {
            console.log("请填写收货人！！");
            return;
        } else if (phone == "") {
            console.log("请填写手机号！")
            return;
        } else if (addr == "") {
            console.log("请选择地区！！");
            return;
        } else if (isphone == false || isphone == false) {
            return;
        } else if (xiangxi == "") {
            console.log("请填写详细地址！！");
            return;
        }
        wx.request({
            url: `${utils.url}address/saveAddress.do?receive=${ren}&withaddress=${addr + xiangxi}&province=${sheng}&city=${shi}&area=${qu}&isDefault=${1}&userID=${userID}&addressID=${that.data.addressID}&detailedAddress=${xiangxi}&provinceCityArea=${provinceCityArea}&receivephone=${phone}`,
            header: {
                "token": login.content.token,
                'content-type': 'application/json'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                if (res.data.result === "success") {
                    console.log("保存成功");
                    wx.redirectTo({//返回上一页  有销毁功能
                        url: '../site/site',
                    })
                    that.setData({
                        name: "",
                        phone: "",
                        addr: "",
                        detail: ""
                    })
                } else {
                    console.log(res.data.error);
                }
            },
            fail: function (res) {
                console.log(res);
            },
        })
    },
    onLoad: function (options) {
        var login = wx.getStorageSync("login");
        var utils = require("../../../../utils/util.js");
        var that = this;
        if (options.addressID != undefined) {
            wx.request({
                url: `${utils.url}address/getAddress.do?userID=${login.content.userID}&addressID=${options.addressID}`,
                header: {
                    "token": login.content.token
                },
                method: 'GET',
                dataType: 'json',
                responseType: 'text',
                success: function (res) {
                    if (res.data.result === "success") {
                        that.setData({
                            name: res.data.content.receive,
                            phone: res.data.content.receivephone,
                            addr: res.data.content.provinceCityArea,
                            detail: res.data.content.detailedAddress,
                            addressID: options.addressID
                        })
                    } else {
                        console.log(res.data.error);
                    }
                },
                fail: function (res) {
                    console.log("接口错误！！！")
                },
            })
        }
    }
})