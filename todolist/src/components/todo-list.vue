<template>
	<div class="todolist" ref="container">
		<ul ref="content" @mousewheel = wheelHandle>
			<!-- item项目组件 -->
			<!-- 下方的showDel自定义事件来自子组件item -->
			<todo-item  v-for='(item, index) in items' :key='index' :item='item' :delArr = delArr :index='index' @showDel='isShowDel'></todo-item>

			<!-- 没有item项目时显示以下信息 -->
			<div v-if="!items.length" style="text-align: center;line-height:50px;">暂时没有任务,请新添任务</div>
		</ul>
		<!-- 自定义的滚动条 -->
		<div class='barCon' ref="barCon" v-show="contentHeight > containerHeight">
			<div class="bar" ref="bar" :style="{height: barHeight,top: barTop}"></div>
		</div>
	</div>
</template>

<script>
// 引入发布订阅包
import Pubsub from 'pubsub-js'
import todoItem from './todo-item.vue'
export default {
	data () {
		return {
			/* 以下是滚动条需要的数据 */
			containerHeight: 0, // 清单内容包含块的高度
			contentHeight: 0, // 清单内容的高度
			barConHeight: 0, // 自定义滚动条的包含块的高度
			barHeight: '0px', // 自定义滚动条的高度
			barTop: '0px', // 滚动条离顶部距离
			rate: 0, // 清单内容移动距离和滚动条移动距离的比例
			
			/* 以下是判断点击item项目是否显示删除按钮所需要的数据 */
			delArr:[], // 传给item子组件的数组，包含item组件上删除按钮是否显示的信息
			n: -1, // 前一次点击的item任务的索引
			i: 0, // 点击同一个item的次数
			tipShow: false // 用于关闭footer组件的loading提示
		}
	},
	computed: {
		// 从state中取出保存的数据
		items () {
			return this.$store.state.data
		}
	},
	components: {
		'todo-item': todoItem
	},
	// 必须在updatad阶段获取各高度值，不能再mounted，因为开始渲染完成从state中取到的items是空数组，
	// 知道ajax请求得到数据库中的数据之后，items更新，此时得到的才是所需要的高度
	updated() {
		// 当items数组有数值时获取各包含块的高度值
		this.containerHeight = this.$refs.container.offsetHeight
		this.contentHeight = this.$refs.content.offsetHeight
		this.barConHeight = this.$refs.barCon.offsetHeight

		// 根据各包含块的高度确定滚动条的高度
		var barHeightNum = parseInt(this.barConHeight*this.barConHeight/this.contentHeight)

		// 设置滚动条高度
		this.barHeight = barHeightNum + 'px'

		// 设置滚动条移动距离和ul内容移动距离的比例
		this.rate = (this.contentHeight - this.containerHeight) / (this.barConHeight - barHeightNum)
	},
	watch: {
		// 监听滚动条高度的变化以更新滚动条位置，当删除或添加数据时，滚动条高度会改变
		barHeight(newval, oldval) {
			// 当删除或添加数据时更新滚动条位置
			var offset = parseInt(newval) - parseInt(oldval)
			if(offset > 0) {
				if(parseInt(this.barTop) < offset) {
					this.barTop = '0px'
				} else{
					this.barTop = parseInt(this.barTop) - offset + 'px'
				}
			}
			// 当删除或添加数据时更新ul的位置
			this.$refs.content.style.marginTop = -(parseInt(this.barTop)) * this.rate + 'px';
		},
		// 监听items数据变化以判断是否数据更新完毕
		items() {
			// 传递tipShow给footer组件，告诉footer组件将loading提示关闭
			Pubsub.publish('showTip', this.tipShow)
		}
	},
	methods: {
		// 滚轮事件处理程序，模拟滚动条滚动
		wheelHandle (e) {
			// 定义滚轮一次滑动滚动条移动的距离
			var distance = 30;

			// 获取滚动条当前距顶部垂直距离
			var barOffsetTop = this.$refs.bar.offsetTop;

			// 获取滚动条自身高度
			var barHeight = parseInt(this.barHeight)

			// 根据滚轮移动的距离的正负移动滚动条
			var mouseDistance = e.wheelDelta || e.detail;
			if(mouseDistance > 0) {
				// 滚轮向上滚动时改变滚动条位置
				if(barOffsetTop - distance <= 0) {
					// 滑动已经到了顶部再往上便不处理
					if(barOffsetTop == 0) {
						return
					}
					this.barTop = '0px';
				} else {
					this.barTop = barOffsetTop - distance + 'px';
				}
			} else if(mouseDistance < 0) {
				// 滚轮向下滚动时改变滚动条位置
				if(barOffsetTop + distance >= (this.barConHeight - barHeight)) {
					// 滑动已经到了底部再往下便不处理
					if(barOffsetTop == (this.barConHeight - barHeight)) {
						return
					}
				this.barTop = this.barConHeight - barHeight + 'px';
				} else {
					this.barTop = barOffsetTop + distance + 'px';
				}
			}
			// 更新清单内容的位置
			this.$refs.content.style.marginTop = -(parseInt(this.barTop)) * this.rate + 'px';
		}, 
		// 判断是否展示删除按钮
		isShowDel (n) {
			var arr = []
			this.items.forEach(() => {
				arr.push(false)
			})
			// 如果点击的不是同一个item则切换显示隐藏
			if(this.n != n) {
				this.i = 1
				arr[n] = !arr[n]
			} else{
				// 如果点击的是同一个item，且重复点击数为奇，则切换显示隐藏
				if(++this.i%2 != 0) {
					arr[n] = !arr[n]
				}
			}
			this.n = n
			this.delArr = arr
		}
	}
}
</script>

<style>
.todolist{
	position: relative;
	height: 391px;
	overflow: hidden;
}

.todolist ul{
	margin: 0 10px;
	padding: 0;
	border-radius: 3px;
}
.todolist ul li{
	list-style: none;
	height: 55px;
	line-height: 55px;
}
.todolist ul li + li{
	border-top: 1px solid #65696d;
}

.barCon{
	position: absolute;
	top: 1%;
	right: 8px;
	width: 4px;
	height: 98%;
	background-color: rgb(241,241,241);
	border-radius: 2px;
}
.barCon .bar{
	position: absolute;
	top: 0;
	width: 4px;
	background-color: #7b7777;
	border-radius: 2px;
}
</style>
