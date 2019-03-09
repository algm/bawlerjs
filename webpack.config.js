const path = require('path');

module.exports = [
    {
        target: 'web',
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
            ],
        },
        mode: 'production',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bawler.js',
            library: 'Bawler',
        },
    },
];
