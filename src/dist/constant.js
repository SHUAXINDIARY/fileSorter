"use strict";
var _a, _b, _c;
exports.__esModule = true;
exports.COMMAND_DES = exports.COMMAND_DEFAULT_VALUE = exports.COMMAND_ARG_DES = exports.COMMAND_OPTIONS = exports.ARGMAP = exports.ERRCODEMAP = void 0;
exports.ERRCODEMAP = {
    // 文件重复错误码
    EEXIST: "EEXIST"
};
// 参数列表
exports.ARGMAP = {
    // 指定目录
    DIR: "directory",
    // 指定要分类的文件类型
    TYPE: "getType",
    // 移动还是复制
    IS_MOVE: "isMove"
};
// 参数配置选项
exports.COMMAND_OPTIONS = (_a = {},
    _a[exports.ARGMAP.DIR] = "-d, --directory <dirname>",
    _a[exports.ARGMAP.TYPE] = "-t, --type <fileType>",
    _a[exports.ARGMAP.IS_MOVE] = "-m, --move",
    _a);
// 参数描述
exports.COMMAND_ARG_DES = (_b = {},
    _b[exports.ARGMAP.DIR] = "select a directory",
    _b[exports.ARGMAP.TYPE] = "specifying a file type",
    _b[exports.ARGMAP.IS_MOVE] = "If this parameter is added, it will move all your files instead of copying them",
    _b);
// 参数默认值
exports.COMMAND_DEFAULT_VALUE = (_c = {},
    // 默认对当前目录文件进行分类
    _c[exports.ARGMAP.DIR] = process.cwd(),
    _c[exports.ARGMAP.TYPE] = "all",
    _c);
// 命令行describe
exports.COMMAND_DES = "\u6587\u4EF6\u5206\u7C7B\u547D\u4EE4\uFF1Asorter\n\u6587\u4EF6\u4E0A\u4F20\u547D\u4EE4\uFF1Aupload\n\u4EE5\u4E0B\u53C2\u6570\u4E3Asorter\u547D\u4EE4\u7684\u53C2\u6570";
