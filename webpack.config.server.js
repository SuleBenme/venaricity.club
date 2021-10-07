const path = require('path')
const nodeExternals = require('webpack-node-externals')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "server",
    entry: [ path.join(CURRENT_WORKING_DIR , './server/server.js') ],
    target: "node",
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist/'),
        filename: "server.generated.js",
        publicPath: '/dist/',
        libraryTarget: "commonjs2"
    },
    externals: [nodeExternals({

    })],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ]
            },    
            {
                test: /\.css$/,
                loader: "css-loader"
            },
            {   
                test: /\.(ttf|eot|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            {
            test: /\.svg$/,
            use: {
                loader: 'svg-url-loader',
                options: {}
            }
            }
        ]
    }
}

module.exports = config
