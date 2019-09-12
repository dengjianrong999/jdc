<!--
一源一档--加油站信息
-->
<template>
	<!--右-->
	<div class="tabs">
		<!--输入框-->
		<div class="table-content">
			<div class="input-box">
				<div class="input-group">
					<span class="input-group-addon">加油站名称：</span>
					<input type="text" class="form-control" v-model='carValue'>
				</div>
				<div class="input-group">
					<span class="input-group-addon">加油站地址：</span>
					<input type="text" class="form-control" v-model='carValue1'>
				</div>
				<div class="input-group">
					<span class="input-group-addon">坐标：</span>
					<span class="latitude-longitude">经度：</span>
					<input type="text" class="latitude-logitude-input" v-model='carValue2'>
					<span class="latitude-longitude"> 纬度：</span>
					<input type="text" class="latitude-logitude-input" v-model='carValue3'>
				</div>
				<div class="input-group">
					<span class="input-group-addon">所属街道：</span>
					<el-select filterable placeholder="--请选择--" v-model="carValue4">
						<el-option v-for="item in ssjd" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="input-group">
					<span class="input-group-addon">油罐个数：</span>
					<input type="text" class="form-control" v-model='carValue5'>
				</div>
				<div class="input-group">
					<span class="input-group-addon">总储油量：</span>
					<input type="text" class="form-control" v-model='carValue6'>
				</div>
				<div class="input-group">
					<span class="input-group-addon">油枪数量：</span>
					<input type="text" class="form-control" v-model='carValue7'>
				</div>
				<div class="input-group">
				</div>
				<!--按钮-->
				<div class="input-group">
					<span class="btn_m btn_query" @click="selects()">
						<i class="iconfont icon-chaxun2"></i>
						<span>查询</span>
					</span>
					<span class="btn_m btn_add" @click='update()'>
						<i class="iconfont icon-tianjia-"></i>
						<span>新增</span>
					</span>
					<span class="btn_m btn_empty" @click='clean()'>
						<i class="iconfont icon-xunhuan"></i>
						<span>清空</span>
					</span>
				</div>
			</div>
			<!-- 表格内容 -->
			<el-main v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="数据正在加载中">
				<table class="table table-bordered">
					<thead>
						<tr>
							<td>序号</td>
							<td>加油站名称</td>
							<td>加油站地址</td>
							<td>经度</td>
							<td>纬度</td>
							<td>所属街道</td>
							<td>油罐个数</td>
							<td>油罐总储油量</td>
							<td>油枪数量</td>
							<td>操作</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in items" :key="index">
							<td v-if="page == 1 ">{{index+1}}</td>
							<td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
							<td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
							<td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
							<td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
							<td :title='item.name'>{{item.name}}</td>
							<td :title='item.address'>{{item.address}}</td>
							<td :title='item.longitude'>{{item.longitude}}</td>
							<td :title='item.latitude'>{{item.latitude }}</td>
							<td :title='item.street'>{{item.street}}</td>
							<td :title='item.potNo'>{{item.potNo}}</td>
							<td :title='item.potStorage'>{{item.potStorage}}</td>
							<td :title='item.gunNumber'>{{item.gunNumber}}</td>
							<td>
								<span @click="searchById(item.pkid,0)"> [
									<i class="iconfont icon-chaxun">]</i>
								</span>
								<span @click="searchById(item.pkid,1)"> [
									<i class="iconfont icon-xiugai">]</i>
								</span>
								<span @click='delet(item)'> [
									<i class="iconfont icon-shanchu">]</i>
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</el-main>
			<!--分页-->
			<panigation :page='page' :rows='rows' :total='total' :options="options" @changePage="toPage" @changeRows='toRows' @operatePage='optPage'></panigation>

		</div>
	</div>

</template>
<script>
	// 引入子组件
	import panigation from './../component/panigation'
	export default {
		data() {
			return {
				isShow: false,
				items: [],
				carValue: "",
				carValue1: "",
				carValue2: "",
				carValue3: "",
				carValue4: "",
				carValue5: "",
				carValue6: "",
				carValue7: "",
				ssjd: [{
					value: '顺义区空港街道',
				}, {
					value: '北京路',
				}, {
					value: '环保街区',
				}, {
					value: '第一大道',
				}, {
					value: '棠溪道路',
				}],
				pkid: 0,
				page: 1,
				rows: 10,
				total: 0,
				options: [{
						text: '10',
						value: '10'
					},
					{
						text: '20',
						value: '20'
					},
					{
						text: '50',
						value: '50'
					},
					{
						text: '100',
						value: '100'
					}
				],
				fullscreenLoading: false
			};
		},
		// 分页
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
			this.tableResize(); // 初始化计算table等高度
			this.resizeCall(); // 监听resize
		},
		methods: {
			// 分页
			toRows(rows) { // 子组件panigation 触发改变rows
				this.rows = rows;
			},
			toPage(page) { // 子组件panigation 触发改变page
				this.page = page;
			},
			optPage(opt) { //翻页
				if (opt === 1) { // opt = 1 下一页  
					this.page < this.total ? this.page++ : this.page = this.total;
				} else if (opt === 0) { // opt = 0 上一页 
					this.page > 1 ? this.page-- : this.page = 1;
				}
			},
			getpage() { // 按页获取数据
			this.fullscreenLoading = true;
				let _this = this;
				let temData = {
					name: this.name,
					address: this.address,
					latitude: this.latitude,
					longitude: this.longitude,
					street: this.street,
					potNo: this.potNo,
					potStorage: this.potStorage,
					gunNumber: this.gunNumber,
					page: this.page,
					rows: this.rows
				};
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}oilstationInfo/listPageJson`,
							params: temData
						})
						.then(function (res) {
							if (res.status == 200 || res.data.data.status == 1) {
								_this.items = res.data.data.rows;
								_this.total = res.data.data.total;
								_this.fullscreenLoading = false;
							}
						})
						.catch(function (err) {
							console.log(err);
							setTimeout(() => {
								layer.msg('数据加载异常！！！', {
									icon: 2
								});
								_this.fullscreenLoading = false;
							}, 5000);
						});
				}, 500);
			},
			update() {
				let _this = this;
				layer.open({
					type: 2,
					title: "新增",
					area: ["75%", "70%"],
					anim: [parseInt(6 * Math.random())],
					content: "#/GasStationTC/" + 'add',
					resize: false,
					anim: 2,
					maxmin: true,
					success: function (layero) {
						layero.find(".layui-layer-min").remove();
					},
					end: function () {
						_this.getpage();
					}
				});
			},
			// 查看详情num=0 编辑num=1
			searchById(id, num) {
				let _this = this;
				sessionStorage.setItem('operateNum', JSON.stringify(num));
				let title = '';
				if (!num) {
					title = '详情';
				} else {
					title = '修改';
				}
				layer.open({
					type: 2,
					title: title,
					area: ["75%", "70%"],
					anim: [parseInt(6 * Math.random())],
					resize: false,
					anim: 2,
					maxmin: true,
					success: function (layero) {
						layero.find('.layui-layer-min').remove()
					},
					content: "#/GasStationTC/" + id,
					end: function () {
						_this.getpage();
					}
				});
			},

			//删
			delet(item) {
				let _this = this;
				let id = item.pkid;
				layer.confirm(
					"删除操作不可恢复，确定要删除该业务数据吗？", {
						icon: 2,
						title: "警告",
						btn: ["确定", "取消"]
					},
					function (index) {
						console.log("id", id);

						_this
							.$http({
								method: "post",
								url: _this.baseurl + "oilstationInfo/delete/" + id
							})
							.then(function (res) {
								_this.getpage();
							})
							.catch(function (err) {
								console.log("err", err);
							});
						layer.msg("删除成功");
					},
					function (index) {
						layer.msg("取消删除");
					}
				);
			},
			selects() {
				this.fullscreenLoading = true;
				let _this = this;
				let temData = {
					name: this.carValue,
					address: this.carValue1,
					longitude: this.carValue2,
					latitude: this.carValue3,
					street: this.carValue4,
					potNo: this.carValue5,
					potStorage: this.carValue6,
					gunNumber: this.carValue7,
					page: this.page,
					rows: this.rows
				};
				if (this.carValue == "" & this.carValue1 == "" & this.carValue2 == "" & this.carValue3 == "" & this.carValue4 == "" & this.carValue5 == "" & this.carValue6 == "" & this.carValue7 == "") {
					layer.msg('请输入查询条件！！！', {
						icon: 2
					});
					_this.fullscreenLoading = false;
				} else {
					setTimeout(() => {
						_this.$http({
								method: 'get',
								url: `${_this.baseurl}oilstationInfo/listPageJson`,
								params: temData
							})
							.then(function (res) {
								if (res.status === 200 && res.data.status === '1') {
									_this.items = res.data.data.rows;
									_this.total = res.data.data.total;
									_this.fullscreenLoading = false;
								}
							})
							.catch(function (err) {
								console.log(err)
								setTimeout(() => {
									layer.msg('查询失败！！！', {
										icon: 2
									});
									_this.fullscreenLoading = false;
								}, 5000);
							})
					}, 500);
				}
			},
			clean() {
				(this.carValue = ""),
				(this.carValue1 = ""),
				(this.carValue2 = ""),
				(this.carValue3 = ""),
				(this.carValue4 = ""),
				(this.carValue5 = ""),
				(this.carValue6 = ""),
				(this.carValue7 = ""),
				this.getpage();
			},
			// 自适应高度
			tableResize() {
				let content = document.querySelector(".content"); // content
				let tabless = document.querySelector(".table-content"); // fs-right
				let inputBox = document.querySelector(".input-box"); // input-box
				let tableBox = document.querySelector(".el-main"); // panigation

				tabless.style.height = content.offsetHeight + 'px';
				tableBox.style.height =
					tabless.offsetHeight - inputBox.offsetHeight - 70 + "px";
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
								window.addEventListener('resize', resize);
							}
							addCallback(callback);
						}
					}
				}());

				// start process
				optimizedResize.add(this.tableResize);
			}
		}
	};
</script>
<style scoped lang="less">
	/* 输入框 */

	.input-group {}

	.input-group:nth-child(3),
	.input-group:nth-child(7) {
		border-left: none;
	}

	.input-group:nth-child(5),
	.input-group:nth-child(6),
	.input-group:nth-child(7) {
		border-top: none;
	}

	.input-group-addon {
		width: 91px;
	}

	.latitude-longitude {
		padding: 6px;
		padding-right: 0;
		border: none;
		font: bold 12px "microsoft yahei" !important;
		color: #666666 !important;
		background: none !important;
		vertical-align: middle;
	}

	.latitude-logitude-input {
		width: calc(50% - 45px);
		margin-top: 6px;
		height: 26px;
		line-height: 26px;
		border-radius: 3px;
	}
	/*媒体查询*/

	@media screen and (min-width: 1921px) {
		/*输入框*/
		.input-group:nth-child(5) {
			border-top: 1px solid #EDEDED;
			border-left: none;
		}
		.input-group:nth-child(6) {
			border-left: 1px solid #EDEDED;
		}
		.input-group:nth-last-child(2) {
			width: 60%;
		}
	}

	@media screen and (min-width: 1025px) and (max-width: 1300px) {
		/*输入框*/
		.input-group:nth-child(4) {
			border-left: 1px solid #EDEDED;
			border-top: none;
		}
		.input-group:nth-child(5) {
			border-left: none;
		}
		.input-group:nth-child(7) {
			border-left: 1px solid #EDEDED;
		}
		.input-group:nth-last-child(2) {
			width: 66.666666%;
		}
	}

	@media screen and (max-width: 1024px) {
		/*输入框*/
		.input-group:nth-child(3),
		.input-group:nth-child(4) {
			border-top: none;
		}
		.input-group:nth-child(3),
		.input-group:nth-child(7) {
			border-left: 1px solid #EDEDED;
		}
	}
</style>
