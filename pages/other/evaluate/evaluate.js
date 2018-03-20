var Link = require("../../../utils/util.js");
var Arr;
Page({
    /**
     * 兄dei
     * @issue 发表评论
     * @del 删除评论图片
     * @content:获取评论内容
     *   写字楼里写字间，写字间里程序员;
     程序人员写程序，又拿程序换酒钱。
     酒醒只在网上坐，酒醉还来网下眠;
     酒醉酒醒日复日，网上网下年复年。
     但愿老死电脑间，不愿鞠躬老板前;
     奔驰宝马贵者趣，公交自行程序员。
     *
     */
    /*
    *  页面的初始数据
    * */
    data: {
        Integral: 5,
        Logistics: 0,
        Service: 0,
        goodsID: "",
        orderNo: "",
        merchantID: "",
        con: "",
        arr: [
            {
                id: 0,
                _class: "ico iconfont icon-xingxing1"
            }, {
                id: 1,
                _class: "ico iconfont icon-xingxing1"
            }, {
                id: 2,
                _class: "ico iconfont icon-xingxing1"
            }, {
                id: 3,
                _class: "ico iconfont icon-xingxing1"
            }, {
                id: 4,
                _class: "ico iconfont icon-xingxing1"
            }
        ],
        content: "非常好",
        img: [],
        model: "display:block"
    },
    /*
      符合度评价
    */
    click: function (e) {
        console.log(e);
        var _this = this;
        var _id = e.currentTarget.id - 0;
        this.setData({
            Integral: (_id + 1)
        })
        console.log(_id);
        switch (_id) {
            case 0:
                _this.setData({
                    content: "非常差"
                })
                break;
            case 1:
                _this.setData({
                    content: "差"
                })
                break;
            case 2:
                _this.setData({
                    content: "一般"
                })
                break;
            case 3:
                _this.setData({
                    content: "好"
                })
                break;
            case 4:
                _this.setData({
                    content: "非常好"
                })
        }
    },
    click2: function (e) {
        var _id = e.currentTarget.id - 0;
        this.setData({
            Logistics: (_id + 1)
        })
    },
    click3: function (e) {
        var _id = e.currentTarget.id - 0;
        this.setData({
            Service: (_id + 1)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            goodsID: options.goodsID,
            orderNo: options.orderNo,
            merchantID: options.merchantID
        })
    },
    issue: function (e) {
        var cook = wx.getStorageSync("login");
        console.log(cook);
        var _this = this;
        var str = "";
        _this.data.img.forEach(function (e) {
            str += e;
            str += ",";
        })
        var strImg = str.substring(0, str.length - 1);

        wx.showLoading({
            title: '评论中',
            success: function (e) {
                wx.request({
                    url: `${Link.url}goodsHome/reviewOrder.do?userID=${cook.content.userID}&orderNo=${_this.data.orderNo}&goodsID=${_this.data.goodsID}&merchantID=${_this.data.merchantID}&reviewContent=${_this.data.con}&reviewImg=${strImg}&miaoShuXiangFu=${_this.data.Integral}&faHuoSuDu=${_this.data.Logistics}&fuWuTaiDu=${_this.data.Service}&reviewType=1`,
                    method: 'POST',
                    dataType: 'json',
                    header: {
                        "token": cook.content.token
                    },
                    success: function (res) {
                        if (res.data.result == "success") {
                            wx.hideLoading();
                            wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 1500,
                                success: function (r) {
                                    setTimeout(function () {
                                        wx.navigateBack({//返回上一层
                                            delta: 1
                                        })
                                    }, 1600)
                                }
                            })
                        }
                    },
                    fail: function (res) {
                        console.log("服务器炸了！")
                    },
                })
            }
        })


    },
    astrict: function (Arr2) {
        var _this = this;
        if (Arr2.length >= 3) {
            _this.setData({
                model: "display:none"
            })
            if (Arr2.length > 3) {
                console.log(Arr2.length);
                for (var i = 3; i < Arr2.length; i++) {
                    Arr2.splice(i, Arr2.length - 1);
                }
            }
        } else {
            _this.setData({
                model: "display:inline-block"
            })
        }
        return Arr2;
    },
    listenerButtonChooseImage: function (e) {
        var _this = this;
        wx.chooseImage({
            count: 3,
            success: function (res) {
                var _length = res.tempFilePaths.length;
                Arr = new Array();
                Arr = _this.data.img.concat(res.tempFilePaths);
                console.log(_this.data.img.length);
                _this.setData({
                    img: _this.astrict(Arr)
                })
            }
        })
    },
    del: function (e) {
        var _img = this.data.img;
        _img.splice(e.currentTarget.id, 1);
        console.log(_img);
        this.setData({
            img: this.astrict(_img)
        })
    },
    content: function (res) {
        this.setData({
            con: res.detail.value
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