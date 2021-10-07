const path = require('path')
const CURRENT_WORKING_DIR = process.cwd()

const config = {
    mode: "production",
    entry: [
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
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
