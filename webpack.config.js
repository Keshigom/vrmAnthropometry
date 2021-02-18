const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs')
    },

    module: {
        rules: [
            {
                test: /.(vert|frag)$/,
                use: 'raw-loader'
            },
            {
                test: /.(ts|tsx)$/,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: [/node_modules/]
            },

        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        inline: true,
        hot: true,
        open: true,
        openPage: "index.html",
        contentBase: path.join(__dirname, "docs"),
        watchContentBase: true,
        port: 8080
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: ["node_modules"]
    }
};