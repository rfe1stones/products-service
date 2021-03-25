"use strict";
exports.__esModule = true;
var fs = require("fs");
var process = require("process");
var ParseCSV = /** @class */ (function () {
    function ParseCSV(filePath, lineFixer) {
        this.filePath = filePath;
        this.lineNumber = 0;
        this.readStream = fs.createReadStream(this.filePath);
        this.readStream.setEncoding('utf-8');
        this.lineFixer = lineFixer;
        this.lineRemnant = '';
    }
    ParseCSV.prototype.resumeStream = function () {
        this.readStream.resume();
    };
    ParseCSV.prototype.read = function (mapFunction, callback) {
        var _this = this;
        var resume = this.resumeStream.bind(this);
        this.readStream.on('close', function () {
            if (_this.lineRemnant) {
                var line = _this.lineRemnant;
                if (_this.lineFixer && _this.lineFixer.select(line)) {
                    line = _this.lineFixer.transform(line);
                }
                var data = _this.parseLine(mapFunction, line);
                callback([data], function () {
                    process.exit(0);
                });
            }
        });
        this.readStream.on('error', function (error) {
            console.log('Error reading data!');
            console.log(error);
        });
        this.readStream.on('data', function (chunk) {
            // pause the stream until we have inserted all these lines
            _this.readStream.pause();
            var text = _this.lineRemnant.length ? _this.lineRemnant + chunk : chunk;
            var line = '';
            var dataArray = [];
            for (var i = 0; i < text.length; i++) {
                var c = text.charAt(i);
                if (c !== "\n") {
                    line += c;
                    continue;
                }
                // end of line reached
                if (line.charAt(0) === 'i') {
                    line = '';
                    continue;
                }
                if (_this.lineFixer && _this.lineFixer.skip && _this.lineFixer.skip(line)) {
                    line = '';
                    continue;
                }
                if (_this.lineFixer && _this.lineFixer.select(line)) {
                    line = _this.lineFixer.transform(line);
                }
                var data = _this.parseLine(mapFunction, line);
                dataArray.push(data);
                line = '';
            }
            _this.lineRemnant = line;
            callback(dataArray, resume);
        });
    };
    ParseCSV.prototype.parseLine = function (mapFunction, line) {
        var array = JSON.parse("[" + line + "]");
        return mapFunction(array);
    };
    return ParseCSV;
}());
exports["default"] = ParseCSV;
