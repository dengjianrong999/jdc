<!--台账生成弹窗-->
<template>
    <div class="main">
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>检查日期：</span>
            </div>
            <div class="value">
				<i class="el-input__icon el-icon-date"></i>
                <input type="text" placeholder="--请选择检查日期--" class="myinput" :disabled="disabledFlag" v-model="time" readonly="readonly" id="surface1">
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>类型：</span>
            </div>
            <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="types">
					<el-option v-for="item in lx" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>检查车辆：</span>
            </div>
            <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="checkCar">
					<el-option v-for="item in jccl" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>处罚车辆：</span>
            </div>
            <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="punishCar">
					<el-option v-for="item in cfcl" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>
        <div class="block">
            <div class="name">
                <i class="red_star">*</i>
                <span>劝返车辆：</span>
            </div>
            <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="exhortCar">
					<el-option v-for="item in qfcl" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>
        <div class="block">
            <div class="name">
                <span>遥测：</span>
            </div>
            <div class="value">
				<el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="telemetering">
					<el-option v-for="item in yc" :key="item.value" :label="item.value" :value="item.value">
					</el-option>
				</el-select>
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
        <div class="block">
        </div>
        <div class="remark topnone">
            <div class="name">
                <span>备注：</span>
            </div>
            <div class="value">
                <textarea type="text" class="myinput" :disabled="disabledFlag" v-model="remark"></textarea>
            </div>
        </div>
        <div class="foot" v-if="isShow">
            <div class="btn_wrap">
                <span class="btn_m btn_cancle" @click="cancle">取消</span>
            </div>
            <div class="btn_wrap left">
                <span class="btn_m btn_confirm" @click='saves()'>确认</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time: "",
                types: "",
                checkCar: "",
                punishCar: "",
                exhortCar: "",
				telemetering: "",
                pkid: Date.parse(new Date()),
                remark: "",
				operateNum:9,
				disabledFlag:false,
				isShow:true,
				frameIndex: 99999,
				jccl: [{ value: '路虎', }, { value: 'SUV', }, { value: '兰博基尼', }, { value: '奥迪', }, { value: '电动车', }],
				lx: [{ value: '轿车', }, { value: 'SUV', }, { value: '跑车', }, { value: '客车', }, { value: '电动车', }],
				cfcl: [{ value: '路虎', }, { value: 'SUV', }, { value: '兰博基尼', }, { value: '奥迪', }, { value: '电动车', }],
				qfcl: [{ value: '路虎', }, { value: 'SUV', }, { value: '兰博基尼', }, { value: '奥迪', }, { value: '电动车', }],
				yc: [{ value: '目测', }, { value: '仪测', }, { value: '手测', }],
				
				

            };
        },
        mounted() {
            this.getDetailData();
			//时间插件 
			let _this = this;
			setTimeout(function () {
				layui.use("laydate", function () {
					var laydate = layui.laydate;
					//执行一个laydate实例
					laydate.render({
						elem: "#surface1",
						type: "datetime",
						done: function (value) {
								_this.time = value;
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
			cancle() { // 关闭弹窗
				this.closeIframe();
			},
			closeIframe() { // 关闭弹窗
				this.frameIndex = parent.layer.getFrameIndex(window.name); //得到当前iframe层的索引
				parent.layer.close(this.frameIndex); //再执行关闭
			},
			
            showToggle: function (item) {
                item.isSubShow = !item.isSubShow;
            },
            saves() {
				let _this = this;
                if (this.operateNum === 999) { // 新增
                    this.pkid = Date.parse(new Date());
                }
                let submitFlag = true;
                let submitMC = true;
                console.log('pkid', this.pkid);
                var a = [
                    this.time,
                    this.types,
                    this.checkCar,
                    this.punishCar,
                    this.exhortCar,
                ]
                var b = [
                    '请填写检查日期',
                    '请填写类型',
                    '请填写检查车辆',
                    '请填写处罚车辆',
                    '请填写劝返车辆',
                ]
                for (var i = 0, l = a.length; i < l; i++) {
                    if (!a[i] || a[i].length == 0) {
                        submitFlag = false;
                        for (var j = i, len = b.length; j < len; j++) {
                            if (b[j]) {
                                submitMC = false;
                                layer.msg(b[j], {
                                    icon: 2
                                });
                                break;
                            }
                        }
                        break;
                    }
                }
                if (submitFlag) {
                    this.$http({
                        method: "post",
                        url: this.baseurl + "ledgerProduceInfo/save",
                        data: {
                            time: this.time,
                            types: this.types,
                            checkCar: this.checkCar,
                            punishCar: this.punishCar,
                            exhortCar: this.exhortCar,
							telemetering: this.telemetering,
                            pkid: this.pkid,
                            remark: this.remark
                        }
                    }).then(function (res) {
                        if (res.status === 200 && res.data.status === '1') {
                            layer.msg('保存成功！', {
                                icon: 1
                            });
							let timer = setTimeout(function () {
								_this.closeIframe();
								clearTimeout(timer);
							}, 1000);
                        }
                    });
                }
            },
            getDetailData() {
                // 操作 operateNum0详情 1修改
                let id = this.$route.params.id;
                let _this = this;
				console.log(id)

                if (id !== 'save') { // 不是新增 
                    this.operateNum = JSON.parse(sessionStorage.getItem('operateNum')); // 操作类型 0详情 1修改
                    id = id + '';
					console.log(this.operateNum)
                    if (this.operateNum === 0) { //0详情
                        this.disabledFlag = true;
						_this.isShow = false;
                    } else { // 修改
                        this.disabledFlag = false;
                    }
                    this.$http({
                            method: 'get',
                            url: `${this.baseurl}ledgerProduceInfo/data/${id}`
                        })
                        .then(function (res) {
                            if (res.status === 200 && res.data.status === '1') {
                                console.log(res.data.data)
                                let datas = res.data.data;
                                _this.details = res.data.data;
                                _this.checkCar = _this.details.checkCar;
                                _this.exhortCar = _this.details.exhortCar;
                                _this.pkid = _this.details.pkid;
                                _this.punishCar = _this.details.punishCar;
                                _this.remark = _this.details.remark;
                                _this.telemetering = _this.details.telemetering;
                                _this.time = _this.details.time;
                                _this.types = _this.details.types;
                            }
                        });
                }
            },
        }
    };
</script>

<style scoped="scoped" lang="less">
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
        width: 100px;
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

    .remark {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border: 1px solid #ededed;
    }

    .remark .value {
        display: flex;
    }

    .remark .value textarea {
        height: 80px;
        resize: none;
        padding-top: 5px;
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

    span {
        overflow: hidden;
        position: relative;
        .upload {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
        }
    }
    .topnone{
        border-top:none;
    }
</style>
