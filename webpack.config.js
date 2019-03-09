const path = require('path');
const serverConfig = {
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
    },
    //…
};

const clientConfig = {
    target: 'web', // <=== can be omitted as default is 'web'
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bawler.js',
    },
    //…
};

module.exports = [serverConfig, clientConfig];
