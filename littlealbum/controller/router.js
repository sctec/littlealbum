const file = require("../models/files");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

exports.showIndex = function(req, res, next) {
    file.getAllAlbums(function(err, allAlbums) {
        if (err) {
            next();
            return;
        }
        res.render("index", {
            "albums": allAlbums
        })
    })
}

exports.showAlbum = function(req, res, next) {
        var albumName = req.params.albumName;
        file.getAllImages(albumName, function(err, allimages) {
            if (err) {
                next();
                return;
            }
            res.render("album", {
                "images": allimages,
                "albumname": albumName
            })
        });
    }
    //上传图片

exports.showUp = (req, res, next) => {
    file.getAllAlbums(function(err, allAlbums) {
        res.render("up", { albums: allAlbums });
    });
}

exports.doShowUp = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname + "/../tmp/");
    form.parse(req, function(err, fields, files, next) {
        if (err) {
            next();
            return;
        }
        var size = parseInt(files.tupian.size);
        if (size > 204800) {
            res.send("图片的尺寸应该小于2M");
            fs.unlink(files.tupian.path);
            return;
        }
        var filesName = files.tupian.name;
        var wenjianjia = fields.wenjianjia;
        var oldpath = files.tupian.path;
        var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + filesName);
        fs.rename(oldpath, newpath, function(err) {
            if (err) {
                console.log(err);
                res.send("改名失败");
                return;
            }
            res.send("成功");
        });
    });
    return;
}