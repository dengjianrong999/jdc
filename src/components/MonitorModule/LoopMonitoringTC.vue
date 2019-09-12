<template>

	<div id="TC">
		<div class="main">
			<div class="block">
				<div class="name">
					<i class="red_star">*</i>
					<span>检测编号：</span>
				</div>
				<div class="value">
					<input :disabled="disabledFlag" type="text" class="myinput" v-model='detectionNumber'>
				</div>
			</div>
			<div class="block">
				<div class="name">
				<i class="red_star">*</i>
					<span>检测方式：</span>
				</div>
				<div class="value">
					<!-- <el-select filterable placeholder="请选择" :disabled="disabledFlag" v-model="detectionMode">
						<el-option v-for="item in pzys" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select> -->
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='detectionMode'>
				</div>
			</div>
			<div class="block">
				<div class="name">
				<i class="red_star">*</i>
					<span>检测机构：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='detectionInstitutions'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<i class="red_star">*</i>
					<span>检测设备：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='detectionFacility'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<i class="red_star">*</i>
					<span>检测日期：</span>
				</div>
				<div class="value">
					<i class="el-input__icon el-icon-date"></i>
					<input type="text" placeholder="--请选择注册日期--" :disabled="disabledFlag" class="myinput" v-model='detectionDate' readonly="readonly"
					    id="surface1">
				</div>
			</div>
			<div class="block">
				<div class="name">
					<i class="red_star">*</i>
					<span>车牌号：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='licenseNumber'>
				</div>
			</div>
			<div class="block">
				<div class="name">
				<i class="red_star">*</i>
					<span>车辆类型：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='carType'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>检测：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='detection'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>CO限值：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='coLimiting'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>CO检测值：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='coDetection'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>HC限值：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='hcLimiting'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>HC检测值：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='hcDetection'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<i class="red_star">*</i>
					<span>检测结果（合格/超标）：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='detectionResult'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>温度：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='temperature'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>相对湿度：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='relativeHumidity'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>大气压：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='barometricPressure'>
				</div>
			</div>
			<div class="foot" v-if='isShow'>
				<div class="btn_wrap">
					<span class="btn_m btn_cancle" @click="cancle">取消</span>
				</div>
				<div class="btn_wrap left">
					<span class="btn_m btn_confirm" id="saves" @click='saves()'>确认</span>
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
				pkid: "",
				detectionNumber: "",
				detectionMode: "",
				detectionInstitutions: "",
				detectionDate: "",
				detectionFacility: "",
				licenseNumber: "",
				carType: "",
				detectionResult: "",

				detection: "",
				coLimiting: "",
				coDetection: "",
				hcLimiting: "",
				hcDetection: "",
				temperature: "",
				relativeHumidity: "",
				barometricPressure: "",

				disabledFlag: false,
				isShow: true,
				frameIndex: 99999,
				pzys: [{
					value: '金色'
				}, {
					value: '蓝色'
				}, {
					value: '白色'
				}, {
					value: '黑色'
				}, {
					value: '粉红色'
				}],
			};
		},
		mounted() {
			this.getDetailData();

			// layui 时间插件
			let _this = this;
			setTimeout(function () {
				layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface1", //指定元素
						type: "datetime",
						done: function (value) {
							_this.detectionDate = value;
						}
					});
				});
			}, 0);
		},
		methods: {
			showToggle: function (item) {
				item.isSubShow = !item.isSubShow;
			},
			cancle() { // 关闭弹窗
				this.closeIframe();
			},
			closeIframe() { // 关闭弹窗
				this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
				parent.layer.close(this.frameIndex); //再执行关闭
			},
			// 新增
			saves() {
				// console.log(this.$store.state.data.addPerson);
				// console.log("fsdf", this.addPerson);
				let _this = this;
				let tempData = {
					// 需要验证非空的项
					detectionNumber: this.detectionNumber,
					detectionMode: this.detectionMode,
					detectionInstitutions: this.detectionInstitutions,
					detectionDate: this.detectionDate,
					detectionFacility: this.detectionFacility,
					licenseNumber: this.licenseNumber,
					carType:this.carType,
					detectionResult:this.detectionResult
				};
				let key = this.isEmptyObjRtn(tempData); // 有空返回当前的key 否则返回false
				if (!key) {
					this.$http({
						method: "post",
						url: this.baseurl + "JDCLoopInspection/save",
						data: {
							addPerson: this.addPerson,
							addTime: this.addTime,
							pkid: this.pkid,
							detectionNumber: this.detectionNumber,
							detectionMode: this.detectionMode,
							detectionInstitutions: this.detectionInstitutions,
							detectionDate: this.detectionDate,
							detectionFacility: this.detectionFacility,
							licenseNumber: this.licenseNumber,
							carType:this.carType,
							detectionResult:this.detectionResult,
							detection: this.detection,
							coLimiting: this.coLimiting,
							coDetection: this.coDetection,
							hcLimiting: this.hcLimiting,
							hcDetection: this.hcDetection,
							temperature: this.temperature,
							relativeHumidity: this.relativeHumidity,
							barometricPressure: this.barometricPressure
						}
					}).then(res => {
						console.log(res);
						if (res.status === 200 && res.data.status === "1") {
							layer.msg("保存成功！", {
								icon: 1
							});
							let timer = setTimeout(function () {
								_this.closeIframe();
								clearTimeout(timer);
							}, 1000);
						}
					});
				} else {
					let dataName = {
						detectionNumber: '检测编号',
						detectionMode: '检测方式',
						detectionInstitutions: '检测机构',
						detectionDate: '检测日期',
						detectionFacility: '检测设备',
						licenseNumber: '车牌号',
						carType:'车辆类型',
						detectionResult:'检测结果'
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
				// 0详情 1修改
				var id = this.$route.params.id;
				let _this = this;
				if (id !== "add") {
					// 不是新增

					this.operateNum = JSON.parse(sessionStorage.getItem("operateNum")); // 操作类型 0详情 1修改
					id = id + "";
					if (this.operateNum === 0) {
						//0详情
						this.disabledFlag = true;
						_this.isShow = false;
					} else {
						// 修改
						this.disabledFlag = false;
					}
					_this.$http
						.get(_this.baseurl + "JDCLoopInspection/data/" + id)
						.then(function (res) {
							// if (res.status == 200 || res.data.data.status == 1)
							_this.details = res.data.data;
							(_this.detectionNumber = _this.details.detectionNumber),
							(_this.detectionMode = _this.details.detectionMode),
							(_this.detectionInstitutions = _this.details.detectionInstitutions),
							(_this.detectionDate = _this.details.detectionDate),
							(_this.detectionFacility = _this.details.detectionFacility),
							(_this.detectionResult = _this.details.detectionResult),
							(_this.licenseNumber = _this.details.licenseNumber),
							(_this.carType = _this.details.carType),
							(_this.detection = _this.details.detection),
							(_this.coLimiting = _this.details.coLimiting),
							(_this.coDetection = _this.details.coDetection),
							(_this.hcLimiting = _this.details.hcLimiting),
							(_this.hcDetection = _this.details.hcDetection),
							(_this.temperature = _this.details.temperature),
							(_this.relativeHumidity = _this.details.relativeHumidity),
							(_this.barometricPressure = _this.details.barometricPressure),
							(_this.pkid = _this.details.pkid)
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
	.value .el-icon-date{
       left: 6px;
   }
   #surface{
      background: rgba(255,255,255,0);
      text-indent: 21px;
  }
	
	
</style>
