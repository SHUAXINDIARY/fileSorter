#!/usr/bin/env node
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
var commander_1 = require("commander");
var fs_1 = require("fs");
var _package = require("../../package.json");
var qiniuUpload_1 = require("../upload/qiniuUpload");
var constant_1 = require("../constant");
var drawProgressBar_1 = require("../upload/drawProgressBar");
var upload = function (_a) {
    var ak = _a.ak, sk = _a.sk, bucket = _a.bucket, filesArr = _a.filesArr, cb = _a.cb;
    return __awaiter(void 0, void 0, void 0, function () {
        var uploadStatusMap, i, _b, fileName, path, token, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    uploadStatusMap = {};
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < filesArr.length)) return [3 /*break*/, 6];
                    _b = filesArr[i], fileName = _b.fileName, path = _b.path;
                    token = qiniuUpload_1.uptoken(ak, sk, bucket, fileName);
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    // 上传图片
                    return [4 /*yield*/, qiniuUpload_1.uploadFile(token, fileName, path)];
                case 3:
                    // 上传图片
                    _c.sent();
                    uploadStatusMap[fileName] = true;
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    // 报错记录 错误原因
                    uploadStatusMap[fileName] = String(error_1);
                    return [3 /*break*/, 5];
                case 5:
                    cb === null || cb === void 0 ? void 0 : cb();
                    i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, uploadStatusMap];
            }
        });
    });
};
// 写上传状态到当前目录文件
var writeUploadRes = function (text) { return __awaiter(void 0, void 0, void 0, function () {
    var currentDirectory, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                currentDirectory = process.cwd();
                return [4 /*yield*/, fs_1.writeFileSync(currentDirectory + "/uploadResult.json", text)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log("写入失败", error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ak, sk, bucket, filesArr, progressVal, gapVal, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                commander_1.program
                    .name(_package.name)
                    .version(_package.version)
                    .description(constant_1.COMMAND_DES)
                    .option("-a, --ak <accessKey>", "设置七牛云 accessKey")
                    .option("-s, --sk <secretKey>", "设置七牛云 secretKey")
                    .option("-b, --bucket <bucket>", "设置七牛云 bucket（上传空间）")
                    .parse(process.argv);
                _a = commander_1.program.opts(), ak = _a.ak, sk = _a.sk, bucket = _a.bucket;
                if (!ak || !sk || !bucket) {
                    process.stdout.write("请设置七牛云sk、ak、bucket");
                    return [2 /*return*/];
                }
                process.stdout.write("\n开始上传\n");
                return [4 /*yield*/, qiniuUpload_1.getCurrentFolderAllImg()];
            case 1:
                filesArr = _b.sent();
                if (filesArr.length === 0) {
                    process.stdout.write("当前目录下没有图片");
                    return [2 /*return*/];
                }
                progressVal = 0, gapVal = 1 / filesArr.length;
                drawProgressBar_1.drawProgressBar(progressVal);
                return [4 /*yield*/, upload({
                        ak: ak,
                        sk: sk,
                        bucket: bucket,
                        filesArr: filesArr,
                        cb: function () {
                            gapVal += gapVal;
                            drawProgressBar_1.drawProgressBar(gapVal >= 1 ? 1 : gapVal);
                        }
                    })];
            case 2:
                data = _b.sent();
                return [4 /*yield*/, writeUploadRes(JSON.stringify(data))];
            case 3:
                _b.sent();
                process.stdout.write("\n上传完成\n");
                return [2 /*return*/];
        }
    });
}); })();
