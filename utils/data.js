//json添加新属性
var addJsonProperty = function (jsonData) {
    var arr = new Array();
    for (var i = 0; i < jsonData.length; i++) {
        jsonData[i].isCheck = false;
        arr[i] = jsonData[i];
    }
    return arr;
}
//购物车添加新属性
var addProperty = function (content) {
    if (content.length != 0) {
        for (var i = 0; i < content.length; i++) {
            content[i].isShopCheck = false;
            for (var j = 0; j < content[i].dataList.length; j++) {
                content[i].dataList[j].isGoodsCheck = false;
            }
        }
    }
    return content;
}
module.exports = {
    addJsonProperty: addJsonProperty,
    addProperty: addProperty
}