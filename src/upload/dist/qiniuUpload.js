"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getCurrentFolderAllImg = exports.uploadFile = exports.uptoken = void 0;
var fs_1 = require("fs");
var qiniu = require("qiniu");
//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(AK, SK, bucket, fileName) {
    if (fileName === void 0) { fileName = ""; }
    var mac = new qiniu.auth.digest.Mac(AK, SK);
    var putPolicy = new qiniu.rs.PutPolicy({
        scope: bucket + ":" + fileName
    });
    return putPolicy.uploadToken(mac);
}
exports.uptoken = uptoken;
//构造上传函数
function uploadFile(uptoken, key, localFile) {
    if (key === void 0) { key = ""; }
    var config = new qiniu.conf.Config();
    var extra = new qiniu.form_up.PutExtra();
    var formUploader = new qiniu.form_up.FormUploader(config);
    return new Promise(function (res, rej) {
        formUploader.putFile(uptoken, key, localFile, extra, function (err, ret) {
            if (!err) {
                // 上传成功， 处理返回值
                // console.log(ret.hash, ret.key, ret.persistentId);
                res(ret);
            }
            else {
                // 上传失败， 处理返回代码
                // console.log(err);
                rej(err);
            }
        });
    });
}
exports.uploadFile = uploadFile;
// 获取当前目录下所有图片文件
exports.getCurrentFolderAllImg = function () { return __awaiter(void 0, void 0, void 0, function () {
    var currentDirectory_1, files, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentDirectory_1 = process.cwd();
                return [4 /*yield*/, fs_1.readdirSync(currentDirectory_1)];
            case 1:
                files = _a.sent();
                // 筛选只要图片
                return [2 /*return*/, files
                        .filter(function (file) { return /\.(jpg|jpeg|png|gif|bmp|svg)$/.test(file); })
                        .map(function (file) {
                        return {
                            fileName: file,
                            path: currentDirectory_1 + "/" + file
                        };
                    })];
            case 2:
                error_1 = _a.sent();
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
