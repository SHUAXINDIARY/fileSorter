import { readdirSync } from "fs";
const qiniu = require("qiniu");

//构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
export function uptoken(AK: string, SK: string, bucket: string, fileName = "") {
  var mac = new qiniu.auth.digest.Mac(AK, SK);

  var putPolicy = new qiniu.rs.PutPolicy({
    scope: `${bucket}:${fileName}`,
  });
  return putPolicy.uploadToken(mac);
}

//构造上传函数
export function uploadFile(uptoken: string, key = "", localFile: any) {
  var config = new qiniu.conf.Config();
  var extra = new qiniu.form_up.PutExtra();
  var formUploader = new qiniu.form_up.FormUploader(config);
  return new Promise((res, rej) => {
    formUploader.putFile(
      uptoken,
      key,
      localFile,
      extra,
      function (err: any, ret: any) {
        if (!err) {
          // 上传成功， 处理返回值
          // console.log(ret.hash, ret.key, ret.persistentId);
          res(ret);
        } else {
          // 上传失败， 处理返回代码
          // console.log(err);
          rej(err);
        }
      }
    );
  });
}

// 获取当前目录下所有图片文件
export const getCurrentFolderAllImg = async () => {
  try {
    // 获取当前目录
    const currentDirectory = process.cwd();
    // 读取当前目录下所有文件
    const files = await readdirSync(currentDirectory);
    // 筛选只要图片
    return files
      .filter((file) => /\.(jpg|jpeg|png|gif|bmp|svg)$/.test(file))
      .map((file) => {
        return {
          fileName: file,
          path: `${currentDirectory}/${file}`,
        };
      });
  } catch (error) {
    throw error;
  }
};
