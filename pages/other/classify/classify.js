// pages/other/classify/classify.js
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.type !== undefined) {
            var that = this;
            if (options.type == -1) {
                wx.setNavigationBarTitle({
                    title: "搜索"
                })
                that.setData({
                    focus: true
                })
                return;
            }

            wx.setNavigationBarTitle({
                title: that.data.classifyObject[options.type - 1].title
            })
        }

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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
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
    scroll: function (event) {

        if (event.detail.deltaY < 0) {
            num2 = event.detail.scrollTop
            if (num2 >= 40) {
                num2 = 40
            }
            this.setData({
                searchTopDistance: -num2
            })

        } else {
            num = this.data.searchTopDistance + event.detail.deltaY;
            if (num >= 0) {
                num = 0
            }
            this.setData({
                searchTopDistance: num
            })

        }
    },
    onPageScroll: function (event) {

        //   if (this.data.scrollNum < event.scrollTop){
        //       console.log("向下滚")
        //       this.setData({
        //           scrollNum: event.scrollTop
        //       })
        //       if (event.scrollTop - this.data.scrollNum>80){

        //       }

        //   }else{
        //       console.log("向上滚") 
        //       this.setData({
        //           scrollNum: event.scrollTop
        //       }) 
        //   }
    },
    lower: function () {

    },
    //进入店铺
    toShop: function () {
        wx.navigateTo({
            url: '../merchant/shop/shop',
        })
    }
})