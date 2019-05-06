module.exports = {
	entry: "./src/app.js",
	output: {
		filename: "./output/bundle.js"
	},
	module: {
		rules: [
			{
				test: /.\js$/,
				exclude: /node_modules/,
				use: [
					{loader: "babel-loader"}
				]
			}
		]
	}
}