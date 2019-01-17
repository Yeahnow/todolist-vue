// 定义computed数据
const getters = {
  computedNum (state) {
    return state.data.reduce(function (pre, current) {
      return pre + (current.isCheck ? 1 : 0)
    }, 0)
  }
}

export {getters}
