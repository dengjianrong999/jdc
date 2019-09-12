<template>

	<div id="TC">
		<div class="main">
			<div class="block">
				<div class="name">
					<i class="red_star">*</i>
					<span>车牌号：</span>
				</div>
				<div class="value">
					<input :disabled="disabledFlag" type="text" class="myinput" v-model='carNumber'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>牌照颜色：</span>
				</div>
				<div class="value">
					<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="licenseColor">
						<el-option v-for="item in pzys" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>厂牌：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='factoryCard'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<i class="red_star">*</i>
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
					<i class="red_star">*</i>
					<span>注册日期：</span>
				</div>
				<div class="value">
					<i class="el-input__icon el-icon-date"></i>
					<input type="text" placeholder="--请选择注册日期--" :disabled="disabledFlag" class="myinput" v-model='registerTime' readonly="readonly"
					    id="surface1">
				</div>
			</div>
			<div class="block">
				<div class="name">
					<i class="red_star">*</i>
					<span>所有人信息：</span>
				</div>
				<div class="value">
					<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="ownerInfo">
						<el-option v-for="item in syrxx" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>燃气种类：</span>
				</div>
				<div class="value">
					<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="fuelCode">
						<el-option v-for="item in rqzl" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<i class="red_star">*</i>
					<span>车辆最大<br>总质量(KG)：</span>
				</div>
				<div class="value">
					<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="carMaxweight">
						<el-option v-for="item in clzdzzl" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>环保标志：</span>
				</div>
				<div class="value">
					<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="envirState">
						<el-option v-for="item in hbbz" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>处罚：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='punish'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>检查类型：</span>
				</div>
				<div class="value">
					<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="checkType">
						<el-option v-for="item in jclx" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>检查地点：</span>
				</div>
				<div class="value">
					<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="checkPlace">
						<el-option v-for="item in jcdd" :key="item.value" :label="item.value" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<i class="red_star">*</i>
					<span>检查人：</span>
				</div>
				<div class="value">
					<input type="text" :disabled="disabledFlag" class="myinput" v-model='checkPerson'>
				</div>
			</div>
			<div class="block">
				<div class="name">
					<span>附件：</span>
				</div>
				<div class="value">
					<button type="button" class="layui-btn" id="test1">
						<i class="iconfont icon-huixingzhen"></i>上传附件...
					</button>
				</div>
			</div>
			<div class="remark top-none">
				<div class="name">
					<span>备注：</span>
				</div>
				<div class="value">
					<textarea type="text" class="myinput" :disabled="disabledFlag" v-model="remark"></textarea>
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
				carMaxweight: 0,
				carNumber: "",
				checkPerson: "",
				checkPlace: "",
				checkType: "",
				envirState: "",
				factoryCard: "",
				fuelCode: "",
				licenseColor: "",
				mark: "",
				ownerInfo: "",
				pkid: "",
				punish: "",
				registerPlace: "",
				registerTime: "",
				remark: "",
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
				zcd: [{
					value: '北京'
				}, {
					value: '上海'
				}, {
					value: '广州'
				}, {
					value: '郑州'
				}, {
					value: '杭州'
				}],
				syrxx: [{
					value: '北京人'
				}, {
					value: '上海人'
				}, {
					value: '广州人'
				}, {
					value: '郑州人'
				}, {
					value: '杭州人'
				}],
				rqzl: [{
					value: '气'
				}, {
					value: '石油'
				}, {
					value: '机油'
				}, {
					value: '柴油'
				}, {
					value: '电瓶'
				}],
				clzdzzl: [{
					value: '10'
				}, {
					value: '20'
				}, {
					value: '30'
				}, {
					value: '40'
				}, {
					value: '50'
				}],
				hbbz: [{
					value: '环保'
				}, {
					value: '标志'
				}, {
					value: '环保标志'
				}, {
					value: '环标'
				}, {
					value: '保志'
				}],
				jclx: [{
					value: '机器'
				}, {
					value: '人工'
				}, {
					value: '智能'
				}],
				jcdd: [{
					value: '北京'
				}, {
					value: '上海'
				}, {
					value: '广州'
				}, {
					value: '郑州'
				}, {
					value: '杭州'
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
							_this.registerTime = value;
						}
					});
				});
			}, 0);
			// 上传附件
			$(function () {
				layui.use('upload', function () {
					var upload = layui.upload;
					//执行实例
					var uploadInst = upload.render({
						elem: '#test1',
						url: 'carCheckInfo/save',
						accept: 'file',
						auto: false,
						bindAction: '#saves',
						multiple: true,
						done: function (res) {
							//上传完毕回调
						},
						error: function () {
							//请求异常回调
						}
					});
				});
			})
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
					carNumber: this.carNumber,
					registerPlace: this.registerPlace,
					registerTime: this.registerTime,
					ownerInfo: this.ownerInfo,
					carMaxweight: this.carMaxweight,
					checkPerson: this.checkPerson
				};
				let key = this.isEmptyObjRtn(tempData); // 有空返回当前的key 否则返回false
				if (!key) {
					this.$http({
						method: "post",
						url: this.baseurl + "carCheckInfo/save",
						data: {
							addPerson: this.addPerson,
							addTime: this.addTime,
							carMaxweight: this.carMaxweight,
							carNumber: this.carNumber,
							checkPerson: this.checkPerson,
							checkPlace: this.checkPlace,
							checkType: this.checkType,
							envirState: this.envirState,
							factoryCard: this.factoryCard,
							fuelCode: this.fuelCode,
							licenseColor: this.licenseColor,
							mark: this.mark,
							ownerInfo: this.ownerInfo,
							pkid: this.pkid,
							punish: this.punish,
							registerPlace: this.registerPlace,
							registerTime: this.registerTime,
							remark: this.remark,
							details: []
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
						carNumber: "车牌号",
						registerPlace: "注册地",
						registerTime: "注册日期",
						ownerInfo: "所有人信息",
						carMaxweight: "车辆最大总质量",
						checkPerson: "检查人"
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
						.get(_this.baseurl + "carCheckInfo/data/" + id)
						.then(function (res) {
							// if (res.status == 200 || res.data.data.status == 1)
							_this.details = res.data.data;
							(_this.addPerson = _this.details.addPerson),
							(_this.carNumber = _this.details.carNumber),
							(_this.addTime = _this.details.addTime),
							(_this.carMaxweight = _this.details.carMaxweight),
							(_this.checkPerson = _this.details.checkPerson),
							(_this.checkPlace = _this.details.checkPlace),
							(_this.checkType = _this.details.checkType),
							(_this.envirState = _this.details.envirState),
							(_this.factoryCard = _this.details.factoryCard),
							(_this.fuelCode = _this.details.fuelCode),
							(_this.licenseColor = _this.details.licenseColor),
							(_this.mark = _this.details.mark),
							(_this.ownerInfo = _this.details.ownerInfo),
							(_this.pkid = _this.details.pkid),
							(_this.punish = _this.details.punish),
							(_this.registerPlace = _this.details.registerPlace),
							(_this.registerTime = _this.details.registerTime),
							(_this.remark = _this.details.remark);
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
	.top-none{
		border-top:none;
	}
</style>
