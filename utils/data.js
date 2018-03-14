//json添加新属性
var addJsonProperty = function (jsonData) {
    var arr = new Array();
    for (var i = 0; i < jsonData.length; i++) {
        jsonData[i].isCheck = false;
        arr[i] = jsonData[i];
    }
    return arr;
}
module.exports = {
    addJsonProperty: addJsonProperty
}