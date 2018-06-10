const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.tsx'],
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'yakgs.user.js',
        publicPath: 'http://localhost:8080/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true,
                            ...process.env.NODE_ENV === 'development' ? {
                                plugins: ['react-hot-loader/babel']
                            } : {}
                        }
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true,
                            useBabel: true,
                            babelOptions: {
                                babelrc: true,
                            },
                            babelCore: '@babel/core'
                        }
                    }
                    ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['to-string-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};
