//app.js
App({
    data: {
        filterArr: [
            {name: "全部", id: 0},
            {name: "现售", id: 1},
            {name: "预售", id: 2},
            {name: "团购", id: 3},
        ],
    },
    onLaunch: function () {


    },
    globalData: {
        userInfo: null
    },
    toApp: function () {
        wx.navigateTo({
            url: "/pages/other/guideApp/guideApp"
        })
    }
})