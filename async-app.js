let async = require('async');

let concurrencyCount = 0;
let fetchUrl = function(url, callback){
    let delay = parseInt((Math.random() * 10000000) % 2000, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
    setTimeout(function(){
        concurrencyCount--;
        callback(null, url + ' html content');
    }, delay);
};

let urls = [];
for (let index = 0; index < 30; index++) {
    urls.push('http://datasource_' + index);
}

async.mapLimit(urls, 5, 
    function(url, callback){
        fetchUrl(url, callback);
    }, 
    function(err, result){
        console.log('final:');
        console.log(result);
    }
);