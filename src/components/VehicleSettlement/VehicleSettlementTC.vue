<template>

    <div id="TC">
        <div class="main">
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>检查时间：</span>
                </div>
                <div class="value">
                    <i class="el-input__icon el-icon-date"></i>
                    <input type="text" placeholder="--请选择检查时间--" class="myinput" v-model="checkTime" :disabled="disabledFlag" readonly="readonly"
                        id="surface1">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>车型：</span>
                </div>
                <div class="value">
					<input type="text" class="myinput" v-model="carType" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>车号：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="carNumber" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>处罚日期：</span>
                </div>
                <div class="value">
                    <i class="el-input__icon el-icon-date"></i>
                    <input type="text" placeholder="--请选择处罚日期--" class="myinput" v-model="punishTime" :disabled="disabledFlag" readonly="readonly"
                        id="surface2">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>处罚地点：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="punishPlace" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>检查人员：</span>
                </div>
                <div class="value">
					<input type="text" class="myinput" v-model="checkPerson" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>上报时间：</span>
                </div>
                <div class="value">
                    <i class="el-input__icon el-icon-date"></i>
                    <input type="text" placeholder="--请选择上报时间--" class="myinput" v-model="reportTime" :disabled="disabledFlag" readonly="readonly"
                        id="surface3">
                </div>
            </div>
            <div class="block">
            </div>
            <div class="remark border-top">
                <div class="name">
                    <i class="red_star"></i>
                    <span>备注：</span>
                </div>
                <div class="value">
                    <textarea type="text" class="myinput" v-model="remark" :disabled="disabledFlag"></textarea>
                </div>
            </div>
            <div class="foot" v-show="isShow">
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
                checkTime: "",
                carType: "",
                carNumber: "",
                punishTime: "",
                punishPlace: "",
                checkPerson: "",
                reportTime: "",
                pkid: Date.parse(new Date()),
                remark: "",
                disabledFlag: false,
                isShow: true,
                frameIndex: 99999,
                cx: [{
                    value: '跑车',
                }, {
                    value: 'SUV',
                }, {
                    value: '轿车',
                }, {
                    value: '客车',
                }, {
                    value: '电动车',
                }],
                jcry: [{
                    value: '李晨',
                }, {
                    value: '李毅',
                }, {
                    value: '张亦',
                }, {
                    value: '李四',
                }, {
                    value: '王五',
                }],

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
                            _this.checkTime = value;
                        }
                    });
                    laydate.render({
                        elem: "#surface2",
                        type: "datetime",
                        done: function (value) {
                            _this.punishTime = value;
                        }
                    });
                    laydate.render({
                        elem: "#surface3",
                        type: "datetime",
                        done: function (value) {
                            _this.reportTime = value;
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
            saves() {
                let _this = this;
                let tempData = { // 需要验证非空的项
                    checkTime: this.checkTime,
                    carType: this.carType,
                    carNumber: this.carNumber,
                    punishTime: this.punishTime,
                    punishPlace: this.punishPlace,
                    checkPerson: this.checkPerson,
                    reportTime: this.reportTime
                };
                let key = this.isEmptyObjRtn(tempData); // 有空返回当前的key 否则返回false
                if (!key) {
                    this.$http({
                        method: "post",
                        url: this.baseurl + "carCase/save",
                        data: {
                            checkTime: this.checkTime,
                            carType: this.carType,
                            carNumber: this.carNumber,
                            punishTime: this.punishTime,
                            punishPlace: this.punishPlace,
                            checkPerson: this.checkPerson,
                            reportTime: this.reportTime,
                            pkid: this.pkid,
                            remark: this.remark
                        }
                    }).then((res) => {
                        console.log(res)
                        if (res.status === 200 && res.data.status === '1') {
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
                        checkTime: '检查时间',
                        carType: '车型',
                        carNumber: '车号',
                        punishTime: '处罚日期',
                        punishPlace: '处罚地点',
                        checkPerson: '检查人员',
                        reportTime: '上报时间'
                    }
                    for (let i in dataName) {
                        if (key === i) {
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

                if (id !== 'add') { // 不是新增 
                    this.operateNum = JSON.parse(sessionStorage.getItem('operateNum')); // 操作类型 0详情 1修改
                    id = id + '';
                    if (this.operateNum === 0) { //0详情
                        this.disabledFlag = true;
                        this.isShow = false;
                    } else { // 修改
                        this.disabledFlag = false;
                    }
                    _this.$http
                        .get(_this.baseurl + "carCase/data/" + id)
                        .then(function (res) {
                            if (res.status === 200 || res.data.data.status === 1)
                                _this.details = res.data.data;
                            (_this.carNumber = _this.details.carNumber),
                            (_this.carType = _this.details.carType),
                            (_this.checkPerson = _this.details.checkPerson),
                            (_this.checkTime = _this.details.checkTime),
                            (_this.pkid = _this.details.pkid);
                            _this.punishPlace = _this.details.punishPlace;
                            _this.punishTime = _this.details.punishTime;
                            _this.remark = _this.details.remark;
                            _this.reportTime = _this.details.reportTime;
                        });
                }
            },
            isEmptyObjRtn(obj) { //循环对象 有空返回该项key 否则返回false
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
    .border-top{
        border-top:none;
    }
</style>
