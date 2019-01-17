<template>
	<div class="todolistFooter">
		<input type="checkbox" v-model='isChecked'>
		<span>已完成{{computedNum}}/全部{{items.length}}</span>
		<!-- 下方元素是loading提示 -->
		<span class="tip" v-show="tipShow" :class="{rotate: tipShow}"></span>
		<button @click='handleRemove' v-show='computedNum'>清除已选定的选项</button>
	</div>
</template>
<script>
// 引入发布订阅包
import Pubsub from 'pubsub-js'
export default {
	data() {
		return {
			tipShow: false
		}
	},
	computed: {
		items () {
			return this.$store.state.data
		},
		computedNum () {
			return this.$store.getters.computedNum
		},
		isChecked: {
			get () {
				return this.computedNum === this.items.length && this.items.length
			},
			set (value) {
				this.$store.dispatch('selectAll', value)
			}
		}
	},
	methods: {
		handleRemove () {
			// 显示loading提示
			this.tipShow = true
			// 触发删除选定item程序并更新state中数据
			this.$store.dispatch('deleteSelected')
		}
	},
	mounted() {
		// 订阅showTip事件，当数据更新完毕之后，隐藏loading提示
		Pubsub.subscribe('showTip', (msg, data) => {
			this.tipShow = data
		})
	}
}
</script>
<style>
.todolistFooter{
	position: relative;
	height: 60px;
	line-height: 60px;
	padding: 0 10px;
	background-color: #363434;
	border-radius: 0 0 6px 6px;
}
.todolistFooter input{
	width: 28px;
	height: 16px;
	vertical-align: middle;
}
.todolistFooter button{
	float: right;
	color: #fff;
	line-height: 40px;
	margin-top: 10px;
	background-color: #c90000;
	border: 0;
	border-radius: 3px;
	outline: none;
	cursor: pointer;
}

.tip{
	position: absolute;
	top: -380px;
	left: calc(50% - 18px);
	width: 36px;
	height: 36px;
	border-radius: 18px;
	overflow: hidden;
	background: url(../assets/loading.png) no-repeat -2px 0px;
	background-size: cover;
}

@keyframes rotate{
	from{
		transform: rotate(0deg)
	}
	to{
		transform: rotate(360deg)
	}
}
.rotate{
	animation: rotate .6s linear infinite;
}
</style>
