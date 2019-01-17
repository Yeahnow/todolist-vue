<template>
  <div id="app">
    <todo-title></todo-title>
    <todo-list></todo-list>
    <todo-footer></todo-footer>
  </div>
</template>

<script>
import todoTitle from './components/todo-title.vue'
import todoList from './components/todo-list.vue'
import todoFooter from './components/todo-footer.vue'
export default {
  components: {
    'todo-title': todoTitle,
    'todo-list': todoList,
    'todo-footer': todoFooter
  },
  beforeMount () {
    // 请求数据库中数据并保存至state中
    this.$store.dispatch('get')
  }
}
</script>

<style>
body{
  background-color: #4a4a48;
  color: #f8f9faa6;
}
#app{
  width: 500px;
  max-height: 511px;
  margin: 25px auto;
  background-color: #34373970;
  border-radius: 6px;
  overflow: hidden;
}
</style>
