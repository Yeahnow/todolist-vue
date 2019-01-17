<template>
	<li :class="{over: item.isCheck}">
		<div class="checkbox">
			<input type="checkbox" v-model='item.isCheck'>
		</div>
		<div class="content" @click="handle">
			{{item.text}}
			<!-- 以下是删除按钮 -->
			<transition name="slide">
				<button class="del" @click="removeItem" v-show="isShow">Delete</button>
			</transition>
		</div>
	</li>
</template>

<script>
	export default {
		props: ['item', 'delArr', 'index'],
		computed: {
			computedNum () {
				return this.$store.getters.computedNum
			},
			isShow() {
				return this.delArr[this.index]
			}
		},
		methods: {
			handle() {
				// 点击item触发显示删除按钮
				this.$emit('showDel', this.index)
			},
			removeItem () {
				const {item} = this
				const text = item.text
				// 删除当前的item
				this.$store.dispatch('deleteData', {text})
			}
		}
	}
</script>

<style>
.checkbox{
	float: left;
	width: 34px;
}
.checkbox input{
	width: 28px;
	height: 16px;
	vertical-align: middle;
}
.content{
	margin-left: 34px;
	cursor: pointer;
}
.over{
	text-decoration: line-through;
}
.content button.del{
	float: right;
	width: 50px;
	height: 30px;
	color: #fff;
	border: 0;
	margin-top: 12.5px;
	margin-right: 10px;
	border-radius: 3px;
	cursor: pointer;
	background-color: #c90000;
	outline: none;
}

.slide-enter, .slide-leave-to{
	opacity: 0;
}
.slide-enter-active, .slide-leave-active{
	transition: opacity .5s;
}
</style>
