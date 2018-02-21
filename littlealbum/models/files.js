const fs = require("fs");

exports.getAllAlbums = function(callback) {
    fs.readdir("./uploads", (err, files) => {
        if (err) {
            callback("没有找到这个文件夹", null);
        }
        var allAlbums = [];
        (function iterator(i) {
            if (i == files.length) {
                callback(null, allAlbums);
                return;
            }
            fs.stat("./uploads/" + files[i], (err, stats) => {
                if (err) {
                    callback("没有此文件夹", null);
                    return;
                }
                if (stats.isDirectory) {
                    allAlbums.push(files[i]);
                }
                iterator(i + 1);
            })
        })(0);
    });
}
exports.getAllImages = function(albumName, callback) {
    fs.readdir("./uploads/" + albumName, (err, files) => {
        if (err) {
            callback("没有这个文件夹", null);
            return;
        }
        var allImages = [];
        (function iterator(i) {
            if (i == files.length) {
                callback(null, allImages);
                return;
            }
            fs.stat("./uploads/" + albumName, (err, stats) => {
                if (err) {
                    callback("没有此文件夹", null);
                    return;
                }
                if (stats.isFile) {
                    allImages.push(files[i]);
                }
                iterator(i + 1);
            })
        })(0);
    });
};