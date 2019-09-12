<template>

    <div id="TC">
        <div class="main">
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>车牌所有人：</span>
                </div>
                <div class="value">
                    <input :disabled="disabledFlag" type="text" class="myinput" v-model='carOwner'>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>车牌号码：</span>
                </div>
                <div class="value">
                    <input :disabled="disabledFlag" type="text" class="myinput" v-model='cardNumber'>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <span>车牌颜色：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="cardColor">
                        <el-option v-for="item in cpys" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <span>车辆品牌：</span>
                </div>
                <div class="value">
                    <input :disabled="disabledFlag" type="text" class="myinput" v-model='carBrand'>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <span>车辆型号：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="carVersion">
                        <el-option v-for="item in clxh" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <span>燃料种类：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="fuelCode">
                        <el-option v-for="item in rlzl" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>排放标准：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="dischargeStandard">
                        <el-option v-for="item in pfbz" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>使用性质：</span>
                </div>
                <div class="value">
                    <input :disabled="disabledFlag" type="text" class="myinput" v-model='userNature'>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>处罚日期：</span>
                </div>
                <div class="value">
                    <i class="el-input__icon el-icon-date"></i>
                    <input :disabled="disabledFlag" placeholder="--请选择处罚日期--" type="text" class="myinput" v-model='punishTime' readonly="readonly"
                        id="surface1">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <span>处罚地点：</span>
                </div>
                <div class="value">
                    <input :disabled="disabledFlag" type="text" class="myinput" v-model='punishPlace'>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <span>注册地：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="registerPlace">
                        <el-option v-for="item in zcd" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <span>注册日期：</span>
                </div>
                <div class="value">
                    <i class="el-input__icon el-icon-date"></i>
                    <input :disabled="disabledFlag" placeholder="--请选择注册日期--" type="text" class="myinput" v-model='registerTime' readonly="readonly"
                        id="surface2">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>超标来源：</span>
                </div>
                <div class="value">
                    <input :disabled="disabledFlag" type="text" class="myinput" v-model='overproofOrigin'>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <span>处罚金额：</span>
                </div>
                <div class="value">
                    <input :disabled="disabledFlag" type="text" class="myinput" v-model='punishMoney'>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>罚款缴纳日期：</span>
                </div>
                <div class="value">
                    <i class="el-input__icon el-icon-date"></i>
                    <input :disabled="disabledFlag" placeholder="--请选择罚款缴纳日期--" type="text" class="myinput" v-model='payTime' readonly="readonly"
                        id="surface3">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <span>复检合格日期：</span>
                </div>
                <div class="value">
                    <i class="el-input__icon el-icon-date"></i>
                    <input :disabled="disabledFlag" placeholder="--请选择复检合格日期--" type="text" class="myinput" v-model='recheckQualtime' readonly="readonly"
                        id="surface4">
                </div>
            </div>
            <div class="block none">
                <div class="name">
                    <span>车辆类型：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="carType">
                        <el-option v-for="item in cllx" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block none">
            </div>
            <div class="remark none">
					<div class="name">
						<span>备注：</span>
					</div>
					<div class="value">
						<textarea type="text" class="myinput"  v-model="remark"></textarea>
					</div>
			</div>
             <div class="remark">
	
			</div>
            <div class="foot" v-if='isshow'>
                <div class="btn_wrap">
                    <span class="btn_m btn_cancle" @click="cancle">取消</span>
                </div>
                <div class="btn_wrap left">
                    <span class="btn_m btn_confirm" @click='saves()'>确认</span>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
export default {
  data() {
    return {
      pkid: Date.parse(new Date()),
      carOwner: "",
      cardNumber: "",
      cardColor: "",
      carBrand: "",
      carVersion: "",
      fuelCode: "",
      dischargeStandard: "",
      userNature: "",
      punishTime: "",
      punishPlace: "",
      registerPlace: "",
      registerTime: "",
      overproofOrigin: "",
      punishMoney: 0,
      payTime: "",
      recheckQualtime: "",
      carType: "",
      addPerson: "",
      addTime: "",
      disabledFlag: false,
      isshow: true,
      frameIndex: 99999,
      cpys: [
        {
          value: "金色"
        },
        {
          value: "蓝色"
        },
        {
          value: "白色"
        },
        {
          value: "黑色"
        },
        {
          value: "粉红色"
        }
      ],
      clxh: [
        {
          value: "SGM"
        },
        {
          value: "CA"
        },
        {
          value: "EQ"
        },
        {
          value: "SH"
        }
      ],
      rlzl: [
        {
          value: "气"
        },
        {
          value: "石油"
        },
        {
          value: "机油"
        },
        {
          value: "柴油"
        },
        {
          value: "电瓶"
        }
      ],
      pfbz: [
        {
          value: "标准"
        },
        {
          value: "超标"
        },
        {
          value: "微超标"
        },
        {
          value: "严重超标"
        },
        {
          value: "扣除车辆"
        }
      ],
      zcd: [
        {
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
      cllx: [
        {
          value: "电动车"
        },
        {
          value: "跑车"
        },
        {
          value: "SUV"
        },
        {
          value: "Aventador"
        },
        {
          value: "兰博基尼"
        }
      ]
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
          elem: "#surface1",
          type: "datetime",
          done: function(value) {
            _this.punishTime = value;
          }
        });
        laydate.render({
          elem: "#surface2",
          type: "datetime",
          done: function(value) {
            _this.registerTime = value;
          }
        });
        laydate.render({
          elem: "#surface3",
          type: "datetime",
          done: function(value) {
            _this.payTime = value;
          }
        });
        laydate.render({
          elem: "#surface4",
          type: "datetime",
          done: function(value) {
            _this.recheckQualtime = value;
          }
        });
      });
    }, 0);
  },
  methods: {
    showToggle: function(item) {
      item.isSubShow = !item.isSubShow;
    },
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
        carOwner: this.carOwner,
        cardNumber: this.cardNumber,
        dischargeStandard: this.dischargeStandard,
        userNature: this.userNature,
        punishTime: this.punishTime,
        overproofOrigin: this.overproofOrigin,
        payTime: this.payTime
      };
      let key = this.isEmptyObjRtn(tempData); // 有空返回当前的key 否则返回false
      if (!key) {
        this.$http({
          method: "post",
          url: this.baseurl + "carerCheckInfo/save",
          data: {
            pkid: this.pkid,
            carOwner: this.carOwner,
            cardNumber: this.cardNumber,
            cardColor: this.cardColor,
            carBrand: this.carBrand,
            carVersion: this.carVersion,
            fuelCode: this.fuelCode,
            dischargeStandard: this.dischargeStandard,
            userNature: this.userNature,
            punishTime: this.punishTime,
            punishPlace: this.punishPlace,
            registerPlace: this.registerPlace,
            registerTime: this.registerTime,
            overproofOrigin: this.overproofOrigin,
            punishMoney: this.punishMoney,
            payTime: this.payTime,
            recheckQualtime: this.recheckQualtime,
            carType: this.carType,
            addPerson: this.addPerson,
            addTime: this.addTime
          }
        }).then(res => {
          console.log(res);
          if (res.status === 200 && res.data.status === "1") {
            layer.msg("保存成功！", {
              icon: 1
            });
            let timer = setTimeout(function() {
              _this.closeIframe();
              clearTimeout(timer);
            }, 1000);
          }
        });
      } else {
        let dataName = {
          carOwner: "车牌所有人",
          cardNumber: "车牌号码",
          dischargeStandard: "排放标准",
          userNature: "使用性质",
          punishTime: "处罚日期",
          overproofOrigin: "超标来源",
          payTime: "罚款缴纳日期"
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
          _this.isshow = false;
        } else {
          // 修改
          this.disabledFlag = false;
        }
        _this.$http
          .get(_this.baseurl + "carerCheckInfo/data/" + id)
          .then(function(res) {
            if (res.status == 200 || res.data.data.status == 1)
              _this.details = res.data.data;
            (_this.carOwner = _this.details.carOwner),
              (_this.cardNumber = _this.details.cardNumber),
              (_this.cardColor = _this.details.cardColor),
              (_this.carBrand = _this.details.carBrand),
              (_this.carVersion = _this.details.carVersion),
              (_this.fuelCode = _this.details.fuelCode),
              (_this.dischargeStandard = _this.details.dischargeStandard),
              (_this.userNature = _this.details.userNature),
              (_this.punishTime = _this.details.punishTime),
              (_this.punishPlace = _this.details.punishPlace),
              (_this.registerPlace = _this.details.registerPlace),
              (_this.registerTime = _this.details.registerTime),
              (_this.overproofOrigin = _this.details.overproofOrigin),
              (_this.punishMoney = _this.details.punishMoney),
              (_this.payTime = _this.details.payTime),
              (_this.recheckQualtime = _this.details.recheckQualtime),
              (_this.carType = _this.details.carType),
              (_this.addTime = _this.details.addTime),
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
.main {
  padding-bottom: 68px;
}
.main .name {
  width: 105px;
}
/* 弹窗 */

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
.none{
  border-bottom: none;
}
</style>
