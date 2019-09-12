<!--严重超标车-->
<template>
	<!--右-->
	<div class="tabs">
		<!--内容-->
		<div class="table-content">
			<!--输入框-->
			<div class="input-box">
				<div class="input-group">
					<span class="input-group-addon">车型：</span>
					<input type="text" class="form-control" v-model="carVersion">
				</div>
				<div class="input-group">
					<span class="input-group-addon">车牌号：</span>
					<input type="text" class="form-control" v-model="carNumberd">
				</div>
				<div class="input-group">
					<span class="input-group-addon">超标倍数：</span>
					<input type="text" class="form-control" v-model="overproofMultiple">
				</div>
				<div class="input-group">
				</div>
				<!--按钮-->
				<div class="input-group">
					<span class="btn_m btn_query" @click="select()">
						<i class="iconfont icon-chaxun2"></i>
						<span>查询</span>
					</span>
				</div>
			</div>
			<!--柱状图-->
			<div class="zhuzhuangtu">
				<div class="main-content">
					<div id="main" class="canvas" style="width:100%; height:74vh;">

					</div>
				</div>
			</div>
		</div>
	</div>
	<!--按钮-->
</template>

<script>
export default {
  data() {
    return {
      option: {},
      datas: [],
      myCharts:null,
      carVersion: "",
      carNumberd: "",
      overproofMultiple: ""
    };
  },
  mounted() {
    let _this = this;
    setTimeout(function(){
      _this.initEchart();
    },500)
    //柱状图
  },
  methods: {
    select() {
       this.initEchart();
    },
    //echarts
    initEchart() {
      var _this = this;
      console.log('echars',echarts)
      _this.myCharts = echarts.init(document.getElementById("main"));
      this.option = {
        title: {
          text: "各车型超标倍数统计",
          x: "center",
          y: "30"
        },
        grid: {
          y: 100,
          backgroundColor: "rgba(255,255,255,1)"
        },
        xAxis: [
          {
            type: "category",
            data: [ "", "","","","","", "", "", "",""]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: function(value) {
                var texts = [];
                if (value == 0) {
                  texts.push("0");
                } else {
                  value = value + ".00";
                  texts.push(value);
                }
                return texts;
              }
            }
          }
        ],
        series: [
          {
            color: "orange",
            type: "bar",
            data: [0.0,0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
            barWidth: 50,
            markLine: {
              itemStyle: {
                normal: {
                  lineStyle: {
                    // type: 'solid',
                    color: "#66CD00"
                  },
                  label: {
                    show: true,
                    position: "left",
                    formatter: "标准排放",
                    textStyle: {
                      fontSize: 12,
                      fontWeight: "bolder"
                    }
                  }
                }
              },
              data: [
                {
                  name: "Y 轴值为 100 的水平线",
                  yAxis: 2.5
                }
              ]
            }
          }
        ]
      };

      $(window).on("resize", function() {
        myChart.resize();
      });

      var _this = this;
      _this
        .$http({
          method: "get",
          url: `${_this.baseurl}SeriousovercarInfo/tj`,
          params: {
            carVersion: _this.carVersion,
            carNumberd: _this.carNumberd,
            overproofMultiple: _this.overproofMultiple
          }
        })
        .then(function(res) {
          if (res.status == 200 || res.data.data.status == 1)
          _this.datas = res.data.data;
          console.log( 'ss',_this.datas)
          _this.datas.forEach(function(value, index) {
            _this.option.xAxis[0].data.forEach(function(val, inx) {
              _this.option.xAxis[0].data[index] = _this.datas[index].carVersion;
            });
            _this.option.xAxis[0].data.forEach(function(val, inx) {
              _this.option.series[0].data[index] = _this.datas[index].num;
            });
          });
           _this.myCharts.setOption(_this.option);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>


<style scoped="scoped" lang="less">
// 柱状图
.main-content {
  height: 100%;
  overflow: hidden;
}

.canvas {
  border: 1px solid #ededed;
  // height: 100% !important;
  box-shadow: 0px 3px 32px 2px #ededed;
} // 柱状图结束
// 输入框
/* 按钮 */

.input-group {
  width: 33.333333333333333333333%;
  border: 1px solid #ededed;
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
    border-left: 1px solid #ededed;
  }
  .input-group:nth-last-child(2) {
    display: inline-block;
  }
}
</style>
