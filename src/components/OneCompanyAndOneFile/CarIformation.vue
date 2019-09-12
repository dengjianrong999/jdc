<!--
一企一档 --车辆信息管理
-->
<template>
    <!--右-->
    <div class="tabs">
		
        <!--输入框-->
        <div class="table-content">
            <div class="input-box">
                <div class="input-group">
                    <span class="input-group-addon">车牌号：</span>
                    <input type="text" class="form-control" v-model='zsgcValue'>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">号牌类别：</span>
                    <input type="text" class="form-control" v-model='zsgcValue1'>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">所有人信息：</span>
                    <input type="text" class="form-control" v-model='zsgcValue2'>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">车辆类型：</span>
					<el-select filterable placeholder="--请选择--" v-model="zsgcValue3">
						<el-option v-for="item in cllx" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">使用性质：</span>
                    <input type="text" class="form-control" v-model='zsgcValue4'>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">车辆型号：</span>
                    <input type="text" class="form-control" v-model='zsgcValue5'>
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

            <!--表格内容-->
            <el-main v-loading="fullscreenLoading" element-loading-background="rgba(255, 255, 255, 0.5)" element-loading-text="数据正在加载中">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>车牌号</td>
                            <td>号牌类别</td>
                            <td>所有人信息</td>
                            <td>车辆类型</td>
                            <td>使用性质</td>
                            <td>车辆型号</td>
                            <td>车辆识别码</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody class="tables">
                        <tr v-for="(item,index) in items" :key="index">
                            <td v-if="page == 1 ">{{index+1}}</td>
						    <td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
						    <td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
						    <td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
						    <td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
                            <td :title ='item.carNumber'>{{item.carNumber}}</td>
                            <td :title ='item.cardType'>{{item.cardType}}</td>
                            <td :title ='item.owner'>{{item.owner}}</td>
                            <td :title ='item.carType'>{{item.carType}}</td>
                            <td :title ='item.userNature'>{{item.userNature}}</td>
                            <td :title ='item.carVersion'>{{item.carVersion}}</td>
                            <td :title ='item.carCode'>{{item.carCode}}</td>
                            <td>
                                <span @click="searchById(item.pkid,0)"> [
                                    <i class="iconfont icon-chaxun"> ]</i>
                                </span>
                                <span @click="searchById(item.pkid,1)"> [
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
    // 引入子组件
    import panigation from './../component/panigation'
    export default {
        data() {
            return {
                isShow: false,
                items: [],
                zsgcValue: "",
                zsgcValue1: "",
                zsgcValue2: "",
                zsgcValue3: "",
                zsgcValue4: "",
                zsgcValue5: "",
                pkid: 0,
				cllx: [{
					value: '电动车'
				}, {
					value: '跑车'
				}, {
					value: 'SUV'
				}, {
					value: 'Aventador'
				}, {
					value: '兰博基尼'
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
                    carNumber: this.carNumber,
                    cardType: this.cardType,
                    owner: this.owner,
                    carType: this.carType,
                    userNature: this.userNature,
                    carVersion: this.carVersion,
                    carCode: this.carCode,
                    page: this.page,
                    rows: this.rows
                };
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}carInfoXSZ/listPageJson`,
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
            //新增
            update(item) {
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
                    content: "#/CarIformationTC/" + 'add',
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
                    content: "#/CarIformationTC/" + id,
                    end: function () {
                        _this.getpage();
                    }
                });
            },
            selects() {
				this.fullscreenLoading = true;
                let _this = this;
                let temData = {
                    carNumber: this.zsgcValue,
                    cardType: this.zsgcValue1,
                    owner: this.zsgcValue2,
                    carType: this.zsgcValue3,
                    userNature: this.zsgcValue4,
                    carVersion: this.zsgcValue5,
					page: this.page,
					rows: this.rows
                };
				if (this.zsgcValue == "" & this.zsgcValue1 == "" & this.zsgcValue2 == "" & this.zsgcValue3 == "" & this.zsgcValue4 == "" & this.zsgcValue5 == "") {
					layer.msg('请输入查询条件！！！', {
						icon: 2
					});
					_this.fullscreenLoading = false;
				} else {
					setTimeout(() => {
						_this.$http({
								method: 'get',
								url: `${_this.baseurl}carInfoXSZ/listPageJson`,
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
                                url: _this.baseurl + "carInfoXSZ/delete/" + id
                            })
                            .then(function (res) {
                                _this.getpage();
                                layer.msg("删除成功");
                            })
                            .catch(function (err) {
                                console.log("err", err);
                            });
                        // layer.msg("删除成功");
                    },
                    function (index) {
                        layer.msg("取消删除");
                    }
                );
            },

            clean() {
                (this.zsgcValue = ""),
                (this.zsgcValue1 = ""),
                (this.zsgcValue2 = ""),
                (this.zsgcValue3 = ""),
                (this.zsgcValue4 = ""),
                (this.zsgcValue5 = ""),
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
<style scoped>
    /* 输入框 */

    .input-group:nth-last-child(2) {
        width: 50%;
    }

    .input-group:nth-child(3) {
        border-left: none;
    }

    .input-group:nth-child(5),
    .input-group:nth-child(6) {
        border-top: none;
    }

    .input-group-addon {
        width: 91px;
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
            width: 80%;
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
        .input-group:nth-last-child(2) {
            display: none;
        }
    }

    @media screen and (max-width: 1024px) {
        /*输入框*/
        .input-group:nth-child(3) {
            border-left: 1px solid #EDEDED;
        }
        .input-group:nth-child(3),
        .input-group:nth-child(4) {
            border-top: none;
        }
        .input-group:nth-last-child(2) {
            display: none;
        }
    }
</style>
