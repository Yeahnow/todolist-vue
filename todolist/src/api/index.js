import ajax from './ajax.js'
const BASE_URL = '/api'

// 获取数据库中的数据
export const getData = (data) => ajax(`${BASE_URL}/getData`, data)

// 更新数据
export const uploadData = (data) => ajax(`${BASE_URL}/uploadData`, data, 'POST')

// 删除数据
export const deleteData = (data) => ajax(`${BASE_URL}/deleteData`, data,'DELETE')