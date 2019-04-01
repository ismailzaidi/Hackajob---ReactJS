var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR =  path.resolve(__dirname, 'public');
module.exports = {
	entry: APP_DIR+'/index.js',
	output: {
		filename: 'assets.js',
		path: BUILD_DIR
	},
	watch: true,

	watchOptions: {
		poll: 1000,
	},
	devServer: {
    	compress: true,
    	port: 3000
  	},
	module:{
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				
				use: {
					loader: "babel-loader",
					options:{
						presets: ["@babel/preset-env","@babel/preset-react"],

						plugins: ["transform-class-properties"]

					}
				}
			},
			 {
		        test: /\.(scss|css)$/,
		        use: ExtractTextPlugin.extract({ 
                        fallback:'style-loader',
                        use:['css-loader','sass-loader'],
                })
		     },
		]
	},
	plugins: [
		new ExtractTextPlugin({filename:'main.css'}),

	]
	
};