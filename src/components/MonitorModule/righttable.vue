<template>
	<div class="tables">
		<div class="table-title">遥感监测</div>
		<div class="table-two">
			<table class="table table-bordered table-yg">
				<thead>
					<tr>
						<td>序号</td>
						<td>车牌号</td>
						<td>是否合格</td>
						<td>检测日期</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item,index) in items" :key="index">
						<td v-if="page == 1 ">{{index+1}}</td>
						<td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
						<td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
						<td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
						<td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
						<td :title='item.licenseNumber'>{{item.licenseNumber}}</td>
						<td :title='item.testingResult'>{{item.testingResult}}</td>
						<td :title='item.transitTime'>{{item.transitTime | slice}}</td>
					</tr>
				</tbody>
			</table>
			<!--分页-->
			<panigation :page='page' :rows='rows' :total='total' :options="options" @changePage="toPage" @changeRows='toRows' @operatePage='optPage'></panigation>

		</div>

	</div>
</template>
<script>
	import panigation from "./../component/panigation";


	export default {
		data() {
			return {
				items: [],
				searchValue: "",
				searchValue1: "",
				searchValue2: "",
				searchValue3: "",
				searchValue4: "",
				searchValue5: "",
				pkid: 0,
				// 条件查询
				zcd: [{
						value: "北京"
					},
					{
						value: "上海"
					},
					{
						value: "广州"
					},
					{
						value: "郑州"
					},
					{
						value: "杭州"
					}
				],

				page: 1,
				rows: 10,
				total: 0,
				options: [{
						text: "10",
						value: "10"
					},
					{
						text: "20",
						value: "20"
					},
					{
						text: "50",
						value: "50"
					},
					{
						text: "100",
						value: "100"
					}
				]
			};
		},

		//分页
		components: {
			panigation
		},
		watch: {
			page: function (newval, oldval) {
				this.getpage();
			},
			rows: function (newval, oldval) {
				this.page = 1; //改变行数，重置页数
				this.getpage();
			}
		},
		mounted() {
			this.getpage();
			this.tableResize();
			this.resizeCall();
			// this.tableResize(); // 初始化计算table等高度
			// this.resizeCall(); // 监听resize
			//时间插件
			let _this = this;
			setTimeout(function () {
				layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface1",
						type: "date",
						done: function (value) {
							_this.searchValue3 = value;
						}
					});
				});
			}, 0);
		},
		methods: {
			// 分页
			toRows(rows) {
				// 子组件panigation 触发改变rows
				this.rows = rows;
			},
			toPage(page) {
				this.page = 1; //改变行数，重置页数
				// 子组件panigation 触发改变page
				this.page = page;
			},
			optPage(opt) {
				//翻页
				if (opt === 1) {
					// opt = 1 下一页
					this.page < this.total ? this.page++ : (this.page = this.total);
				} else if (opt === 0) {
					// opt = 0 上一页
					this.page > 1 ? this.page-- : (this.page = 1);
				}
			},
			getpage() {
				// 按页获取数据
				let _this = this;
				let temData = {
					carNumber: this.carNumber,
					registerPlace: this.registerPlace,
					ownerInfo: this.ownerInfo,
					registerTime: this.registerTime,
					carMaxweight: this.carMaxweight,
					checkPerson: this.checkPerson,
					page: this.page,
					rows: this.rows
				};
				_this
					.$http({
						method: "get",
						url: `${_this.baseurl}remotesensingInfo/listPageJson`,
						params: temData
					})
					.then(function (res) {
						if (res.status == 200 || res.data.data.status == 1)
							_this.items = res.data.data.rows;
						_this.total = res.data.data.total;
					})
					.catch(function (err) {
						console.log(err);
					});
			},
			// 自适应高度
			tableResize() {
				let content = document.querySelector(".content"); // content
				let tabless = document.querySelector(".tables-v"); // fs-right
				let inputBox = document.querySelector(".table-two"); // input-box

				tabless.style.height = content.offsetHeight + "px";
				inputBox.style.height =
					tabless.offsetHeight - 154 + "px";
			},
			// 监听resize
			resizeCall() {
				var optimizedResize = (function () {
					var callbacks = [],
						running = false;
					// fired on resize event
					function resize() {
						if (!running) {
							running = true;
							if (window.requestAnimationFrame) {
								window.requestAnimationFrame(runCallbacks);
							} else {
								setTimeout(runCallbacks, 66);
							}
						}
					}
					// run the actual callbacks
					function runCallbacks() {
						callbacks.forEach(function (callback) {
							callback();
						});
						running = false;
					}
					// adds callback to loop
					function addCallback(callback) {
						if (callback) {
							callbacks.push(callback);
						}
					}
					return {
						// public method to add additional callback
						add: function (callback) {
							if (!callbacks.length) {
								window.addEventListener("resize", resize);
							}
							addCallback(callback);
						}
					};
				})();

				// start process
				optimizedResize.add(this.tableResize);
			},
			linkTo() {
				let _this = this;
				layer.open({
					type: 2,
					title: "新增",
					area: ["75%", "70%"],
					anim: [parseInt(6 * Math.random())],
					resize: false,
					anim: 2,
					maxmin: true,
					success: function (layero) {
						layero.find(".layui-layer-min").remove();
					},
					content: "#/fasttb/",
					maxWidth: "800",
					end: function () {
						_this.getpage();
					}
				});
			},

		}

	};
</script>
<style scoped>
	.table-bordered>thead>tr>th,
	.table-bordered>tbody>tr>th,
	.table-bordered>tfoot>tr>th,
	.table-bordered>thead>tr>td,
	.table-bordered>tbody>tr>td,
	.table-bordered>tfoot>tr>td {
		box-sizing: border-box;
	}

	.tables-v {
		width: 100%;
		height: 100%;
		padding: 5px;
	}

	.tables {
		float: left;
		width: 50%;
		padding: 10px;
		border: 1px solid #dbdbdb;
		margin-top: 5px;
		box-sizing: border-box;
	}

	.tables:nth-child(1) {
		border-right: none;
	}

	.tables table {
		width: 100%;
	}

	table thead {
		background-color: #dfe9ec;
	}

	.table-title {
		height: 32px;
		width: -ms-calc(100% - 8px);
		width: -webkit-calc(100% - 8px);
		width: calc(100% - 8px);
		line-height: 32px;
		text-align: left;
		border: 1px solid #dbdbdb;
		padding-left: 5px;
		font-size: 16px;
		font-weight: 700;
		background-color: #97d0ea;
	}

	.tables .table-one,
	.tables .table-two {
		height: 425px;
		min-height: 200px;
	}

	.linkto {
		padding: 5px;
		width: 200px;
		border: 1px solid #dddddd;
	}

	.linkto:active,
	.linkto:hover {
		background-color: #029ad1;
		color: #fff;
	}
</style>
