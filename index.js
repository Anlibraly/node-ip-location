var ipQuery = require('./lib/ip');
var qqwry = require('./lib/qqwry');

var wryip = qqwry.init() //初始化IP库解析器
    wryip.speed(); //启用急速模式 比不开启效率率快非常多 但多占10M左右内存;

var convertIp = function(ip) {
    if(!ip) {
        return '';
    }
    
    var iparray = ip.split('.');

    if (iparray[0] === 10 || iparray[0] === 127 || (iparray[0] === 192 && iparray[1] === 168) ||
        (iparray[0] === 172 && (iparray[1] >= 16 && iparray[1] <= 31))) {

        return '';

    } else if (iparray[0] > 255 || iparray[1] > 255 || iparray[2] > 255 || iparray[3] > 255) {

        return '';

    } else {
        var location = ipQuery.find(ip);
        var prov = '';

        if(!location || (location && !location[2])) {
            var ipqy = wryip.searchIP(ip);
            prov = (ipqy && ipqy.Country) ? ipqy.Country : '';            
        }

        if(!prov && location && location.length > 2){
            prov = location.join('');
        }

        return prov;
    }
};

exports.convertIp = convertIp;
