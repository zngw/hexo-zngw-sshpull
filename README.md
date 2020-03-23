# hexo-zngw-sshpull
hexo发布时，通过ssh连接远程服务器自动git pull

## 安装

```
npm i hexo-zngw-sshpull
```

## 在hexo目录下的_config.yml配置

```yml
zngw_sshpull:
    host: zengwu.com.cn         ## 需要更新的服务器地址，可以是ip也可以是域名 
    port: 22                              ## 服务器ssh连接端口
    username: root                  ## ssh连接用户名
    # password:                       ## ssh连接密码，如果填了密码，则私钥无效
    key: ./zngw.pem    ## ssh私钥文件，相对博客根目录路径或绝对路径
    dir: /data/web/blog          ## 博客在服务上的目录，不填写刚不进行目录移动
    exec: git pull                     ## 执行的更新命令，也可以在服务器上编写批处理用这个调用
```

## deploy 配置

```yml
deploy:
- type: zngw-sshpull
```