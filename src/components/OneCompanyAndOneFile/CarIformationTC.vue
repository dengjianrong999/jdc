<template>

    <div id="TC">
        <div class="main">
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>车牌号码：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="carNumber" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
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
                    <i class="red_star">*</i>
                    <span>号牌类别：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="cardType" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>所有人：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="owner">
                        <el-option v-for="item in syr" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
                    <span>车辆类型：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="carType">
                        <el-option v-for="item in cllx" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>车辆详细类型：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="carInfo" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>住址/是否本当初：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="address">
                        <el-option v-for="item in sfbdc" :key="item.value" :label="item.value" :value="item.value">
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
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="userNature">
                        <el-option v-for="item in syxz" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>车辆品牌：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="carStyle">
                        <el-option v-for="item in clpp" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star">*</i>
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
                    <i class="red_star">*</i>
                    <span>车辆识别码：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="carCode" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>发动机编号：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="engineNumber">
                        <el-option v-for="item in fdjbh" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>车辆注册日期：</span>
                </div>
                <div class="value">
                    <i class="el-input__icon el-icon-date"></i>
                    <input type="text" placeholder="--请选择车辆注册日期--" class="myinput" v-model="carRegisterTime" :disabled="disabledFlag" readonly="readonly"
                        id="surface1">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>核定载客：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="takeNumber" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>最大总质量：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="maxQuality" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>整备质量：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="wholeQuality" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>核定载质量：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="ratifiedQuality" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>国产/进口：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="isImported">
                        <el-option v-for="item in gcjk" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>发动机型号：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="engineVersion">
                        <el-option v-for="item in fdjxh" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>排量/额定功率：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="ratedPower" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>燃料种类：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="burnType">
                        <el-option v-for="item in rlzl" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>是否双燃料车：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="burnType" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>额定转速：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="ratedSpeed" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>制造厂名称：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="producerName" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>车辆出厂日期：</span>
                </div>
                <div class="value">
                    <i class="el-input__icon el-icon-date"></i>
                    <input type="text" placeholder="--请选择车辆出厂日期--" class="myinput" v-model="producerTime" :disabled="disabledFlag" readonly="readonly"
                        id="surface2">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>里程表读数：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="pumpVersion">
                        <el-option v-for="item in lcbds" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>燃油泵型式：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="inletMethod">
                        <el-option v-for="item in rybxs" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>进气方式：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="inletMethod">
                        <el-option v-for="item in jqfs" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>供油方式：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="diverMethod">
                        <el-option v-for="item in gyfs" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>变数器型式：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="gearboxVersion">
                        <el-option v-for="item in bsqxs" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>燃料规格：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="fuelFormat">
                        <el-option v-for="item in rlgg" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>委托年审号：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="annualTrialNo" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>发动机类型：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="engineType">
                        <el-option v-for="item in fdjlx" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>车辆种类：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="carStyle">
                        <el-option v-for="item in clzl" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>车主证件名称：</span>
                </div>
                <div class="value">
                    <el-select filterable placeholder="--请选择--" :disabled="disabledFlag" v-model="carerCardName">
                        <el-option v-for="item in czzjmc" :key="item.value" :label="item.value" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>车主证件号码：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="carerCardNo" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>车主联系电话：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="carerPhone" :disabled="disabledFlag">
                </div>
            </div>

            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>代办人姓名：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="agentName" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>代办人身份证号码：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="agentIdcardNo" :disabled="disabledFlag">
                </div>
            </div>
            <div class="block">
                <div class="name">
                    <i class="red_star"></i>
                    <span>代办人电话：</span>
                </div>
                <div class="value">
                    <input type="text" class="myinput" v-model="agentPhone" :disabled="disabledFlag">
                </div>
            </div>
            <div class="remark top-none">
                <div class="name">
                    <i class="red_star"></i>
                    <span>备注：</span>
                </div>
                <div class="value">
                    <textarea type="text" class="myinput" v-model="remark" :disabled="disabledFlag"></textarea>
                </div>
            </div>
            <div class="foot" v-show='isShow'>
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
                address: "",
                agentIdcardNo: "",
                agentName: "",
                agentPhone: "",
                annualTrialNo: "",
                burnType: "",
                carBrand: "",
                carCode: "",
                carInfo: "",
                carNumber: "",
                carRegisterTime: "",
                carStyle: "",
                carType: "",
                carVersion: "",
                cardColor: "",
                cardType: "",
                carerCardName: "",
                carerCardNo: "",
                carerPhone: "",
                diverMethod: "",
                engineNumber: "",
                engineType: "",
                engineVersion: "",
                fuelFormat: "",
                gearboxVersion: "",
                inletMethod: "",
                isDoubleBurn: "",
                isImported: "",
                maxQuality: 0,
                odometerNum: 0,
                oilOfferMethod: "",
                owner: "",
                pkid: Date.parse(new Date()),
                producerName: "",
                producerTime: "",
                pumpVersion: "",
                ratedPower: "",
                ratedSpeed: "",
                ratifiedQuality: 0,
                remark: "",
                takeNumber: 0,
                userNature: "",
                wholeQuality: 0,
                disabledFlag: false,
                isShow: true,
                frameIndex: 99999,
                cllx: [{
                    value: '电动车'
                }, {
                    value: '跑车'
                }, {
                    value: 'SUV'
                }, {
                    value: 'Aventador'
                }, {
                    value: '兰博基尼'
                }],
                cpys: [{
                    value: '金色'
                }, {
                    value: '白色'
                }, {
                    value: '黑色'
                }, {
                    value: '蓝色'
                }, {
                    value: '粉红色'
                }],
                syr: [{
                    value: '所有人'
                }, {
                    value: '张一山'
                }, {
                    value: '范冰冰'
                }, {
                    value: '李晨'
                }, {
                    value: '鹿晗'
                }],
                sfbdc: [{
                    value: '北京市顺义区'
                }, {
                    value: '北京路'
                }, {
                    value: '环保街区'
                }, {
                    value: '第一大道'
                }, {
                    value: '棠溪道路'
                }],
                syxz: [{
                    value: '上班'
                }, {
                    value: '自用'
                }, {
                    value: '自己用'
                }, {
                    value: '景区'
                }, {
                    value: '工程'
                }],
                clpp: [{
                    value: '轿车'
                }, {
                    value: '客车'
                }, {
                    value: '动车'
                }, {
                    value: '电动车'
                }, {
                    value: '自行车'
                }],
                clxh: [{
                    value: '本田'
                }, {
                    value: '别克威朗'
                }],
                fdjbh: [{
                    value: '746871345'
                }, {
                    value: '234532532'
                }, {
                    value: '45323452345'
                }, {
                    value: '3452345'
                }, {
                    value: '234523452'
                }],
                gcjk: [{
                    value: '国产'
                }, {
                    value: '进口'
                }],
                fdjxh: [{
                    value: '34252345'
                }, {
                    value: '2345'
                }, {
                    value: '3452345'
                }, {
                    value: '23452345'
                }, {
                    value: '234534523'
                }],
                rlzl: [{
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
                lcbds: [{
                    value: '内置式'
                }, {
                    value: '外置式'
                }],
                rybxs: [{
                    value: '增压吸气'
                }, {
                    value: '减压吸气'
                }, {
                    value: '增压吹气'
                }, {
                    value: '减压吹气'
                }],
                jqfs: [{
                    value: '增压吸气'
                }, {
                    value: '减压吸气'
                }, {
                    value: '增压吹气'
                }, {
                    value: '减压吹气'
                }],
                gyfs: [{
                    value: '四轮驱动'
                }, {
                    value: '前四后八'
                }, {
                    value: '两轮驱动'
                }],
                bsqxs: [{
                    value: '有级式变速器'
                }, {
                    value: '无级式变速器'
                }, {
                    value: '超级变速器'
                }],
                rlgg: [{
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
                fdjlx: [{
                    value: 'W型发动机'
                }, {
                    value: 'F型发动机'
                }, {
                    value: 'X型发动机'
                }, {
                    value: 'Q型发动机'
                }],
                clzl: [{
                    value: '电动车'
                }, {
                    value: '跑车'
                }, {
                    value: 'SUV'
                }, {
                    value: 'Aventador'
                }, {
                    value: '兰博基尼'
                }],
                czzjmc: [{
                    value: '身份证'
                }, {
                    value: '驾驶证'
                }, {
                    value: '军人证'
                }, {
                    value: '退伍证'
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
                            _this.carRegisterTime = value;
                        }
                    });
                    laydate.render({
                        elem: "#surface2",
                        type: "datetime",
                        done: function (value) {
                            _this.producerTime = value;
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
                    carNumber: this.carNumber,
                    cardType: this.cardType,
                    owner: this.owner,
                    carType: this.carType,
                    userNature: this.userNature,
                    carVersion: this.carVersion,
                    carCode: this.carCode
                };
                let key = this.isEmptyObjRtn(tempData); // 有空返回当前的key 否则返回false
                if (!key) {

                    this.$http({
                        method: "post",
                        url: this.baseurl + "carInfoCZ/save",
                        data: {
                            address: this.address,
                            pkid: this.pkid,
                            agentIdcardNo: this.agentIdcardNo,
                            agentName: this.agentName,
                            agentPhone: this.agentPhone,
                            annualTrialNo: this.annualTrialNo,
                            burnType: this.burnType,
                            carBrand: this.carBrand,
                            carCode: this.carCode,
                            carInfo: this.carInfo,
                            carNumber: this.carNumber,
                            carRegisterTime: this.carRegisterTime,
                            carStyle: this.carStyle,
                            carType: this.carType,
                            carVersion: this.carVersion,
                            cardColor: this.cardColor,
                            cardType: this.cardType,
                            carerCardName: this.carerCardName,
                            carerCardNo: this.carerCardNo,
                            carerPhone: this.carerPhone,
                            diverMethod: this.diverMethod,
                            engineNumber: this.engineNumber,
                            engineType: this.engineType,
                            engineVersion: this.engineVersion,
                            fuelFormat: this.fuelFormat,
                            gearboxVersion: this.gearboxVersion,
                            inletMethod: this.inletMethod,
                            isDoubleBurn: this.isDoubleBurn,
                            isImported: this.isImported,
                            maxQuality: this.maxQuality,
                            odometerNum: this.odometerNum,
                            oilOfferMethod: this.oilOfferMethod,
                            owner: this.owner,
                            producerName: this.producerName,
                            producerTime: this.producerTime,
                            pumpVersion: this.pumpVersion,
                            ratedPower: this.ratedPower,
                            ratedSpeed: this.ratedSpeed,
                            ratifiedQuality: this.ratifiedQuality,
                            remark: this.remark,
                            takeNumber: this.takeNumber,
                            userNature: this.userNature,
                            wholeQuality: this.wholeQuality,

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
                        carNumber: '车牌号码',
                        cardType: '号牌类别',
                        owner: '所有人',
                        carType: '车辆类型',
                        userNature: '使用性质',
                        carVersion: '车辆型号',
                        carCode: '车辆识别码'
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
                        _this.isShow = false;

                    } else { // 修改
                        this.disabledFlag = false;
                    }
                    _this.$http
                        .get(_this.baseurl + "carInfoXSZ/data/" + id)
                        .then(function (res) {
                            if (res.status == 200 || res.data.data.status == 1)
                                _this.details = res.data.data;
                            (_this.address = _this.details.address),
                            (_this.agentIdcardNo = _this.details.agentIdcardNo),
                            (_this.agentName = _this.details.agentName),
                            (_this.agentPhone = _this.details.agentPhone),
                            (_this.burnType = _this.details.burnType),
                            (_this.annualTrialNo = _this.details.annualTrialNo),
                            (_this.carBrand = _this.details.carBrand),
                            (_this.carCode = _this.details.carCode),
                            (_this.carInfo = _this.details.carInfo),
                            (_this.carNumber = _this.details.carNumber),
                            (_this.carRegisterTime = _this.details.carRegisterTime),
                            (_this.carStyle = _this.details.carStyle),
                            (_this.carType = _this.details.carType),
                            (_this.carVersion = _this.details.carVersion),
                            (_this.cardColor = _this.details.cardColor),
                            (_this.cardType = _this.details.cardType),
                            (_this.carerCardName = _this.details.carerCardName),
                            (_this.carerCardNo = _this.details.carerCardNo),
                            (_this.carerPhone = _this.details.carerPhone),
                            (_this.diverMethod = _this.details.diverMethod),
                            (_this.engineNumber = _this.details.engineNumber),
                            (_this.engineType = _this.details.engineType),
                            (_this.engineVersion = _this.details.engineVersion),
                            (_this.fuelFormat = _this.details.fuelFormat),
                            (_this.gearboxVersion = _this.details.gearboxVersion),
                            (_this.inletMethod = _this.details.inletMethod),
                            (_this.isDoubleBurn = _this.details.isDoubleBurn),
                            (_this.isImported = _this.details.isImported),
                            (_this.maxQuality = _this.details.maxQuality),
                            (_this.odometerNum = _this.details.odometerNum),
                            (_this.oilOfferMethod = _this.details.oilOfferMethod),
                            (_this.owner = _this.details.owner),
                            (_this.producerName = _this.details.producerName),
                            (_this.producerTime = _this.details.producerTime),
                            (_this.pumpVersion = _this.details.pumpVersion),
                            (_this.ratedPower = _this.details.ratedPower),
                            (_this.ratedSpeed = _this.details.ratedSpeed),
                            (_this.ratifiedQuality = _this.details.ratifiedQuality),
                            (_this.remark = _this.details.remark),
                            (_this.takeNumber = _this.details.takeNumber),
                            (_this.userNature = _this.details.userNature),
                            (_this.wholeQuality = _this.details.wholeQuality),
                            (_this.pkid = _this.details.pkid)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .main {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        max-height: 90vh;
        overflow: auto;
        padding-bottom: 30px;
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
        border-top: none;
    }
</style>
