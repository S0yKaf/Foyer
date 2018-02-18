var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath: '/static/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'import-glob'],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
            }
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use:[{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'sass': path.resolve(__dirname, './sass')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
