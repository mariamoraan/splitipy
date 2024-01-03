import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

const CopyPlugin = require("copy-webpack-plugin");

const webpackConfig = (env) => ({
    entry: path.join(__dirname, 'src', 'index.tsx'),
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        plugins: [new TsconfigPathsPlugin()],
        alias: {
            "@common": path.resolve(__dirname, "src/common"),
            "@groups": path.resolve(__dirname, "src/groups"),
            "@transactions": path.resolve(__dirname, "src/transactions"),
            "@users": path.resolve(__dirname, "src/users"),
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: /dist/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
            favicon: path.join(__dirname, "public", "assets", "favicon.ico"),
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": env.production || !env.development,
            "process.env.NAME": JSON.stringify(require("./package.json").name),
            "process.env.VERSION": JSON.stringify(require("./package.json").version)
        }),
        new CopyPlugin({
            patterns: [
              { from: "src", to: "build" }
            ],
          }),
    ],
    devServer: {
        host: 'localhost',
        port: 3001,
        open: true,
        historyApiFallback: true,
    },
});

export default webpackConfig;