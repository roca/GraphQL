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
                    plugins: ['/Users/romelcampbell/GitHub/Repos/GraphQL/pluralsight/BuildingReactApp/rgrjs/babelRelayPlugin']
                }
            }
        ]
    }

}