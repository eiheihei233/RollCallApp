// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"cloud1-9gx6gcja551a6663"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("abc")
    try {
        return await db.collection('users').where({
          exist: true
        }).remove()
    } catch (e) {
        console.error(e)
    }
}