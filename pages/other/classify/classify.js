// pages/other/classify/classify.js
var num2 = 0;
var num = 0;
var urltotal = getApp().urltotal();
var pageSize = 10;
var page = 1;
var arr = new Array();
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
        sortArr: [
            "salesVolume",
            "minPrice"
        ],
        // 1畜牧业 2种植业 3教育直播 4农业服务 5现代农业 6农资 7副业 8林业 9渔业.不需要时可以传0
        classifyObject: [
            {title: "种植业", typeID: 2},
            {title: "畜牧业", typeID: 1},
            {title: "渔业", typeID: 9},
            {title: "林业", typeID: 8},
            {title: "副业", typeID: 7},
            {title: "农资", typeID: 6},
            {title: "咨询", typeID: 10},
            {title: "活动", typeID: 11},
        ],
        priceSort: true,
        scrollNum: 0,
        scrollNum2: 0,
        searchTopDistance: 0,
        goodsList: [],
        prompt: 0,//1为显示底部加载，2为底部加载结束，3为提示什么都没找到
        typeID: 0,
        historySearch: []
    },
    /**
     * 获取商品数据
     */
    getGoodsList: function (typeID, typeID2, saleType, keyword, sort, order, pageSize, page) {
        wx.showNavigationBarLoading()
        var that = this;
        wx.request({
            url: urltotal + 'goodsHome/getNewTypeByGoodsList.do?typeID=' + typeID + '&typeID2=' + typeID2 +
            '&saleType=' + saleType + '&keyword=' + keyword + '&sort=' + sort + '&order=' + order +
            '&pageSize=' + pageSize + '&page=' + page,
            success: function (res) {
                wx.hideNavigationBarLoading()
                console.log(res)
                that.setData({
                    goodsList: page == 1 ? res.data.content : that.data.goodsList.concat(res.data.content)
                })
                if (res.data.content.length == 0) {
                    that.setData({
                        prompt: 3
                    })
                } else if (res.data.content.length < pageSize) {
                    that.setData({
                        prompt: 2
                    })
                } else {
                    that.setData({
                        prompt: 1
                    })
                }
            }
        })
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
        page = 1;
        that.getGoodsList(that.data.typeID, 0, that.data.filterArr[that.data.filterType].id, that.data.searchVal, that.data.sortArr[that.data.sortType - 1], that.data.priceSort ? "desc" : "asc", pageSize, page);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.type !== undefined) {
            //搜索
            var that = this;
            if (options.type == -1) {

                wx.setNavigationBarTitle({
                    title: "搜索"
                })
                wx.getStorage({
                    key: 'historySearch',
                    success: function (res) {
                        that.setData({
                            historySearch: res.data
                        })
                    }
                })
                that.setData({
                    focus: true
                })
                return;
            }

            wx.setNavigationBarTitle({
                title: that.data.classifyObject[options.type - 1].title
            })
            var typeID = that.data.classifyObject[options.type - 1].typeID
            that.setData({
                typeID: typeID
            })
            page = 1;
            //getGoodsList: function (typeID, typeID2, saleType, keyword, sort, order, pageSize, page)
            if (typeID == 11) {
                that.getGoodsList(0, 0, 4, "", "salesVolume", "desc", pageSize, page)
            } else if (typeID == 10) {
                wx.navigateTo({
                    url: '/pages/other/guideApp/guideApp',
                })
            } else {
                that.getGoodsList(that.data.typeID, 0, that.data.filterArr[that.data.filterType].id, that.data.searchVal, that.data.sortArr[that.data.sortType - 1], that.data.priceSort ? "desc" : "asc", pageSize, page);
            }
        }

    },
    /**
     * 监听输入时事件
     */
    doSearch: function (event) {
        this.setData({
            searchVal: event.detail.value
        });
        if (event.detail.value == "") {
            console.log("dddddddddddddd");
            this.setData({
                focus: true,
                goodsList: [],
                prompt: 0
            });
        }
    },
    //删除指定的数组
    delArr: function (arrM, str) {
        var num = -1;
        for (var i = 0; i < arrM.length; i++) {
            if (arrM[i] == str) {
                num = i;
            }
        }
        if (num == -1) {
            return arrM;
        } else {

            return arrM.splice(num, 1);
        }
    },
    toSearch: function () {
        var that = this;
        // console.log(that.data.searchVal);
        that.searchDefault();
        that.setData({
            focus: false
        })
        page = 1;
        that.getGoodsList(that.data.typeID, 0, that.data.filterArr[that.data.filterType].id, that.data.searchVal, that.data.sortArr[that.data.sortType - 1], that.data.priceSort ? "desc" : "asc", pageSize, page);
        wx.getStorage({
            key: 'historySearch',
            success: function (res) {
                arr = res.data.reverse();
                arr = that.delArr(arr, that.data.searchVal);
                console.log(arr)
                arr = res.data.concat(that.data.searchVal);
                arr = arr.reverse()
                arr.splice(10, arr.length);
                wx.setStorage({
                    key: "historySearch",
                    data: arr,
                    success: function () {
                        that.setData({
                            historySearch: arr
                        })
                    }
                })

            },
            fail: function () {
                arr = new Array();
                arr[0] = that.data.searchVal;
                wx.setStorage({
                    key: "historySearch",
                    data: arr,
                    success: function () {
                        that.setData({
                            historySearch: arr[0]
                        })
                    }
                })
            }
        })
       
    },
    showSort: function () {
        console.log("ddddd");
        this.setData({
            sortShow: !this.data.sortShow
        })
    },
    //删除历史记录
    delHistorySearch: function () {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定删除全部历史记录？',
            success: function (res) {
                if (res.confirm) {
                    wx.removeStorage({
                        key: 'historySearch',
                        success: function (res) {
                            that.setData({
                                historySearch: []
                            })
                            wx.showToast({
                                title: '删除成功',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                } else if (res.cancel) {
                }
            }
        })
    },
    //删除指定的历史记录
    delSpecifyHistorySearch: function (event) {
        var delID = event.currentTarget.id;
        console.log(event.currentTarget.id);
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定删除改条历史记录？',
            success: function (res) {
                if (res.confirm) {
                    that.data.historySearch.splice(delID, 1);
                    wx.setStorage({
                        key: "historySearch",
                        data: that.data.historySearch,
                        success: function () {
                            that.setData({
                                historySearch: that.data.historySearch
                            })
                            wx.showToast({
                                title: '删除成功',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                } else if (res.cancel) {
                }
            }
        })
    },
    //点击历史记录
    toHistory: function (event) {
        var that = this;
        var searchID = event.currentTarget.id;
        console.log(that.data.historySearch[searchID])
        that.setData({
            focus: false,
            searchVal: that.data.historySearch[searchID]
        })
        page = 1;
        that.getGoodsList(that.data.typeID, 0, that.data.filterArr[that.data.filterType].id, that.data.searchVal, that.data.sortArr[that.data.sortType - 1], that.data.priceSort ? "desc" : "asc", pageSize, page);
    },
    /**
     * 删除输入文字
     */
    delVal: function () {
        this.setData({
            searchVal: "",
            focus: true,
            goodsList: [],
            prompt: 0
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
        page = 1;
        that.getGoodsList(that.data.typeID, 0, that.data.filterArr[that.data.filterType].id, that.data.searchVal, that.data.sortArr[that.data.sortType - 1], that.data.priceSort ? "desc" : "asc", pageSize, page);
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
    },
    lower: function () {
        var that = this;
        if (this.data.prompt == 1) {
            console.log("低触发啦")
            page = page + 1;
            that.getGoodsList(that.data.typeID, 0, that.data.filterArr[that.data.filterType].id, that.data.searchVal, that.data.sortArr[that.data.sortType - 1], that.data.priceSort ? "desc" : "asc", pageSize, page);
        }
    },
    //进入店铺
    toShop: function () {
        wx.navigateTo({
            url: '../merchant/shop/shop',
        })
    },
    //默认设置
    searchDefault: function () {
        this.setData({
            filterType: 0,
            filterShow: false,
            filterName: this.data.filterArr[0].name
        })
    }
})