<template>
		<div class="content">
				<div class="table-content">
					<!-- 输入框 -->
					<div class="input-box">
						<div class="input-group">
							<span class="input-group-addon">检查时间：</span>
							<i class="el-input__icon el-icon-date"></i>
							<input type="text" placeholder="--请选择检查时间--" class="form-control" v-model='zsgcValue' readonly="readonly" id="surface1">
						</div>
						<div class="input-group">
							<span class="input-group-addon">车型：</span>
							<input type="text" class="form-control" v-model='zsgcValue1'>
						</div>
						<div class="input-group">
							<span class="input-group-addon">车号：</span>
							<input type="text" class="form-control" v-model='zsgcValue2'>
						</div>
						<div class="input-group">
							<span class="input-group-addon">处罚日期：</span>
							<i class="el-input__icon el-icon-date"></i>
							<input type="text" placeholder="--请选择处罚日期--" class="form-control" v-model='zsgcValue3' readonly="readonly" id="surface2">
						</div>
						<div class="input-group">
							<span class="input-group-addon">处罚地点：</span>
							<input type="text" class="form-control" v-model='zsgcValue4'>
						</div>
						<div class="input-group">
							<span class="input-group-addon">检查人员：</span>
							<input type="text" class="form-control" v-model='zsgcValue5'>
						</div>
						<div class="input-group">
							<span class="input-group-addon">上报时间：</span>
							<i class="el-input__icon el-icon-date"></i>
							<input type="text" placeholder="--请选择上报时间--" class="form-control" v-model='zsgcValue6' readonly="readonly" id="surface3">
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
									<td>检查时间</td>
									<td>车型</td>
									<td>车号</td>
									<td>处罚日期</td>
									<td>处罚地点</td>
									<td>检查人员</td>
									<td>上报时间</td>
									<td>操作</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) of lists" :key='index'>
									<td v-if="page == 1">{{index+1}}</td>
									<td v-else-if="rows == 10">{{index+1+(10*(page-1))}}</td>
									<td v-else-if="rows == 20">{{index+1+(20*(page-1))}}</td>
									<td v-else-if="rows == 50">{{index+1+(50*(page-1))}}</td>
									<td v-else-if="rows == 100">{{index+1+(100*(page-1))}}</td>
									<td :title="item.checkTime">{{item.checkTime | slice}}</td>
									<td :title="item.carType">{{item.carType}}</td>
									<td :title="item.carNumber">{{item.carNumber}}</td>
									<td :title="item.punishTime">{{item.punishTime | slice}}</td>
									<td :title="item.punishPlace">{{item.punishPlace}}</td>
									<td :title="item.checkPerson">{{item.checkPerson}}</td>
									<td :title="item.reportTime">{{item.reportTime | slice}}</td>

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
import panigation from "./../component/panigation";
export default {
  data() {
    return {
      lists: [],
      zsgcValue: "",
      zsgcValue1: "",
      zsgcValue2: "",
      zsgcValue3: "",
      zsgcValue4: "",
      zsgcValue5: "",
      zsgcValue6: "",
      pkid: 0,
      page: 1,
      rows: 10,
      total: 0,
      options: [
        {
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
  // 分页
  components: {
    panigation
  },
  watch: {
    page: function(newval, oldval) {
      this.getpage();
    },
    rows: function(newval, oldval) {
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
    setTimeout(function() {
      layui.use("laydate", function() {
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
          elem: "#surface1",
          type: "date",
          done: function(value) {
            _this.zsgcValue = value;
          }
        });
        laydate.render({
          elem: "#surface2",
          type: "date",
          done: function(value) {
            _this.zsgcValue3 = value;
          }
        });
        laydate.render({
          elem: "#surface3",
          type: "date",
          done: function(value) {
            _this.zsgcValue6 = value;
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
			this.fullscreenLoading = true;
      let _this = this;
      let temData = {
        checkTime: this.checkTime,
        carType: this.carType,
        carNumber: this.carNumber,
        punishTime: this.punishTime,
        punishPlace: this.punishPlace,
        checkPerson: this.checkPerson,
        reportTime: this.reportTime,
        page: this.page,
        rows: this.rows
      };
			setTimeout(() => {
				_this.$http({
						method: 'get',
						url: `${_this.baseurl}carCase/listPageJson`,
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
        content: "#/cljaaTC/" + "add",
        resize: false,
        anim: 2,
        maxmin: true,
        success: function(layero) {
          layero.find(".layui-layer-min").remove();
        },
        end: function() {
          _this.getpage();
        }
      });
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
        area: ["75%", "70%"],
        anim: [parseInt(6 * Math.random())],
        resize: false,
        anim: 2,
        maxmin: true,
        success: function(layero) {
          layero.find(".layui-layer-min").remove();
        },
        content: "#/cljaaTC/" + id,
        end: function() {
          _this.getpage();
        }
      });
    },
    //查
    select() {
			this.fullscreenLoading = true;
      let _this = this;
      let temData = {
        CheckTime: this.zsgcValue,
        CarType: this.zsgcValue1,
        CarNumber: this.zsgcValue2,
        PunishTime: this.zsgcValue3,
        PunishPlace: this.zsgcValue4,
        CheckPerson: this.zsgcValue5,
        ReportTime: this.zsgcValue6,
        page: this.page,
        rows: this.rows
      };
			if (this.zsgcValue == "" & this.zsgcValue1 == "" & this.zsgcValue2 == "" & this.zsgcValue3 == "" & this.zsgcValue4 == "" & this.zsgcValue5 == "" & this.zsgcValue6 == "") {
				layer.msg('请输入查询条件！！！', {
					icon: 2
				});
				_this.fullscreenLoading = false;
			} else {
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}carCase/listPageJson`,
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
    //清空
    clean() {
      (this.zsgcValue = ""),
        (this.zsgcValue1 = ""),
        (this.zsgcValue2 = ""),
        (this.zsgcValue3 = ""),
        (this.zsgcValue4 = ""),
        (this.zsgcValue5 = ""),
        (this.zsgcValue6 = ""),
        this.getpage();
    },

    /** 显示删除数据的对话框 */
    delet(item) {
      let _this = this;
      let id = item.pkid;
      layer.confirm(
        "删除操作不可恢复，确定要删除该业务数据吗？",
        {
          icon: 2,
          title: "警告",
          btn: ["确定", "取消"]
        },
        function(index) {
          console.log("id", id);

          _this
            .$http({
              method: "post",
              url: _this.baseurl + "carCase/delete/" + id
            })
            .then(function(res) {
              _this.getpage();
            })
            .catch(function(err) {
              console.log("err", err);
            });
          layer.msg("删除成功");
        },
        function(index) {
          layer.msg("取消删除");
        }
      );
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
      var optimizedResize = (function() {
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
          callbacks.forEach(function(callback) {
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
          add: function(callback) {
            if (!callbacks.length) {
              window.addEventListener("resize", resize);
            }
            addCallback(callback);
          }
        };
      })();

      // start process
      optimizedResize.add(this.tableResize);
    }
  }
};
</script>
<style scoped lang="less">
/* 输入框 */
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
  width: 82px;
}
/*element日期图标*/

.input-group .el-icon-date {
  left: 88px;
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
    width: 60%;
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
  .input-group:nth-child(7) {
    border-left: 1px solid #ededed;
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
    border-left: 1px solid #ededed;
  }
}
</style>
