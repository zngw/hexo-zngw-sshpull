var pathFn = require('path');
var fs = require('fs');

module.exports = function (args) {
    var log = this.log;
    var config = this.config;

    const Client = require("ssh2").Client;
    const conn = new Client();

    var cmd = ''
    if(config.zngw_sshpull.dir)
        cmd += 'cd '+config.zngw_sshpull.dir+';';

    if(config.zngw_sshpull.exec)
        cmd += config.zngw_sshpull.exec
    else
        cmd += 'git pull'

    var user = {
        "host": config.zngw_sshpull.host,
        "port": config.zngw_sshpull.port,
        "username": config.zngw_sshpull.username,
        "privateKey": "",
        "password": ""
    };

    if(config.zngw_sshpull.password){
        user["password"] =config.zngw_sshpull.password;
    }else if(config.zngw_sshpull.key){
        user["privateKey"] = fs.readFileSync(path.join(config.zngw_sshpull.key));
    }else{
        log('执行失败，缺省密码或私钥');
        return;
    }

    conn.on('ready', function () {
        log('----服务器连接成功-----');
        conn.exec(cmd, function (err, stream) {
            if (err) throw err;
            stream.on('close', function (code, signal) {
                log('执行成功，断开服务器');
                conn.end();
            }).on('data', function (data) {
                log('执行结果:\n' + data);
            }).stderr.on('data', function (data) {
                log('执行出错: \n' + data);
            });
        });
    }).connect(user)
};