var express = require('express');
var router = express.Router();
var mysql = require("mysql");
//引入一个公共的数据库
var dbsql=require("./db")
//建立一个连接池
var connection = mysql.createPool(dbsql);

/* 后台管理页面 */
// 获取所有新闻列表
router.get('/getnews', function(req, res, next) {
    //查询语句
    connection.query('SELECT * FROM `baidunews`', function(err, rows) {
        //返回数据给前台
        res.json(rows);
    });
});
//确认修改
router.get('/curnews', function(req, res, next) {
    //得到前台传输的值
    var newsid = req.query.newsid;
    //发送查询语句
    connection.query("SELECT * FROM `baidunews` WHERE `newsid` = ?", [newsid], function(err, rows) {
        res.json(rows);
    });
});
//点击确认
router.post('/updelete', function(req, res, next) {
    //获取前台传输的数据
    var newsid = req.body.newsid;
    var newstitle = req.body.newstitle;
    var newstime = req.body.newstime;
    var newsimg = req.body.newsimg;
    var newstype = req.body.newstype;
    //发送查询语句
    connection.query("UPDATE `baidunews` SET `newstime`=?,`newstitle`=?,`newsimg`=?,`newstype`=? WHERE `newsid`=?", [newstime, newstitle, newsimg, newstype,newsid], function(err, rows) {
        res.json(rows);
        // console.log(rows.changedRows)
    });
});

//删除新闻
router.post('/delete', function(req, res, next) {
    //得到值
    var newsid = req.body.newsid;
    connection.query('DELETE FROM `baidunews` WHERE `newsid` = ?', [newsid], function(err, result) {
        console.log(result.affectedRows)
    });
});
//增加新闻
router.post('/insert', function(req, res, next) {
    //得到值
    var newstitle = req.body.newstitle;
    var newstime = req.body.newstime;
    var newsimg = req.body.newsimg;
    var newstype = req.body.newstype;
    //发送查询数据
    connection.query('INSERT INTO `baidunews`( `newstitle`, `newstime`, `newsimg`, `newstype`) VALUES (?,?,?,?)', [newstitle, newstime, newsimg, newstype], function(err, result) {
        res.json("添加信息成功");
    });
});
module.exports = router;
