// pages/njf/njf.js
var urltotal = getApp().urltotal();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperCurrent: 0,
        indicatorDots: true,
        autoplay: false,
        interval: 3000,
        duration: 800,
        circular: false,
        scrollNum: 0,
        typeItem: [
            {
                img: "http://www.njf2016.com/wx/img/type/1.png",
                title: "种植业",
                id: 1
            }, {
                img: "http://www.njf2016.com/wx/img/type/2.png",
                title: "畜牧业",
                id: 2
            }, {
                img: "http://www.njf2016.com/wx/img/type/3.png",
                title: "渔业",
                id: 3
            }, {
                img: "http://www.njf2016.com/wx/img/type/4.png",
                title: "林业",
                id: 4
            }, {
                img: "http://www.njf2016.com/wx/img/type/5.png",
                title: "副业",
                id: 5
            }, {
                img: "http://www.njf2016.com/wx/img/type/6.png",
                title: "农资",
                id: 6
            }, {
                img: "http://www.njf2016.com/wx/img/type/7.png",
                title: "资讯",
                id: 7
            }, {
                img: "http://www.njf2016.com/wx/img/type/cx1.gif",
                title: "活动",
                id: 8
            }],
        typeItem2: [
            {
                img: "http://www.njf2016.com/wx/img/type/9.png",
                title: "批发"
            }, {
                img: "http://www.njf2016.com/wx/img/type/10.png",
                title: "农业资讯"
            }
        ],
        address: "河源 源城区",
        prompt: 1,//1为显示底部加载，2为底部加载结束，3为提示什么都没找到
        goodsList: [],
        mX: 0,
        mY: 0
    },
    scroll: function (event) {
        console.log(event.detail.scrollTop);
        if (this.data.scrollNum < event.detail.scrollTop) {

        } else {

        }
        if (event.detail.deltaY >= 0 && event.detail.deltaY < 2) {
            console.log(event.detail.deltaY)
        }


    },
    lower: function () {
        // console.log("dddd");
    },
    aa: function () {
        console.log("dddd");
    },
    toLocation: function () {
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.userInfo']) {
                    wx.authorize({
                        scope: 'scope.userInfo',
                        success(e) {
                            // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
                            console.log(e)
                        }
                    })
                }
            }
        })
        wx.getUserInfo({
            success: function (res) {
                console.log(res)
            }
        })
        wx.login({
            success: function (res) {
                if (res.code) {
                    //发起网络请求
                    console.log(res)
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
        // wx.navigateTo({
        //       url: '../other/test/test',
        // })
    },
    /*
    跳转搜索
    */
    toSearch: function () {
        wx.navigateTo({
            url: '../other/classify/classify?type=-1',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.str != undefined) {
            console.log("接收到的参数是str=" + options.str);
        }
        var that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                console.log(res)
                that.setData({})
                that.getAddress(res.latitude, res.longitude)
            }
        })
    },
    /**
     * 获取地址
     */
    getAddress: function (latitude, longitude) {
        this.getAd();
        var that = this;
        wx.request({
            url: urltotal + 'other/getAddByLAL.do?log=' + longitude + '&lat=' + latitude, //仅为示例，并非真实的接口地址

            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                console.log(res)
                var a = JSON.parse(res.data).addrList[0].admName;
                console.log(JSON.parse(res.data))
                that.setData({
                    address: a.split(",")[1] + " " + a.split(",")[2]
                })
            }
        })
    },
    /*
    跳转分类
    */
    onClassify: function (event) {
        if (event.currentTarget.id == 7 || event.currentTarget.id == 8) {
            var app = getApp();
            app.toApp();
            return;
        }
        wx.navigateTo({
            url: '../other/classify/classify?type=' + event.currentTarget.id,
        })
    },
    toApp: function () {
        var app = getApp();
        app.toApp()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    /**
     * typeID
     */
    getAd: function () {
        wx.showNavigationBarLoading()
        var that = this;
        wx.request({
            url: urltotal + 'adv/getAdv.do?typeID=1,2,6,7,8,9',
            success: function (res) {
                wx.hideNavigationBarLoading()
                console.log(res.data);
                that.setData({
                    goodsList: res.data.content
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    move: function (event) {
        var that = this;
        var x = 0, y = 0;

        wx.getSystemInfo({
            success: function (res) {
                x = res.windowWidth - event.touches[0].clientX;
                y = res.windowHeight - event.touches[0].clientY;
                if (x > (res.windowWidth - 32)) {
                    x = res.windowWidth - 32
                }
                if (x < 33) {
                    x = 33
                }
                if (y > res.windowHeight - 32) {
                    y = res.windowHeight - 32
                }
                if (y < 33) {
                    y = 33;
                }
                that.setData({
                    mX: x - 32,
                    mY: y - 32
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
    onPageScroll: function (event) {

        if (this.data.scrollNum < event.scrollTop) {
            console.log("向下滚")
            this.setData({
                scrollNum: event.scrollTop
            })
        } else {
            console.log("向上滚")
            this.setData({
                scrollNum: event.scrollTop
            })
        }
    },

})