<template>
	<div class="todolistTitle">
		<input type="text" v-model='newval' placeholder='add one task'>
		<button class="submit" @click='addText'>ADD</button>
	</div>
</template>

<script>
export default {
	data () {
		return {
			newval: ''
		}
	},
	methods: {
		addText () {
			const {newval} = this

			// 发送请求向数据库中添加数据，并更新state中数值
			this.$store.dispatch('add', {newval})

			// 清空输入栏
			this.newval = ''
		}
	}
}
</script>

<style>
.todolistTitle{
	text-align: center;
	padding-top: 10px;
}
.todolistTitle input[type='text']{
	width: 95%;
	height: 50px;
	line-height: 50px;
	font-size: 22px;
	color: #fff;
	padding: 0 5px;
	border: 0;
	border-radius: 3px;
	background-color: #525252;
	outline: none;
}
button.submit{
	position: absolute;
	width: 60px;
	line-height: 30px;
	color: #bfc2c4;
	margin-left: -65px;
	margin-top: 10px;
	border: 0;
	border-radius: 3px;
	background-color: #65696d;
	cursor: pointer;
	outline: none;
}
</style>
