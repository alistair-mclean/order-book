const proxy = require('http-proxy-middleware');
module.exports = function(app:any) {
    app.use(proxy('/public/getorderbook', {target: 'https://api.bittrex.com/api/v1.1'}));
    // app.use(proxy('/public/getorderbook', {target: 'https://poloniex.com/public'}));
    // app.use(proxy())
};

export default proxy;