// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var xlsx = require('node-xlsx');
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  let {
    fileID
  } = event
  //1,通过fileID下载云存储里的excel文件
  const res = await cloud.downloadFile({
    fileID: fileID,
  })
  const buffer = res.fileContent

  const tasks = [] //用来存储所有的添加数据操作
  //2,解析excel文件里的数据
  var sheets = xlsx.parse(buffer); //获取到所有sheets
  sheets.forEach(function(sheet) {
    console.log(sheet['name']);
    for (var rowId in sheet['data']) {
      console.log(rowId);
      var row = sheet['data'][rowId]; //第几行数据
      if (rowId > 2 && row) { //第一行是表格标题，所有我们要从第4行开始读
        //3，把解析到的数据存到excelList数据表里
        const promise = db.collection('users')
          .add({
            data: {
              studentID: row[0], //学号
              name: row[1], //姓名
              check1: row[3],
              check2: row[4],
              check3: row[5],
              check4: row[6],
              check5: row[7],
              check6: row[8],
              check7: row[9],
              check8: row[10],
              check9: row[11],
              check10: row[12],
              check11: row[13],
              check12: row[14],
              check13: row[15],
              check14: row[16],
              check15: row[17],
              check16: row[18],

            }
          })
        tasks.push(promise)
      }
    }
  });

  // 等待所有数据添加完成
  let result = await Promise.all(tasks).then(res => {
    return res
  }).catch(function(err) {
    return err
  })
  return result
}