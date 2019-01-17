const mutations = {
  GET(state, { val }) {
    state.data = val
  },
  SELECTALL(state, isChecked) {
    state.data.forEach(function (item) {
      item.isCheck = isChecked
    })
  }
}
export {mutations}
