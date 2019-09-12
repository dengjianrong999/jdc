<!--快速超标车-->
<template>
        <!--内容-->
        <div class="table-content">
            <!--输入框-->
            <div class="input-box">
                <div class="input-group">
                    <span class="input-group-addon">车牌号：</span>
                    <input type="text" class="form-control" v-model='carValue'>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">车辆颜色：</span>
					<el-select filterable placeholder="--请选择--" v-model="carValue1">
						<el-option v-for="item in clys" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">车型：</span>
					<el-select filterable placeholder="--请选择--" v-model="carValue2">
						<el-option v-for="item in cx" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
                </div>
                <div class="input-group">
                </div>
                <!--按钮-->
                <div class="input-group">
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
            <!--表格内容-->
            <el-main v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="数据正在加载中">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>车牌号</td>
                            <td>车辆颜色</td>
                            <td>车型</td>
                            <td>第一次超标时间</td>
                            <td>第二次超标时间</td>
                            <td>预计超标时间段</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in lists" :key="index">
                            <td v-if="page == 1 ">{{index+1}}</td>
						    <td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
						    <td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
						    <td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
						    <td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
                            <td :title='item.carNo'>{{item.carNo}}</td>
                            <td :title='item.carColor'>{{item.carColor}}</td>
                            <td :title='item.carVersion'>{{item.carVersion}}</td>
                            <td :title='item.firstTime | slice'>{{item.firstTime | slice}}</td>
                            <td :title='item.secondTime | slice'>{{item.secondTime | slice}}</td>
                            <td :title='item.predictOverproofTime |slice'>{{item.predictOverproofTime | slice}}</td>
                            <td>
                                <span @click='checkdetails(item.pkid,0)'> [ <i class="iconfont icon-chaxun"> ]</i>
                                </span>
                                <span @click='checkdetails(item.pkid,1)'> [ <i class="iconfont icon-xiugai"> ]</i>
                                </span>
                                <span @click="delet(item)"> [ <i class="iconfont icon-shanchu"> ]</i>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </el-main>
            <!--分页-->
            <panigation :page='page' :rows='rows' :total='total' :options="options" @changePage="toPage" @changeRows='toRows' @operatePage='optPage'></panigation>

        </div>
    <!--按钮-->
</template>

<script>
	// 引入子组件
	import panigation from './../component/panigation'
    export default {
        data() {
            return {
                lists: [],
                isShow: false,
                show: true,
                carValue: "",
                carValue1: "",
                carValue2: "",
				clys: [{
					value: '金色',
				}, {
					value: '白色',
				}, {
					value: '蓝色',
				}, {
					value: '黑色',
				}, {
					value: '粉红色',
				}],
				cx: [{
					value: '跑车',
				}, {
					value: 'SUV',
				}, {
					value: '轿车',
				}, {
					value: '客车',
				}, {
					value: '电动车',
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
                    carNo: this.carNo,
                    carColor: this.carColor,
                    carVersion: this.carVersion,
                    firstTime: this.firstTime,
                    secondTime: this.secondTime,
                    predictOverproofTime: this.predictOverproofTime,
                    page: this.page,
                    rows: this.rows
                };
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}fastovercarInfo/listPageJson`,
							params: temData
						})
						.then(function (res) {
							if (res.status == 200 || res.data.data.status == 1) {
								_this.lists = res.data.data.rows;
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
            //			弹框
            update() {
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
                        layero.find('.layui-layer-min').remove()
                    },
                    content: "#/ExcavateWindow/" + 'save',
                    end: function () {
                        _this.getpage();
                    }
                });
            },
            //查看详情
            checkdetails(id, num) {
                var _this = this;
                sessionStorage.setItem('operateNum', JSON.stringify(num));
                let title = '';
                if (!num) {
                    title = "详情";
                } else {
                    title = "修改";
                }
                let layerIndex = layer.open({
                    type: 2,
                    title: title,
                    maxmin: true,
                    success: function (layero) {
                        layero.find('.layui-layer-min').remove()
                    },
                    area: ["75%", "70%"],
                    anim: [parseInt(6 * Math.random())],
                    content: '#/ExcavateWindow/' + id,
                    end: function () {
                        if (num) {
                            _this.getpage();
                        }
                    }
                })
            },
            select() {
				this.fullscreenLoading = true;
                let _this = this;
                let temData = {
                    carNo: this.carValue,
                    carColor: this.carValue1,
                    carVersion: this.carValue2,
					page: this.page,
					rows: this.rows
                };
				if (this.carValue == "" & this.carValue1 == "" & this.carValue2 == "") {
					layer.msg('请输入查询条件！！！', {
						icon: 2
					});
					_this.fullscreenLoading = false;
				} else {
					setTimeout(() => {
						_this.$http({
								method: 'get',
								url: `${_this.baseurl}fastovercarInfo/listPageJson`,
								params: temData
							})
							.then(function (res) {
								if (res.status === 200 && res.data.status === '1') {
									_this.lists = res.data.data.rows;
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
                                url: _this.baseurl + "fastovercarInfo/delete/" + id
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
            clean() {
                (this.carValue = ""),
                (this.carValue1 = ""),
                (this.carValue2 = ""),
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


<style scoped="scoped" lang="less">
    //表格内容
    /* 输入框 */

    .input-group {
        width: 33.333333333333333333333%;
        border: 1px solid #EDEDED;
    }

    .input-group:nth-child(2),
    .input-group:nth-child(3) {
        border-left: none;
    }

    .input-group:nth-last-child(2) {
        display: none;
    }

    .input-group-addon {
        padding: 6px !important;
        width: 82px;
    }
    @media screen and (max-width: 1024px) {
        /*输入框*/
        .input-group {
            width: 50%;
        }
        .input-group:nth-child(3) {
            border-top: none;
            border-left: 1px solid #EDEDED;
        }
        .input-group:nth-last-child(2) {
            display: inline-block;
        }
    }
</style>
