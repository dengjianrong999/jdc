<template>
<div id="TC">
	<div class="main">
		<div class="block">
      <div class="name">
        <span>加速度：</span>
      </div>
       <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='addSpeed'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>平均不透光度值：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='averageOpacity'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>大气压：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='barometricPressure'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>车身长度：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='bodyworkLength'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>车速：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='carSpeed'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>co2值：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='co2Value'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>co值：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='coValue'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>动态模式：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='dynamicPattern'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>超标时长：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='excessiveLength'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>hc值：</span>
      </div>
     <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='hcValue'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>车牌颜色：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='licenseColor'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>车牌号码：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='licenseNumber'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>实测co：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='measuredCo'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>实测co2：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='measuredCo2'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>实测hc：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='measuredHc'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>实测no：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='measuredNo'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>no值：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='noValue'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>不透光度值：</span>
      </div>
       <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='opacityValue'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>室外温度：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='outdoorTemperature'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>点位编号：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='pointNumber'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>记录编号：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='recordNumber'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>相对湿度：</span>
      </div>
       <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='relativeHumidity'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>烟度值：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='smokeValue'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>检测结果：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='testingResult'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>车道号：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='trackNo'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>通过时间：</span>
      </div>
      <div class="value">
				<i class="el-input__icon el-icon-date"></i>
        <input  :disabled="disabledFlag" placeholder="--请选择检查日期--"  type="text" class="myinput" v-model='transitTime' readonly="readonly" id="surface">
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>不透光度系数：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='transmittance'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>VSP：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='vsp'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>是否有效烟羽：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='whetherEffectivePlume'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>是否通过：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='whetherPass'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>风向：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='windDirection'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>风速：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='windSpeed'>
      </div>
    </div>
	<div class="foot" v-if = 'isShow'>
			<div class="btn_wrap">
				<span class="btn_m btn_cancle" @click="cancle">取消</span>
			</div>
			<div class="btn_wrap left">
				<span class="btn_m btn_confirm"  @click='saves()' >确认</span>
			</div>
		</div>
	</div>
   
</div>

</template>

<script>
export default {
  data() {
    return {
      pkid: "",
      addSpeed: "",
      averageOpacity: "",
      barometricPressure: "",
      bodyworkLength: "",
      carSpeed: "",
      co2Value: "",
      coValue: "",
      dynamicPattern: "",
      excessiveLength: "",
      hcValue: "",
      licenseColor: "",
      licenseNumber: "",
      measuredCo: "",
      measuredCo2: "",
      measuredHc: "",
      measuredNo: "",
      noValue: "",
      opacityValue: "",
      outdoorTemperature: "",
      pointNumber: "",
      recordNumber: "",
      relativeHumidity: "",
      smokeValue: "",
      testingResult: "",
      trackNo: "",
      transitTime: "",
      transmittance: "",
      vsp: "",
      whetherEffectivePlume: "",
      whetherPass: "",
      windDirection: "",
      windSpeed: "",
      disabledFlag: false,
      isShow: true,
      frameIndex: 99999
    };
  },
  mounted() {
    this.getDetailData();
    //时间插件
    let _this = this;
    setTimeout(function() {
      layui.use("laydate", function() {
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
          elem: "#surface",
          type: "datetime",
          done: function(value) {
            _this.transitTime = value;
          }
        });
      });
    }, 0);
  },
  methods: {
    cancle() {
      // 关闭弹窗
      this.closeIframe();
    },
    closeIframe() {
      // 关闭弹窗
      this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
      parent.layer.close(this.frameIndex); //再执行关闭
    },
    saves() {
      let _this = this;
      let tempData = {
        // 需要验证非空的项
        recordNumber: this.recordNumber,
        trackNo: this.trackNo,
        transitTime: this.transitTime,
        licenseNumber: this.licenseNumber,
        licenseColor: this.licenseColor,
        testingResult: this.testingResult
      };
      let key = this.isEmptyObjRtn(tempData); // 有空返回当前的key 否则返回false
      if (!key) {
        this.$http({
          method: "post",
          url: this.baseurl + "remotesensingInfo/save",
          data: {
            addSpeed: this.addSpeed,
            averageOpacity: this.averageOpacity,
            barometricPressure: this.barometricPressure,
            bodyworkLength: this.bodyworkLength,
            carSpeed: this.carSpeed,
            co2Value: this.co2Value,
            coValue: this.coValue,
            dynamicPattern: this.dynamicPattern,
            excessiveLength: this.excessiveLength,
            hcValue: this.hcValue,
            licenseColor: this.licenseColor,
            licenseNumber: this.licenseNumber,
            measuredCo: this.measuredCo,
            measuredCo2: this.measuredCo2,
            measuredHc: this.measuredHc,
            measuredNo: this.measuredNo,
            noValue: this.noValue,
            opacityValue: this.opacityValue,
            outdoorTemperature: this.outdoorTemperature,
            pointNumber: this.pointNumber,
            recordNumber: this.recordNumber,
            relativeHumidity: this.relativeHumidity,
            smokeValue: this.smokeValue,
            testingResult: this.testingResult,
            trackNo: this.trackNo,
            transitTime: this.transitTime,
            transmittance: this.transmittance,
            vsp: this.vsp,
            whetherEffectivePlume: this.whetherEffectivePlume,
            whetherPass: this.whetherPass,
            windDirection: this.windDirection,
            windSpeed: this.windSpeed,
            pkid: this.pkid,
          }
        })
          .then(res => {
            if (res.status === 200 && res.data.status === "1") {
              layer.msg("保存成功！", { icon: 1 });
              let timer = setTimeout(function() {
                _this.closeIframe();
                clearTimeout(timer);
              }, 1000);
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        let dataName = {
          recordNumber: "记录编号",
          trackNo: "车道号",
          transitTime: "通过时间",
          licenseNumber: "车牌号码",
          licenseColor: "车牌颜色",
          testingResult: "检查结果"
        };
        for (let i in dataName) {
          if (key === i) {
            layer.msg(`${dataName[key]}输入不能为空！`, {
              icon: 2
            });
          }
        }
      }
    },
    getDetailData() {
      let id = this.$route.params.id;
      let _this = this;

      if (id !== "add") {
        // 不是新增

        this.operateNum = JSON.parse(sessionStorage.getItem("operateNum")); // 操作类型 0详情 1修改
        id = id + "";
        if (this.operateNum === 0) {
          //0详情
          this.disabledFlag = true;
          this.isShow = false;
        } else {
          // 修改
          this.disabledFlag = false;
        }
        _this.$http
          .get(_this.baseurl + "remotesensingInfo/data/" + id)
          .then(function(res) {
            // if (res.status == 200 || res.data.data.status == 1)
            _this.details = res.data.data;
            (_this.addSpeed = _this.details.addSpeed),
              (_this.averageOpacity = _this.details.averageOpacity),
              (_this.barometricPressure = _this.details.barometricPressure),
              (_this.bodyworkLength = _this.details.bodyworkLength),
              (_this.carSpeed = _this.details.carSpeed),
              (_this.co2Value = _this.details.co2Value),
              (_this.coValue = _this.details.coValue),
              (_this.dynamicPattern = _this.details.dynamicPattern),
              (_this.excessiveLength = _this.details.excessiveLength),
              (_this.hcValue = _this.details.hcValue),
              (_this.licenseColor = _this.details.licenseColor),
              (_this.licenseNumber = _this.details.licenseNumber),
              (_this.measuredCo = _this.details.measuredCo),
              (_this.measuredCo2 = _this.details.measuredCo2),
              (_this.measuredHc = _this.details.measuredHc),
              (_this.measuredNo = _this.details.measuredNo),
              (_this.noValue = _this.details.noValue),
              (_this.opacityValue = _this.details.opacityValue),
              (_this.outdoorTemperature = _this.details.outdoorTemperature),
              (_this.pointNumber = _this.details.pointNumber),
              (_this.pointNumber = _this.details.pointNumber),
              (_this.pointNumber = _this.details.pointNumber),
              (_this.recordNumber = _this.details.recordNumber),
              (_this.relativeHumidity = _this.details.relativeHumidity),
              (_this.smokeValue = _this.details.smokeValue),
              (_this.testingResult = _this.details.testingResult),
              (_this.trackNo = _this.details.trackNo),
              (_this.transitTime = _this.details.transitTime),
              (_this.transmittance = _this.details.transmittance),
              (_this.vsp = _this.details.vsp),
              (_this.whetherEffectivePlume =
                _this.details.whetherEffectivePlume),
              (_this.whetherPass = _this.details.whetherPass),
              (_this.windDirection = _this.details.windDirection),
              (_this.windSpeed = _this.details.windSpeed);
              (_this.pkid = _this.details.pkid);
          });
      }
    },
    isEmptyObjRtn(obj) {
      //循环对象 有空返回该项key 否则返回false
      for (var key in obj) {
        if (!obj[key] || obj[key].length == 0) {
          return key;
        }
      }
      return false;
    }
  }
};
</script>
<style scoped lang="less">
/* 弹窗 */
.main {
  padding-bottom: 68px;
}
.main .name {
  width: 100px;
}
/* 滚动条 */

::-webkit-scrollbar-thumb {
  background-color: #018ee8;
  outline-offset: -2px;
  outline: 2px solid #fff;
  -webkit-border-radius: 4px;
  border: 2px solid #fff;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track-piece {
  background-color: #fff;
  -webkit-border-radius: 0;
}
.value .el-icon-date {
  left: 6px;
}
#surface {
  background: rgba(255, 255, 255, 0);
  text-indent: 21px;
}
</style>
