<template>

<div id="TC">
	<div class="main">
		<div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>机械种类：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="mechType">
					<el-option v-for="item in mechanicalTypeValue" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>机械名称：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="mechName">
					<el-option v-for="item in jxmc" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>所有单位或个人：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='owner'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>使用单位或个人姓名：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='ownerName'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>所有单位或个人联系电话：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='ownerPhone'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>使用单位或个人：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='usedUsers'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>所有单位或个人姓名：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='userName'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>机械型号：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='mechVersion'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>生产厂：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="producer">
					<el-option v-for="item in scc" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>出厂日期：</span>
      </div>
      <div class="value">
				<i class="el-input__icon el-icon-date"></i>
        <input  :disabled="disabledFlag" placeholder="--请选择出厂日期--"  type="text" class="myinput" v-model='productionTime' readonly="readonly" id="surface1">
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>出厂编号：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='productionNo'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>车架号：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='frameNo'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>发动机型号：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='engineType'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>发动机编号：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='engineNo'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>发动机制造企业：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='engineMaker'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>发动机出厂日期：</span>
      </div>
      <div class="value">
				<i class="el-input__icon el-icon-date"></i>
        <input  :disabled="disabledFlag" placeholder="--请选择发动机出厂日期--"  type="text" class="myinput" v-model='engineProdutime' readonly="readonly" id="surface2">
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>排放标注：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="dischargeStandard">
					<el-option v-for="item in letStandardValue" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>发动机功率：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="enginePower">
					<el-option v-for="item in fdjgl" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>燃料类种类：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="fuelCode">
					<el-option v-for="item in fuelTypeValue" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>净化装置类别：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="purifiDeviceType">
					<el-option v-for="item in jhzzlb" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <i class="red_star">*</i>
        <span>检查方法：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="checkMethod">
					<el-option v-for="item in checkMethodValue" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>是否超标：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="isOverproof">
					<el-option v-for="item in sfcb" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>机械检查地：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='mechCheckPlace'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>检查登记区：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="checkRegisterArea">
					<el-option v-for="item in jcdjq" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>检查日期：</span>
      </div>
      <div class="value">
				<i class="el-input__icon el-icon-date"></i>
        <input  :disabled="disabledFlag" placeholder="--请选择检查日期--"  type="text" class="myinput" v-model='checkTime' readonly="readonly" id="surface3">
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>机械累计作业时间：</span>
      </div>
      <div class="value">
        <input  :disabled="disabledFlag"  type="text" class="myinput" v-model='workTotalTime'>
      </div>
    </div>
    <div class="block">
      <div class="name">
        <span>是否进入禁止使用区：</span>
      </div>
      <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="isForbid">
					<el-option v-for="item in sfjrjzsyq" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
      </div>
    </div>
    <div class="block">
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
      addPerson: "",
      addTime: "",
      checkMethod: "",
      checkRegisterArea: "",
      checkTime: "",
      dischargeStandard: "",
      engineMaker: "",
      engineNo: "",
      enginePower: "",
      engineProdutime: "",
      engineType: "",
      frameNo: "",
      fuelCode: "",
      isForbid: "",
      isOverproof: "",
      mechCheckPlace: "",
      mechName: "",
      mechType: "",
      mechVersion: "",
      owner: "",
      ownerName: "",
      ownerPhone: "",
      pkid: Date.parse(new Date()),
      producer: "",
      productionNo: "",
      productionTime: "",
      purifiDeviceType: "",
      usedUsers: "",
      userName: "",
      workTotalTime: 0,
      disabledFlag: false,
      isShow: true,
      frameIndex: 99999,

      // 条件查询
      jxzl: [
        { value: "工程" },
        { value: "农业" },
        { value: "园林" },
        { value: "旅游" },
        { value: "其他" }
      ],
      jxmc: [
        { value: "挖掘机" },
        { value: "叉车" },
        { value: "打桩机" },
        { value: "观光车" },
        { value: "轿车" }
      ],
      scc: [
        { value: "广软科技" },
        { value: "北京天安门" },
        { value: "北京顺义" }
      ],
      pfbz: [
        { value: "标准" },
        { value: "超标" },
        { value: "微招标" },
        { value: "严重超标" }
      ],
      fdjgl: [
        { value: "10T" },
        { value: "20T" },
        { value: "30T" },
        { value: "40T" },
        { value: "50T" }
      ],
      rllzl: [
        { value: "气" },
        { value: "石油" },
        { value: "机油" },
        { value: "柴油" },
        { value: "电瓶" }
      ],
      jhzzlb: [
        { value: "DPA" },
        { value: "DPB" },
        { value: "DPC" },
        { value: "DPD" },
        { value: "DPE" },
        { value: "DPF" }
      ],
      jcff: [
        { value: "机器" },
        { value: "人工" },
        { value: "智能" },
        { value: "仪器" },
        { value: "目测" }
      ],
      sfcb: [{ value: "是" }, { value: "否" }],
      jcdjq: [
        { value: "北京" },
        { value: "上海" },
        { value: "广州" },
        { value: "郑州" },
        { value: "杭州" }
      ],
      sfjrjzsyq: [{ value: "是" }, { value: "否" }],
      checkMethodValue:[],//检查方法
      mechanicalTypeValue:[],//机械种类
      letStandardValue:[],//排放标注
      fuelTypeValue:[],//燃料种类

      
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
            _this.productionTime = value;
          }
        });
        laydate.render({
          elem: "#surface2",
          type: "datetime",
          done: function(value) {
            _this.engineProdutime = value;
          }
        });
        laydate.render({
          elem: "#surface3",
          type: "datetime",
          done: function(value) {
            _this.checkTime = value;
          }
        });
      });
    }, 0);

    //搜索条件筛选
    _this
      .$http({
        method: "get",
        url: `${_this.baseurl}fdljxCheckInfo/fdl`
      })
      .then(res => {
        if (res.status == 200 || res.data.data.status == 1)
          _this.checkMethodValue = res.data.data.map.checkMethod;
          _this.mechanicalTypeValue = res.data.data.map.mechanicalType;
          _this.letStandardValue = res.data.data.map.letStandard;
          _this.fuelTypeValue = res.data.data.map.fuelType;
        
      })
      .catch(err => {
        console.log(err);
      });
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
        mechType: this.mechType,
        mechName: this.mechName,
        owner: this.owner,
        productionTime: this.productionTime,
        dischargeStandard: this.dischargeStandard,
        checkMethod: this.checkMethod
      };
      let key = this.isEmptyObjRtn(tempData); // 有空返回当前的key 否则返回false
      if (!key) {
        this.$http({
          method: "post",
          url: this.baseurl + "fdljxCheckInfo/save",
          data: {
            addPerson: this.addPerson,
            addTime: this.addTime,
            checkMethod: this.checkMethod,
            checkRegisterArea: this.checkRegisterArea,
            checkTime: this.checkTime,
            dischargeStandard: this.dischargeStandard,
            engineMaker: this.engineMaker,
            engineNo: this.engineNo,
            enginePower: this.enginePower,
            engineProdutime: this.engineProdutime,
            engineType: this.engineType,
            frameNo: this.frameNo,
            fuelCode: this.fuelCode,
            isForbid: this.isForbid,
            isOverproof: this.isOverproof,
            mechCheckPlace: this.mechCheckPlace,
            mechName: this.mechName,
            mechType: this.mechType,
            mechVersion: this.mechVersion,
            owner: this.owner,
            ownerName: this.ownerName,
            ownerPhone: this.ownerPhone,
            pkid: this.pkid,
            producer: this.producer,
            productionNo: this.productionNo,
            productionTime: this.productionTime,
            purifiDeviceType: this.purifiDeviceType,
            usedUsers: this.usedUsers,
            userName: this.userName,
            workTotalTime: this.workTotalTime
          }
        }).then(res => {
          console.log(res);
          if (res.status === 200 && res.data.status === "1") {
            layer.msg("保存成功！", { icon: 1 });
            let timer = setTimeout(function() {
              _this.closeIframe();
              clearTimeout(timer);
            }, 1000);
          }
        });
      } else {
        let dataName = {
          mechType: "机械种类",
          mechName: "机械名称",
          owner: "所有单位或个人",
          productionTime: "出厂日期",
          dischargeStandard: "排放标准",
          checkMethod: "检查方法"
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
          .get(_this.baseurl + "fdljxCheckInfo/data/" + id)
          .then(function(res) {
            // if (res.status == 200 || res.data.data.status == 1)
            _this.details = res.data.data;
            (_this.addPerson = _this.details.addPerson),
              (_this.addTime = _this.details.addTime),
              (_this.checkMethod = _this.details.checkMethod),
              (_this.checkRegisterArea = _this.details.checkRegisterArea),
              (_this.checkTime = _this.details.checkTime),
              (_this.dischargeStandard = _this.details.dischargeStandard),
              (_this.engineMaker = _this.details.engineMaker),
              (_this.engineNo = _this.details.engineNo),
              (_this.enginePower = _this.details.enginePower),
              (_this.engineProdutime = _this.details.engineProdutime),
              (_this.engineType = _this.details.engineType),
              (_this.frameNo = _this.details.frameNo),
              (_this.fuelCode = _this.details.fuelCode),
              (_this.isForbid = _this.details.isForbid),
              (_this.isOverproof = _this.details.isOverproof),
              (_this.mechCheckPlace = _this.details.mechCheckPlace),
              (_this.mechName = _this.details.mechName),
              (_this.mechType = _this.details.mechType),
              (_this.mechVersion = _this.details.mechVersion),
              (_this.owner = _this.details.owner),
              (_this.ownerName = _this.details.ownerName),
              (_this.ownerPhone = _this.details.ownerPhone),
              (_this.pkid = _this.details.pkid),
              (_this.producer = _this.details.producer),
              (_this.productionNo = _this.details.productionNo),
              (_this.productionTime = _this.details.productionTime),
              (_this.purifiDeviceType = _this.details.purifiDeviceType),
              (_this.usedUsers = _this.details.usedUsers),
              (_this.userName = _this.details.userName),
              (_this.workTotalTime = _this.details.workTotalTime);
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
.main{
  padding-bottom: 68px;
}
.main .name {
  width: 160px;
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
</style>
