
<template>

<div id="TC">
	<div class="main">
						<div class="block">
							<div class="name">
								<i class="red_star">*</i>
								<span>加油站名称：</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" v-model="name" :disabled="disabledFlag">
							</div>
						</div>
						<div class="block">
							<div class="name">
								<i class="red_star">*</i>
								<span>加油站地址：</span>
							</div>
							<div class="value">
								<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="address">
									<el-option v-for="item in jyzdz" :key="item.value" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="block">
							<div class="name">
								<i class="red_star">*</i>
								<span>经度：</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" v-model="longitude" :disabled="disabledFlag">
							</div>
						</div>
						<div class="block">
							<div class="name">
								<i class="red_star">*</i>
								<span>纬度：</span >
							</div>
							<div class="value">
								<input type="text" class="myinput" v-model="latitude" :disabled="disabledFlag">
							</div>
						</div>
						<div class="block">
							<div class="name">
								<i class="red_star">*</i>
								<span>所属街道：</span>
							</div>
							<div class="value">
								<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="street">
									<el-option v-for="item in ssjd" :key="item.value" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</div>
						<div class="block">
							<div class="name">
								<i class="red_star">*</i>
								<span>油罐个数：</span>
							</div>
							<div class="value">
								<input type="text" class="myinput" v-model="potNo" :disabled="disabledFlag">
							</div>
						</div>
						<div class="block">
							<div class="name">
								<i class="red_star">*</i>
								<span>油罐总储油量：</span>
							</div>
							<div class="value">
								<input type="text" class="myinput"  v-model="potStorage" :disabled="disabledFlag">
							</div>
						</div>
                        	<div class="block">
							<div class="name">
								<i class="red_star">*</i>
								<span>油枪数量：</span>
							</div>
							<div class="value">
								<input type="text" class="myinput"  v-model="gunNumber" :disabled="disabledFlag">
							</div>
						</div>
						
					  <div class="remark top-none">
							<div class="name">
								<i class="red_star"></i>
								<span>备注：</span>
							</div>
							<div class="value">
								<textarea type="text" class="myinput"  v-model="remark" :disabled="disabledFlag"></textarea>
							</div>
						</div>
						<div class="foot" v-show = 'isShow'>
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
      address: "",
      gunNumber: "",
      latitude: "",
      longitude: "",
      name: "",
      pkid: Date.parse(new Date()),
      potNo: "",
      potStorage: "",
      remark: "",
      street: "",
      type: "",
      isShow:true,
      disabledFlag:false,
			frameIndex: 99999,
			jyzdz: [{ value: '北京市顺义区', }, { value: '北京路加油站', }, { value: '环保街区加油站', }, { value: '第一大道加油站', }],
ssjd: [{
					value: '顺义区空港街道',
				}, {
					value: '北京路',
				}, {
					value: '环保街区',
				}, {
					value: '第一大道',
				}, {
					value: '棠溪道路',
				}],
    };
  },
  mounted(){
    this.getDetailData();
  },
  methods: {
		showToggle: function(item) {
			item.isSubShow = !item.isSubShow;
		},
		cancle() { // 关闭弹窗
			this.closeIframe();
		},
		closeIframe() { // 关闭弹窗
			this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
			parent.layer.close(this.frameIndex); //再执行关闭
		},
   saves() {
			let _this = this;
      let tempData = { // 需要验证非空的项
        potStorage: this.potStorage,
        gunNumber: this.gunNumber,
        address: this.address,
        latitude: this.latitude,
        longitude: this.longitude,
        potNo: this.potNo,
        name: this.name,
        address: this.address,
      };
      let key = this.isEmptyObjRtn(tempData); // 有空返回当前的key 否则返回false
      if(!key){
        //保存前对经纬度进行度分秒转化再发送
        //  this.latitude = this.wd.slice(0,this.wd.indexOf("°"));
        //  this.latitudem = this.wd.slice(this.wd.indexOf("°")+1,this.wd.indexOf("′"));
        //  this.latitudes = this.wd.slice(this.wd.indexOf("′")+1,this.wd.indexOf("″"));

        //  this.longitude = this.jd.slice(0,this.jd.indexOf("°"));
        //  this.longitudem = this.jd.slice(this.jd.indexOf("°")+1,this.jd.indexOf("′"));
        //  this.longitudes = this.jd.slice(this.jd.indexOf("′")+1,this.jd.indexOf("″"));
      this.$http({
        method: "post",
        url: this.baseurl + "oilstationInfo/save",
        data: {
          addPerson: this.addPerson,
          addTime: this.addTime,
          address: this.address,
          gunNumber: this.gunNumber,
          latitude: this.latitude,
          longitude: this.longitude,
          name: this.name,
          pkid: this.pkid,
          potNo: this.potNo,
          potStorage: this.potStorage,
          remark: this.remark,
          street: this.street,
          type: this.type,
        }
        }).then((res) => {
          console.log(res)
            if(res.status === 200 && res.data.status === '1'){
              layer.msg("保存成功！", { icon: 1 });
							let timer = setTimeout(function () {
								_this.closeIframe();
								clearTimeout(timer);
							}, 1000);
            }
        });
      }else{
        let dataName = {
            name:'加油站名称',
            address:'加油站地址',
            latitude: '纬度',
            longitude:'经度',
            street:'所属街道',
            potNo:'油罐个数',
            potStorage:'油罐总储油量',
            gunNumber:'油枪数量',
        }
        for (let i in dataName){
            if(key === i){
                layer.msg(`${dataName[key]}输入不能为空！`, {
                    icon: 2,
                });
            }
        }
      }     
    },
   getDetailData() {
      let id = this.$route.params.id;
      let _this = this;

      if(id !== 'add'){ // 不是新增 
        this.operateNum = JSON.parse(sessionStorage.getItem('operateNum')); // 操作类型 0详情 1修改
        id = id+'';
        if(this.operateNum === 0){//0详情
          this.disabledFlag = true;
          this.isShow = false;
        }else{ // 修改
          this.disabledFlag = false;
        }
      _this.$http
        .get(_this.baseurl + "oilstationInfo/data/" + id)
        .then(function(res) {
          console.log(res)
          if (res.status === 200 || res.data.data.status === 1)
            _this.details = res.data.data;

          (_this.addPerson = _this.details.addPerson),
            (_this.addTime = _this.details.addTime),
            (_this.address = _this.details.address),
            (_this.gunNumber = _this.details.gunNumber),
            (_this.longitude = _this.details.longitude),
            (_this.latitude = _this.details.latitude),
            (_this.name = _this.details.name),
            (_this.pkid  = _this.details.pkid),
            (_this.type = _this.details.type),
            (_this.potNo = _this.details.potNo),
            (_this.potStorage = _this.details.potStorage),
            (_this.street = _this.details.street),
            (_this.remark = _this.details.remark)

        });
      }
    },
    isEmptyObjRtn(obj){ //循环对象 有空返回该项key 否则返回false
        for (var key in obj){
            if(!obj[key] || obj[key].length == 0){
                return key;
            }
        }
        return false;
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" >
.main {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  max-height: 90vh;
  overflow: auto;
}
.main .block {
  display: flex;
  align-items: center;
  width: 50%;
  height: 50px;
  border: 1px solid #eee;
  border-top: 0;
}
.main .block:nth-of-type(1) {
  border-top: 1px solid #eee;
}
.main .block:nth-of-type(2) {
  border-top: 1px solid #eee;
}
.main .block:nth-of-type(2n) {
  border-left: 0;
}
.main .name,
.value {
  display: inline-block;
}
.main .value {
  position: relative;
  flex: auto;
  height: 100%;
  padding: 10px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main input,
.main select {
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  color: #666;
}
.main select:disabled {
  color: #999;
}
select:invalid {
  color: #999;
}
.main select {
  /*很关键：将默认的select选择框样式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /*为下拉小箭头留出一点位置，避免被文字覆盖*/
  padding-right: 22px;
}
.main .name {
  border-right: 1px solid #ededed;
  width: 108px;
  height: 100%;
  color: #333;
  font-weight: 700;
  font-size: 12px;
  color: #333;
  padding: 0px 1px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.main .myinput,
.main select {
  width: 100%;
  height: 26px;
  text-indent: 10px;
}
.main .red_star {
  color: #ff0000;
  margin-right: 3px;
  margin-top: 3px;
}
.remark{
	width: 100%;
	display: flex;
	justify-content: space-between;
	 border: 1px solid #ededed;

}
 .remark .value{
	 display: flex;
 }
  .remark .value textarea{
	  height: 80px;
	  resize: none;
	  padding: 10px;
  }
.foot {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  position: fixed;
  bottom: 2%;
}
.btn_wrap {
  display: inline-block;
  width: 50%;
  padding: 4px 10px;
  text-align: right;
}
.btn_wrap.left {
  text-align: left;
}
.btn_m {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
}
.btn_m:hover {
  opacity: 0.8;
  filter: alpha(opacity=80);
}
.btn_cancle {
  margin-right: 110px;
  height: 30px;
  width: 100px;
  border-color: #db9554;
  color: #db9554;
}
.btn_cancle:active {
  background: #db9554;
  color: #fff;
}
.btn_confirm {
  margin-left: 110px;
  height: 30px;
  width: 100px;
  border-color: #029ad1;
  color: #029ad1;
}
.btn_confirm:active {
  background: #029ad1;
  color: #fff;
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

/* triangle_down  三角形 下*/
.triangle_down {
  width: 0;
  height: 0;
  border-width: 6px;
  border-style: solid;
  border-color: #666 transparent transparent transparent;
  position: absolute;
  top: 50%;
  margin-top: -3px;
  right: 16px;
}
.top-none{
  border-top:none;
}
</style>
