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
    urltotal: function () {
        return "http://192.168.2.100/njf/";
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
// {
//     "iconPath": "style/img/2.png",
//         "selectedIconPath": "style/img/2.png",
//             "pagePath": "pages/other/guideApp/guideApp",
//                 "text": "可视商圈"
// }