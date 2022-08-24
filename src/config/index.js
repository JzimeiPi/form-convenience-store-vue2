/**
 * 获取config目录下所有的文件
 */
const compList = require.context("./compList", false, /\.js$/)
const config = compList.keys().reduce((acc, file) => {
  acc[file.slice(2, -3)] = compList(file).default
  return acc
}, {})

export default config