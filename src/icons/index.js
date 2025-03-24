import Vue from 'vue';
import SvgIcon from "@/components/svgIcon.vue";

//全局注册svg-icon组件
Vue.component('svg-icon', SvgIcon);
Vue.component('SvgIcon', SvgIcon);

/**
 * @name require.context
 * @description 一个 webpack 的 api ，通过该函数可以获取一个上下文，从而实现工程自动化（遍历文件夹的文件，从中获取指定文件，自动导入模块）。
 * @description 在前端工程中，如果一个文件夹中的模块需要频繁引用时可以使用该中方式一次性引入
 * @param dirname String 需要读取模块的文件的所在目录
 * @param useSubdirectories Boolean	是否遍历子目录
 * @param RegExp RegExp	匹配的规则（正则表达式）
 * @returns resolve	Function	接受一个参数request，request为文件夹下面匹配文件的相对路径，返回这个匹配文件相对于整个工程的相对路径
 * @returns keys	Function	返回一个数组，由匹配成功的文件所组成的数组
 * @returns id	String	执行环境的 id
 */
const req = require.context('./svg', false, /\.svg$/); // 遍历获取 svg 目录下所有的 svg 文件（不包括子目录）

const requireAll = (requireContext) => {
	requireContext.keys().map(requireContext)
}

requireAll(req);//返回svg文件夹下文件相对于整个工程的相对路径