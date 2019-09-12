<template>
	<div id="Detail">
		<!-- 主体内容 -->
		<div class="table-content">
			<!--输入框-->
			<div class="input-box">
				<div class="input-group">
					<span class="input-group-addon">记录编号：</span>
					<input type="text" class="form-control" v-model='searchValue'>
				</div>
				<div class="input-group">
					<span class="input-group-addon">通过时间：</span>
					<i class="el-input__icon el-icon-date"></i>
					<input type="text" placeholder="--请选择结束时间--" class="form-control" v-model='searchValue1' readonly="readonly" id="surface2">

				</div>
				<div class="input-group">
					<span class="input-group-addon">车道号：</span>
					<input type="text" class="form-control" v-model='searchValue2'>
				</div>
				<div class="input-group">
					<span class="input-group-addon">车牌号码：</span>
					<input type="text" class="form-control" v-model='searchValue3'>
				</div>
				<div class="input-group">
					<span class="input-group-addon">车牌颜色：</span>
					<input type="text" class="form-control" v-model='searchValue4'>
				</div>
				<div class="input-group">
					<span class="input-group-addon">检测结果：</span>
					<el-select filterable placeholder="--请选择--" v-model="searchValue5">
						<el-option v-for="item in detections" :key="item.index" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="input-group">
				</div>
				<!--按钮-->
				<div class="input-group">


					<span style=" display:inline-block;margin-right:5px;position:relative">
						<el-upload ref="upload" action="http://117.121.97.120:9001/bjsy-jdc/jdc/remotesensingInfo/import" :show-file-list="false" :on-success="success"
						    name='files' :auto-upload="true">
							<el-button slot="trigger" icon="iconfont icon-daoru" size="small" type="primary">
								 <i class="iconfont icon-group10"></i>导入
							</el-button>
						</el-upload>
					</span>
					<span class="btn_m btn_query" @click="select()">
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
							<td>记录编号</td>
							<td>车道号</td>
							<td>通过时间</td>
							<td>车牌号码</td>
							<td>车牌颜色</td>
							<td>检测结果</td>
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
							<td :title='item.recordNumber'>{{item.recordNumber}}</td>
							<td :title='item.trackNo'>{{item.trackNo}}</td>
							<td :title='item.transitTime'>{{item.transitTime |slice}}</td>
							<td :title='item.licenseNumber'>{{item.licenseNumber}}</td>
							<td :title='item.licenseColor'>{{item.licenseColor}}</td>
							<td :title='item.testingResult'>{{item.testingResult}}</td>
							<td>
								<span @click="searchById(item.pkid,0)">
									[
									<i class="iconfont icon-chaxun"> ]</i>
								</span>
								<span @click="searchById(item.pkid,1)">
									[
									<i class="iconfont icon-xiugai"> ]</i>
								</span>
								<span @click='delet(item)'> [
									<i class="iconfont icon-shanchu"> ]</i>
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
				detections: [],
				pkid: 0,
				// 条件查询
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
				],
				fullscreenLoading: false
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
			this.tableResize(); // 初始化计算table等高度
			this.resizeCall(); // 监听resize
			//时间插件
			let _this = this;
			setTimeout(function () {
				layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface2",
						type: "date",
						done: function (value) {
							_this.searchValue1 = value;
						}
					});
				});
			}, 0);
		},
		methods: {
			//文件上传成功后的提示信息
			success() {
				var _this = this;
				this.$message.success("文件上传成功！");
				setTimeout(function () {
					_this.getpage();
				}, 0)

			},
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
				this.fullscreenLoading = true;
				// 按页获取数据
				let _this = this;
				let temData = {
					recordNumber: this.searchValue,
					transitTime: this.searchValue1,
					trackNo: this.searchValue2,
					licenseNumber: this.searchValue3,
					licenseColor: this.searchValue4,
					testingResult: this.searchValue5,
					page: this.page,
					rows: this.rows
				};
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}remotesensingInfo/listPageJson`,
							params: temData
						})
						.then(function (res) {
							if (res.status == 200 || res.data.data.status == 1) {
								_this.items = res.data.data.rows;
								_this.items.map(function (item, index) {
									if (!_this.detections.some(val => val.value == item.testingResult)) {
										_this.detections.push({
											index: index,
											value: item.testingResult
										});
									}
								});
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
			// 查询数据
			select() {
				this.fullscreenLoading = true;
				let _this = this;
				this.page = 1;
				let temData = {
					recordNumber: this.searchValue,
					transitTime: this.searchValue1,
					trackNo: this.searchValue2,
					licenseNumber: this.searchValue3,
					licenseColor: this.searchValue4,
					testingResult: this.searchValue5,
					page: this.page,
					rows: this.rows
				};
				if (this.searchValue == "" & this.searchValue1 == "" & this.searchValue2 == "" & this.searchValue3 == "" & this.searchValue4 == "" & this.searchValue5 == "") {
					layer.msg('请输入查询条件！！！', {
						icon: 2
					});
					_this.fullscreenLoading = false;
				} else {
					setTimeout(() => {
						_this.$http({
								method: 'get',
								url: `${_this.baseurl}remotesensingInfo/listPageJson`,
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
								url: _this.baseurl + "remotesensingInfo/delete/" + id
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
			//增
			update(item) {
				var _this = this;
				layer.open({
					type: 2,
					shift: -1,
					title: "新增",
					area: ["75%", "70%"],
					anim: [parseInt(6 * Math.random())],
					resize: false,
					anim: 2,
					maxmin: true,
					success: function (layero) {
						layero.find(".layui-layer-min").remove();
					},
					content: "#/remotetc/" + "add",
					maxWidth: "800",
					end: function () {
						_this.getpage();
					}
				});
				//  Jdc.$emit('fun',this.fun);
			},
			// 查看详情num=0 编辑num=1
			searchById(id, num) {
				let _this = this;
				sessionStorage.setItem("operateNum", JSON.stringify(num));
				let title = "";
				if (!num) {
					title = "详情";
				} else {
					title = "修改";
				}
				layer.open({
					type: 2,
					title: title,
					area: ["70%", "75%"],
					anim: [parseInt(6 * Math.random())],
					resize: false,
					anim: 2,
					maxmin: true,
					success: function (layero) {
						layero.find(".layui-layer-min").remove();
					},
					content: "#/remotetc/" + id,
					end: function () {
						_this.getpage();
					}
				});
			},
			//清空
			clean() {
				(this.searchValue = ""),
				(this.searchValue1 = ""),
				(this.searchValue2 = ""),
				(this.searchValue3 = ""),
				(this.searchValue4 = ""),
				(this.searchValue5 = "");
				this.getpage();
			},
			// 自适应高度
			tableResize() {
				let content = document.querySelector(".content"); // content
				let tabless = document.querySelector(".table-content"); // fs-right
				let inputBox = document.querySelector(".input-box"); // input-box
				let tableBox = document.querySelector(".el-main"); // panigation

				tabless.style.height = content.offsetHeight + "px";
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
								window.addEventListener("resize", resize);
							}
							addCallback(callback);
						}
					};
				})();

				// start process
				optimizedResize.add(this.tableResize);
			},
			impor(file) {
				console.log(file);
				let fileType = file.name.split(".")[1];
				let types = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"];
				let rightType = types.some(item => item === fileType);
				if (!rightType) {
					this.$message.warning("文件类型不正确！");
					return false;
				}
				this.file2excel(file.raw).then(tableJson => {
					console.log(tableJson);
				});
				this.sendexel();
			}
		}
	};
</script>
<style scoped>
	/* 输入框 */

	.input-group:nth-last-child(2) {
		width: 50%;
	}

	.input-group:nth-child(5),
	.input-group:nth-child(6) {
		border-top: none;
	}

	.input-group-addon {
		width: 73px;
	}
	/*element日期图标*/

	.input-group .el-icon-date {
		left: 120px;
	}
	/*媒体查询*/

	@media screen and (min-width: 1921px) {
		/*输入框*/
		.input-group:nth-child(5) {
			border-top: 1px solid #ededed;
			border-left: none;
		}
		.input-group:nth-child(6) {
			border-left: 1px solid #ededed;
		}
		.input-group:nth-last-child(2) {
			width: 80%;
		}
	}

	@media screen and (min-width: 1025px) and (max-width: 1300px) {
		/*输入框*/
		.input-group:nth-child(4) {
			border-left: 1px solid #ededed;
			border-top: none;
		}
		.input-group:nth-child(5) {
			border-left: none;
		}
		.input-group:nth-last-child(2) {
			display: none;
		}
	}

	@media screen and (max-width: 1024px) {
		/*输入框*/
		.input-group:nth-child(3) {
			border-left: 1px solid #ededed;
		}
		.input-group:nth-child(3),
		.input-group:nth-child(4) {
			border-top: none;
		}
		.input-group:nth-last-child(2) {
			display: none;
		}
	}

	.btn_query {
		position: relative;
		z-index: 999;
	}

	.input-group .el-icon-date {
		left: 79px;
	}

	.el-button {
		height: 26px;
		color: #029ad1;
		background-color: transparent;
	}

	.el-button:hover {
		background-color: #029ad1;
		color: #fff;
	}

	.el-button--small {
		padding: 0px 15px;
	}

	.el-upload-list {
		list-style: none;
		display: inline-block !important;
		position: absolute !important;
		right: 81px;
		top: -11px;
	}

	.el-upload-list__item:first-child {
		margin-top: 5px !important;
	}
</style>
