<!--台账生成-->
<template>
    <!--内容-->
    <div class="table-content">
        <!--输入框-->
        <div class="input-box">
            <div class="input-group">
                <span class="input-group-addon">检查日期-开始：</span>
                <i class="el-input__icon el-icon-date"></i>
                <input type="text" placeholder="--请选择开始时间--" class="form-control" v-model='reportValue' readonly="readonly" id="surface1">
            </div>
            <div class="input-group">
                <span class="input-group-addon">检查日期-结束：</span>
                <i class="el-input__icon el-icon-date"></i>
                <input type="text" placeholder="--请选择结束时间--" class="form-control" v-model='reportValue1' readonly="readonly" id="surface2">
            </div>
            <div class="input-group">
                <span class="input-group-addon">检查类型：</span>
                <el-select filterable placeholder="--请选择--" v-model="reportValue2">
                    <el-option v-for="item in jccl" :key="item.value" :label="item.value" :value="item.value">
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
                        <td>检查日期</td>
                        <td>检查类型</td>
                        <td>检查车辆</td>
                        <td>处罚车辆</td>
                        <td>劝返车辆</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr v-for="(item,index) of lists" :key='index'>
                        <td v-if="page == 1 ">{{index+1}}</td>
                        <td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
                        <td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
                        <td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
                        <td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
                        <td :title='item.time | slice'>{{item.time | slice}}</td>
                        <td :title='item.types'>{{item.types}}</td>
                        <td :title='item.checkCar'>{{item.checkCar}}</td>
                        <td :title='item.punishCar'>{{item.punishCar}}</td>
                        <td :title='item.exhortCar'>{{item.exhortCar}}</td>
                        <td>
                            <span @click="checkdetails(item.pkid,0)"> [
                                <i class="iconfont icon-chaxun"> ]</i>
                            </span>
                            <span @click="checkdetails(item.pkid,1)"> [
                                <i class="iconfont icon-xiugai"> ]</i>
                            </span>
                            <span @click="delet(item)"> [
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
    <!--按钮-->
</template>

<script>
    // 引入子组件
    import panigation from './../component/panigation'
    export default {
        data() {
            return {
                lists: [],
                reportValue: "",
                reportValue1: "",
                reportValue2: "",
                reportValue3: "",
                reportValue4: "",
                pkid: 0,
                jccl: [{
                    value: '路虎',
                }, {
                    value: 'SUV',
                }, {
                    value: '兰博基尼',
                }, {
                    value: '奥迪',
                }, {
                    value: '电动车',
                }],
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
            //时间插件 
            let _this = this;
            setTimeout(function () {
                layui.use("laydate", function () {
                    var $ = layui.$;
                    var laydate = layui.laydate;
                    var nowTime = new Date().valueOf();
                    var max = null;
                    //执行一个laydate实例
                    var start = laydate.render({
                        elem: "#surface1",
                        type: "date",
                        done: function (value, date) {
                            // endMax = end.config.max;
                            end.config.min = date;
                            end.config.min.month = date.month - 1;
                            _this.reportValue = value;
                        }
                    });
                    var end = laydate.render({
                        elem: "#surface2",
                        type: "date",
                        done: function (value, date) {
                            if ($.trim(value) == '') {
                                var curDate = new Date();
                                date = {
                                    'date': curDate.getpage(),
                                    'month': curDate.getMonth() + 1,
                                    'year': curDate.getFullYear()
                                };
                            }
                            start.config.max = date;
                            start.config.max.month = date.month - 1;
                            _this.reportValue1 = value;
                        }
                    });
                });
            }, 0);
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
                    time: this.time,
                    types: this.types,
                    checkCar: this.checkCar,
                    punishCar: this.punishCar,
                    exhortCar: this.exhortCar,
                    page: this.page,
                    rows: this.rows
                };
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}ledgerProduceInfo/listPageJson`,
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
            update() {
                let _this = this;
                layer.open({
                    type: 2,
                    title: "新增",
                    area: ["75%", "70%"],
                    anim: [parseInt(6 * Math.random())],
                    content: "#/AccountWindow/" + 'save',
                    resize: false,
                    anim: 2,
                    maxmin: true,
                    success: function (layero) {
                        layero.find('.layui-layer-min').remove()
                    },
                    end: function () {
                        _this.getpage();
                    } //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
                });
            },
            //查看详情
            checkdetails(id, num) {
                let _this = this;
                sessionStorage.setItem('operateNum', JSON.stringify(num));
                let title = '';
                if (!num) {
                    title = '详情';
                } else {
                    title = '修改';
                }
                let layerIndex = layer.open({
                    type: 2,
                    title: title,
                    maxmin: true,
                    success: function (layero) {
                        layero.find('.layui-layer-min').remove()
                    },
                    area: ['75%', '50%'],
                    anim: [parseInt(6 * Math.random())],
                    content: '#/AccountWindow/' + id,
                    end: function () {
                        if (num) {
                            _this.getpage();
                        }
                    }
                });
            },
            //			查
            select() {
				this.fullscreenLoading = true;
                let _this = this;
                let temData = {
                    timeStart: this.reportValue,
                    timeEnd: this.reportValue1,
                    types: this.reportValue2,
                    page: this.page,
                    rows: this.rows
                };
				if (this.reportValue == "" & this.reportValue1 == "" & this.reportValue2 == "") {
					layer.msg('请输入查询条件！！！', {
						icon: 2
					});
					_this.fullscreenLoading = false;
				} else {
					setTimeout(() => {
						_this.$http({
								method: 'get',
								url: `${_this.baseurl}ledgerProduceInfo/listPageJson`,
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
				
                _this.$http({
                        method: 'get',
                        url: `${_this.baseurl}ledgerProduceInfo/listPageJson`,
                        params: temData
                    })
                    .then(function (res) {
                        if (res.status === 200 && res.data.status === '1') {
                            _this.lists = res.data.data.rows;
                            _this.total = res.data.data.total;
                        }
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            },
            //			删
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
                                url: _this.baseurl + "ledgerProduceInfo/delete/" + id
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
                this.reportValue = "";
                this.reportValue1 = "";
                this.reportValue2 = "";
                this.reportValue3 = "";
                this.reportValue4 = "";
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
    .input-group {
        width: 33.333333333%;
        border: 1px solid #EDEDED;
    }

    .input-group:nth-last-child(2) {
        display: none;
    }

    .input-group:nth-child(2),
    .input-group:nth-child(3) {
        border-left: none;
        border-top: 1px solid #EDEDED !important;
    }

    .input-group-addon {
        padding: 6px !important;
        width: 103px;
    }
    /*element日期图标*/

    .input-group .el-icon-date {
        left: 109px;
    }

    @media screen and (max-width: 1024px) {
        /*输入框*/
        .input-group {
            width: 50%;
        }
        .input-group:nth-child(3) {
            border-top: none !important;
            border-left: 1px solid #EDEDED !important;
        }
        .input-group:nth-last-child(2) {
            display: block;
        }
    }
</style>
