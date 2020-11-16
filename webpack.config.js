const webpack = require('webpack');
const path = require('path');
const argv = require('yargs').argv;
const glob =  require('glob');
const address = require('address');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/public');

const config = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: 'js/bundle.js',
    path: distPath
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: 'html-loader?interpolate'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
    
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              isProduction ? require('cssnano') : () => {},
              require('autoprefixer')({
                browsers: ['last 2 versions']
              })
            ]
          }
        },
        'sass-loader'
      ]
    }, {
      test: /\.(gif|png|jpe?g|)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name][hash].[ext]'
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 70
          }
        }
      },
      ],
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name][hash].[ext]'
        }
      },
    },{
      test: /\.svg$/,
      use: [{ 
        loader: 'svg-sprite-loader', 
        },
      ],
      include: [
        path.resolve(__dirname, 'src/svg'),
      ]
    },{
      test: /\.svg$/,
      use: [{ 
        loader: 'file-loader', 
        options: {
          name: 'images/[name].[ext]'
        }
        },
      ],
      include: [
        path.resolve(__dirname, 'src/img'),
        path.resolve(__dirname, 'node_modules'),
      ]
    },
  ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    ...glob.sync('./src/*.html')
    .map(html => new HtmlWebpackPlugin({
      filename: path.basename(html),
      template: html
    })),
    new SpriteLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin({}),
  ],
  optimization: isProduction ? {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        parallel: false,
        uglifyOptions: {
          compress: {drop_debugger: false}
        },
      }),
    ],
  } : {},
  devServer: {
    contentBase: distPath,
    compress: isDevelopment ? false : true,
    open: true,
    hot: isDevelopment ? true : false,
    inline: true,
    host: address.ip(),
    proxy: {
      '/api/**': {
        target: `${address.ip()}:9000`,
        secure: false,
        changeOrigin: true
      }
    },
    before(app, server) { 
      server._watch(`./src/*.html`);
    } 
  }
};

module.exports = config;
