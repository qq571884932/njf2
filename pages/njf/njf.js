// pages/njf/njf.js
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
                img: "http://www.njf2016.com/wx/img/type/8.png",
                title: "可视商圈",
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
        address: "河源 坚基购物广场"

    },
    scroll: function (event) {
// console.log("dddd");
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
            }
        })
    },
    /*
    跳转分类
    */
    onClassify: function (event) {
        if (event.currentTarget.id == 8) {
            var app = getApp();
            app.toApp();

            return;
        }
        wx.navigateTo({
            url: '../other/classify/classify?type=' + event.currentTarget.id,
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