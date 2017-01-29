module.exports = {
    entry: "./js/app.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { 
                test: /\.js$|\.jsx$/, 
                exclude: /node_modules/,
                loader: 'babel-loader',
                query : {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: [ __dirname + '/babelRelayPlugin' ]
                }
            }
        ]
    }

}