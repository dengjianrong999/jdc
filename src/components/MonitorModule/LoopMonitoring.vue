<template>
    <div id="Detail">
        <!-- 主体内容 -->
        <div class="table-content">
            <!--输入框-->
            <div class="input-box">
                <div class="input-group">
                    <span class="input-group-addon">检测编号：</span>
                    <input type="text" class="form-control" v-model='searchValue'>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">检测方式：</span>
					<el-select filterable placeholder="--请选择--" v-model="searchValue1">
						<el-option v-for="(item,index) in detectionMode" :key='index' :label="item.value" :value="item.value">
						</el-option>
					</el-select>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">检测机构：</span>
                    <!-- <input type="text" class="form-control" v-model='searchValue2'> -->
                    <el-select filterable placeholder="--请选择--" v-model="searchValue2">
						<el-option v-for="(item,index) in detectionInstitutions" :key='index' :label="item.value" :value="item.value">
						</el-option>
					</el-select>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">检测日期：</span>
                    <i class="el-input__icon el-icon-date"></i>
                    <input type="text" placeholder="--请选择注册日期--" class="form-control" v-model='searchValue3' readonly="readonly" id="surface1">
                </div>
                <div class="input-group">
                    <span class="input-group-addon">检测设备：</span>
                    <el-select filterable placeholder="--请选择--" v-model="searchValue4">
						<el-option v-for="(item,index) in detectionFacility" :key='index' :label="item.value" :value="item.value">
						</el-option>
					</el-select>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">车牌号：</span>
                    <input type="text" class="form-control" v-model='searchValue5'>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">车辆类型：</span>
                    <input type="text" class="form-control" v-model='searchValue6'>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">检测结果（合格/超标）：</span>
                    <input type="text" class="form-control" v-model='searchValue7'>
                </div>
								<div class="input-group">
								</div>
                <!--按钮-->
                <div class="input-group">
                    <span  style=" display:inline-block;margin-right:5px;position:relative" >
                        <el-upload
                        ref="upload"
                        action="http://117.121.97.120:9001/bjsy-jdc/jdc/JDCLoopInspection/import"
                        :show-file-list="false"
                        name='uploadFile'
                        :on-success = "success"
                        :auto-upload="true">
                    <el-button
                        slot="trigger"
                        icon="iconfont icon-daoru"
                        size="small"
                        type="primary">
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
                            <td>检测编号</td>
                            <td>检测方式</td>
                            <td>检测机构</td>
                            <td>检测日期</td>
                            <td>检测设备</td>
                            <td>车牌号</td>
                            <td>车辆类型</td>
                            <td style='width:180px'>检测结果（合格/超标）</td>
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
                            <td :title='item.detectionNumber'>{{item.detectionNumber}}</td>
                            <td :title='item.detectionMode'>{{item.detectionMode}}</td>
                            <td :title='item.detectionInstitutions'>{{item.detectionInstitutions}}</td>
                            <td :title='item.detectionDate'>{{item.detectionDate | slice}}</td>
                            <td :title='item.detectionFacility'>{{item.detectionFacility}}</td>
                            <td :title='item.licenseNumber'>{{item.licenseNumber}}</td>
                            <td :title='item.carType'>{{item.carType}}</td>
                            <td :title='item.detectionResult' style='width:180px'>{{item.detectionResult}}</td>
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
      searchValue6: "",
      searchValue7: "",
      pkid: 0,
      // 条件查询
      detectionMode: [],
      detectionInstitutions: [],
      detectionFacility: [],

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
  //分页
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
            _this.searchValue3 = value;
          }
        });
      });
      _this.getData();
    }, 0);
  },
  methods: {
    success() {
      this.$message.success("文件上传成功！");
      this.getpage();
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
    getData() {
      let _this = this;
      _this.$http
        .get(_this.baseurl + "JDCLoopInspection/listJson")
        .then(function(res) {
          console.log("获取到的数据", res);
          if (res.status == 200 || res.data.data.status == 1) {
            let datas = res.data.data;
            datas.map((item, value) => {
              _this.detectionMode.push({
                key: value,
                value: item.detectionMode
              });
              _this.detectionInstitutions.push({
                key: value,
                value: item.detectionInstitutions
              });
              _this.detectionFacility.push({
                key: value,
                value: item.detectionFacility
              });
            });
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getpage() {
      // 按页获取数据
			this.fullscreenLoading = true;
      let _this = this;
      let temData = {
        detectionNumber: this.searchValue,
        detectionMode: this.searchValue1,
        detectionInstitutions: this.searchValue2,
        detectionDate: this.searchValue3,
        detectionFacility: this.searchValue4,
        licenseNumber: this.searchValue5,
        carType: this.searchValue6,
        detectionResult: this.searchValue7,
        page: this.page,
        rows: this.rows
      };
			setTimeout(() => {
				_this.$http({
						method: 'get',
						url: `${_this.baseurl}JDCLoopInspection/listPageJson`,
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
    //查
    select() {
			this.fullscreenLoading = true;
      let _this = this;
      this.page = 1;
      let temData = {
        detectionNumber: this.searchValue,
        detectionMode: this.searchValue1,
        detectionInstitutions: this.searchValue2,
        detectionDate: this.searchValue3,
        detectionFacility: this.searchValue4,
        licenseNumber: this.searchValue5,
        carType: this.searchValue6,
        detectionResult: this.searchValue7,
        page: this.page,
        rows: this.rows
      };
			if (this.searchValue == "" & this.searchValue1 == "" & this.searchValue2 == "" & this.searchValue3 == "" & this.searchValue4 == "" & this.searchValue5 == "" & this.searchValue6 == "" & this.searchValue7 == "") {
				layer.msg('请输入查询条件！！！', {
					icon: 2
				});
				_this.fullscreenLoading = false;
			} else {
				setTimeout(() => {
					_this.$http({
							method: 'get',
							url: `${_this.baseurl}JDCLoopInspection/listPageJson`,
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
              url: _this.baseurl + "JDCLoopInspection/delete/" + id
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
    //增
    update(item) {
      var _this = this;
      layer.open({
        type: 2,
        title: "新增",
        area: ["75%", "70%"],
        anim: [parseInt(6 * Math.random())],
        resize: false,
        anim: 2,
        maxmin: true,
        success: function(layero) {
          layero.find(".layui-layer-min").remove();
        },
        content: "#/looptc/" + "add",
        maxWidth: "800",
        end: function() {
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
        success: function(layero) {
          layero.find(".layui-layer-min").remove();
        },
        content: "#/looptc/" + id,
        end: function() {
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
      this.searchValue6 = "";
      this.searchValue7 = "";
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
<style scoped>
/* 输入框 */
.input-group:nth-child(5),
.input-group:nth-child(6),
.input-group:nth-child(7),
.input-group:nth-child(8){
  border-top: none;
}
.input-group:nth-child(7) {
  border-left: none;
}
.input-group:nth-last-child(2) {
    display: none;
  }
.input-group-addon {
  width: 153px;
}
/*element日期图标*/

.input-group .el-icon-date {
  left: 160px;
}
/*媒体查询*/

@media screen and (min-width: 1921px) {
  /*输入框*/
	.input-group-addon {
	  width: 170px;
	}
	.input-group .el-icon-date {
	  left: 176px;
	}
  .input-group:nth-child(5) {
    border-top: 1px solid #ededed;
    border-left: none;
  }
  .input-group:nth-child(6) {
    border-left: 1px solid #ededed;
  }
  .input-group:nth-last-child(2) {
		display: block;
    width: 40%;
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
	.input-group:nth-child(7){
		border-left: 1px solid #ededed;
	}
  .input-group:nth-last-child(2) {
    display: block;
  }
}

@media screen and (max-width: 1024px) {
  /*输入框*/
  .input-group:nth-child(3),
	.input-group:nth-child(7){
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
