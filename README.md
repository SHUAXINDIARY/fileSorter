# 项目简介 - About the Project 

自用的文件操作cli工具

# 文件分类

## 使用 - usage

```shell

# 安装 - install
npm i fs-killer -g

# eg：cd [dir]
cd ~/Desktop/imgs

# 执行 - execute
sorter

```

### 所有选项 - all options

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

### 核心 - core：

- [x] 对文件分类到不同类型的文件夹 - classify files

- [x] 指定要被分类的目录 - specify folder

- [x] 指定分类的类型 - specify file type

- [x] 复制或者移动分类文件 - copy or move classified files

- [ ] 列出目录下所有文件类型 - view a collection of all file types in a directory

- [ ] 操作数量展示 - display number of operation files

### 其他 - other：
  - [x] cli支持 - support cli

  - [ ] 命令行交互优化 - interactional optimization
  

# 文件上传

### 功能说明

- 上传执行目录内的全部图片到指定空间
- 上传过程中有loading ui展示
- 输出上传结果日志

### 食用指南

```bash
# 使用流程：

# 安装
npm i -g xxx

# 使用
# s:SECRET_KEY  a: ACCESS_KEY b: 上传空间（bucket）
upload -s xxx -a xxx -b 

```