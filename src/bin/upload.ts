#!/usr/bin/env node
import { program } from "commander";
import { writeFileSync } from "fs";
const _package = require("../../package.json");
import {
  uptoken,
  uploadFile,
  getCurrentFolderAllImg,
} from "../upload/qiniuUpload";
import { COMMAND_DES } from "../constant";
import { drawProgressBar } from "../upload/drawProgressBar";

const upload = async ({
  ak,
  sk,
  bucket,
  filesArr,
  cb,
}: {
  ak: string;
  sk: string;
  bucket: string;
  filesArr: { fileName: string; path: string }[];
  cb?: () => void;
}) => {
  // 记录图片上传状态
  const uploadStatusMap = {} as Record<string, string | boolean>;
  let i = 0;
  while (i < filesArr.length) {
    const { fileName, path } = filesArr[i];
    const token = uptoken(ak, sk, bucket, fileName);
    try {
      // 上传图片
      await uploadFile(token, fileName, path);
      uploadStatusMap[fileName] = true;
    } catch (error) {
      // 报错记录 错误原因
      uploadStatusMap[fileName] = String(error);
      // console.log("上传失败", fileName, error);
    }
    cb?.();
    i++;
  }
  return uploadStatusMap;
};

// 写上传状态到当前目录文件
const writeUploadRes = async (text: string) => {
  try {
    const currentDirectory = process.cwd();
    await writeFileSync(`${currentDirectory}/uploadResult.json`, text);
  } catch (error) {
    console.log("写入失败", error);
  }
};

(async () => {
  program
    .name(_package.name)
    .version(_package.version)
    .description(COMMAND_DES)
    .option("-a, --ak <accessKey>", "设置七牛云 accessKey")
    .option("-s, --sk <secretKey>", "设置七牛云 secretKey")
    .option("-b, --bucket <bucket>", "设置七牛云 bucket（上传空间）")
    .parse(process.argv);

  const { ak, sk, bucket } = program.opts<{
    ak?: string;
    sk?: string;
    bucket?: string;
  }>();

  if (!ak || !sk || !bucket) {
    process.stdout.write("请设置七牛云sk、ak、bucket");
    return;
  }

  process.stdout.write("\n开始上传\n");
  // 当前目录下所有图片
  const filesArr = await getCurrentFolderAllImg();
  if (filesArr.length === 0) {
    process.stdout.write("当前目录下没有图片");
    return;
  }
  let progressVal = 0,
    gapVal = 1 / filesArr.length;
  drawProgressBar(progressVal);
  const data = await upload({
    ak,
    sk,
    bucket,
    filesArr,
    cb: () => {
      gapVal += gapVal;
      drawProgressBar(gapVal >= 1 ? 1 : gapVal);
    },
  });

  await writeUploadRes(JSON.stringify(data));
  process.stdout.write("\n上传完成\n");
})();
