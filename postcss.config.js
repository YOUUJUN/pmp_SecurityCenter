module.exports = {
	plugins: [
		require('postcss-pxtorem')({
			rootValue: 10, // 换算的基数
			selectorBlackList: [], // 忽略转换正则匹配项
			propList: ['*'], //要转换的匹配项
		}),
	],
}
