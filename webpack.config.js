module.exports = {
    entry: './src/app.js',
    output: {
        path: 'build',
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel?stage=0'
        }]
    }
};
