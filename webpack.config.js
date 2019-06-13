// Accessing the path library using require(path)
const path = require('path') 


module.exports = {
    // entry: './src/index.js', 
    // entry: ['@babel/polyfill', './src/index.js'],
    entry : {
        index: ['@babel/polyfill', './src/index.js'],
        edit:  ['@babel/polyfill', './src/edit.js']
    },
    output: {
        // The path should be absolute path. 
        path: path.resolve(__dirname, 'public/scripts'), 
        filename: '[name]-bundle.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_module/, 

            use: {
                loader: 'babel-loader', 
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }]
    },
    devServer: {
        // Absolute path that lets devserver know where folder that you are trying to server up lives
        contentBase: path.resolve(__dirname, 'public'),
        // Where the assets are
        publicPath: '/scripts/'
    },
    devtool:'source-map'
}