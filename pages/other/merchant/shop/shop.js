// pages/other/merchant/shop/shop.js
var num2 = 0;
var num = 0;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        searchVal: "",
        focus: false,
        searchList: 1,
        sortShow: false,
        filterShow: false, /**是否显示选项 */
        filterType: 0, /**销售的id */
        filterArr: [
            {name: "全部", id: 0},
            {name: "现售", id: 1},
            {name: "预售", id: 2},
            {name: "团购", id: 3},
        ],
        filterName: "全部",
        sortType: 1,
        classifyObject: [
            {title: "种植业"},
            {title: "畜牧业"},
            {title: "渔业"},
            {title: "林业"},
            {title: "副业"},
            {title: "农资"},
            {title: "预售"},
            {title: "全部商家"},
        ],
        priceSort: true,
        scrollNum: 0,
        scrollNum2: 0,
        searchTopDistance: 0
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
    scroll: function (event) {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    /*显示隐藏销售模式*/
    showFilter: function () {
        console.log("ddddd");
        this.setData({
            filterShow: !this.data.filterShow

        })
    },
    checkoutSort: function (event) {
        var checkID = event.currentTarget.id;
        console.log(checkID);
        var that = this;
        that.setData({
            filterType: checkID,
            filterShow: false,
            filterName: that.data.filterArr[checkID].name
        })
    },
    /**
     * 监听输入时事件
     */
    doSearch: function (event) {
        this.setData({
            searchVal: event.detail.value
        });
    },
    toSearch: function () {
        console.log("ddddd");
        wx.switchTab({
            url: '/pages/njf/njf'
        })
    },
    showSort: function () {
        console.log("ddddd");
        this.setData({
            sortShow: !this.data.sortShow
        })
    },
    /**
     * 删除输入文字
     */
    delVal: function () {
        this.setData({
            searchVal: "",
            focus: false
        });
    },
    /**
     * 切换排序
     */
    sortCheck: function (event) {
        var checkID = event.currentTarget.id;
        var that = this;
        if (checkID == 2) {
            if (checkID == this.data.sortType) {
                that.setData({
                    priceSort: !that.data.priceSort
                })
            }
        }

        that.setData({
            sortType: checkID
        })

    },
    toApp: function () {
        var app = getApp();
        app.toApp();
    }
})