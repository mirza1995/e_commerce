const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
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
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
}