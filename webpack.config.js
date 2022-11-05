const path = require("path");

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/i,
                use: [
                    "style-loader", // 3. Inject styles into DOM
                    "css-loader", // 2. Turns css into commonjs
                    "sass-loader" // 1. Turns sass into css
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'] //Look for these type of files and bundle them together
    }
}