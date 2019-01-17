import {getData, uploadData, deleteData} from '../api/index.js'

const actions = {
  // 调用封装好的getData方法获取数据
  async get({ commit }) {
    const resData = await getData()
    const val = resData.map((item) => {
      item = {
        text: item.text,
        isCheck: false
      }
      return item
    })
    val.reverse()
    commit('GET', { val })
  },
  // 调用封装好的unloadData方法添加数据到数据库中
  // action中的所有函数的第二个参数都是形参与实参之间进行解构赋值得到相应的变量
  async add({ commit }, { newval }) {
    if (!newval) {
      alert('the value can not be null')
      return
    }
    const data = {
      text: newval
    }
    const res = await uploadData(data)
    const val = res.map((item) => {
      item = {
        text: item.text,
        isCheck: false
      }
      return item
    })
    val.reverse()
    commit('GET', { val })
  },
  // 调用封装好的deleteData方法删除数据库中数据
  async deleteData({ commit }, { text }) {
    const arr = [{ text: text }]
    const data = {
      array: arr
    }
    const res = await deleteData(data)
    const val = res.map((item) => {
      item = {
        text: item.text,
        isCheck: false
      }
      return item
    })
    val.reverse()
    commit('GET', { val })
  },
  async deleteSelected({ commit, state }) {
    // 得到isCheck为true的数据
    const dataArr = state.data.filter((item) => {
      return item.isCheck
    })
    const arr = dataArr.map((item) => {
      return {text: item.text}
    })
    const data = {
      array: arr
    }
    // 调用封装好的deleteSelected方法删除选中数据
    const res = await deleteData(data)
    const val = res.map((item) => {
      item = {
        text: item.text,
        isCheck: false
      }
      return item
      })
    val.reverse()
    commit('GET', { val })
  },
  // 选择全部
  selectAll({ commit }, value) {
    commit('SELECTALL', value)
  }
}
export {actions}
