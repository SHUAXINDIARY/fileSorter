# 项目简介 - About the Project 

处理图片文件的终端工具 - The terminal tool for processing image files

# 文件分类 - Image Categorization

## 使用 - Usage

```shell

# 安装 - install
npm i fs-killer -g

# eg：cd [dir]
cd ~/Desktop/imgs

# 执行 - execute
sorter

```

### 所有选项 - All options

```shell

# specifying a directory
sorter -d source

# specifying a file types
sorter -t JPG

# specifying sorter mode - move files
# if not specified, replication is performed
sorter -m 

```

## TODO

### 核心 - Core：

- [x] 对文件分类到不同类型的文件夹 - classify files

- [x] 指定要被分类的目录 - specify folder

- [x] 指定分类的类型 - specify file type

- [x] 复制或者移动分类文件 - copy or move classified files

- [ ] 列出目录下所有文件类型 - view a collection of all file types in a directory

- [ ] 操作数量展示 - display number of operation files

### 其他 - other：
  - [x] cli支持 - support cli

  - [ ] 命令行交互优化 - interactional optimization
  

# 图片上传 - img upload 

### 功能说明 - Functional description

- 上传执行目录内全部图片到七牛云对象存储 - upload all images in the current directory to Qiniu Cloud Object Storage
- 上传过程进度条展示 - display the upload progress bar during the uploading process.
- 输出上传结果日志 - output the upload result logs.

### 食用指南 - Guide

```bash

# 安装 - install
npm i -g xxx

# 使用 - use
# s:SECRET_KEY  a: ACCESS_KEY b: 上传空间（bucket）
upload -s xxx -a xxx -b xxx

```
