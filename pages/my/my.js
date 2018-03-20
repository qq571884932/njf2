Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "",
        userImgSring: "../../style/img/defalt2-1.png",
        userimg: "",
        hide: "false"
    },
    /*用户推出 清楚cooki*/
    esc: function (e) {
        var _this = this;
        wx.showModal({
            title: '提示',
            content: '是否确认退出',
            showCancel: true,
            success: function (res) {
                if (res.confirm) {
                    wx.removeStorageSync('login');
                    wx.removeStorageSync('token');
                    _this.setData({
                        username: "",
                        userImgSring: "../../style/img/defalt2-1.png",
                        userimg: "",
                        addr: '../login/login/login',
                        order: '../login/login/login'
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
                
            },
        })
    },
    /**
     * 跳转登录
     */
    toLogin: function () {
        if (wx.getStorageSync('token').length <= 5) {
            wx.navigateTo({
                url: '../login/WxAccredit/WxAccredit',
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        wx.getStorage({
            key: 'login',
            success: function (res) {
                console.log(res.data.content);
                if (res.data.content.errcode == "") {
                    _this.setData({
                        addr: '../login/WxAccredit/WxAccredit',
                        order: '../login/WxAccredit/WxAccredit'
                    })
                } else {
                    _this.setData({
                        userimg: res.data.content.userImage,
                        username: res.data.content.userName,
                        addr: '../other/address/site/site',
                        order: '../other/order/order'
                    })
                }
            },
            fail: function () {
                _this.setData({
                    addr: '../login/WxAccredit/WxAccredit',
                    order: '../login/WxAccredit/WxAccredit'
                })
            }
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