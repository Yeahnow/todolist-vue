// 使用promise封装ajax请求

// delete如何传值
import axios from 'axios'
export default function ajax (url, data={}, type='GET') {
  return new Promise(function(resolve, reject) {
    let promiseObj
    if(type === 'GET') {
      // let dataStr = ''
      // // 取出data对象中的各属性名以及属性值并拼接成字符串
      // Object.keys(data).forEach(key => {
      //   dataStr += key + '=' + data[key] + '&'
      // })
      // if(dataStr !== '') {
      //   // 去除字符串最后多余的'&'
      //   dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
      //   url = url + '?' + dataStr
      // }
      promiseObj = axios.get(url, {
        params: data
      })
    } else if(type === 'POST'){
      promiseObj = axios.post(url, data)
    } else if(type === 'DELETE'){
      promiseObj = axios.delete(url, {data})
    }
    promiseObj.then((resText) => {
      resolve(resText.data)
    }).catch((err) => {
      reject(err)
    })
  })
}
