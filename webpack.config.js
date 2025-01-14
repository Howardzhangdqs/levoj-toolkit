import path from "path";
import webpack from "webpack";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";

const __dirname = path.resolve();

const devConfig = {
    entry: "./src/entry.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
    ]
};

export default (env, argv) => {
    if (argv.mode === "production") {
        return {
            entry: "./src/entry.ts",
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: "ts-loader",
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.(?:js|mjs|cjs)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    ["@babel/preset-env", {
                                        useBuiltIns: "usage",
                                        corejs: 3,
                                        targets: "> 0.25%, not dead"
                                    }]
                                ]
                            }
                        }
                    }
                ],
            },
            resolve: {
                extensions: [".ts", ".js"],
            },
            output: {
                filename: "bundle.js",
                path: path.resolve(__dirname, "dist"),
            },
            plugins: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ["console.log"],
                        },
                    },
                }),
            ],
            optimization: {
                moduleIds: "named",
                minimize: false,
            },
        };
    } else return devConfig;
};