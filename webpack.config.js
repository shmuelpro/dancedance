const path = require('path');

module.exports = {
    mode: 'development',
    watch: true,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './public/js'),
        filename: 'game.js'
    }
};