<template>

    <div class="jdc-tabs">


        <!-- 头部 -->
        <!-- nav -->
        <div class="jdc-nav">

            <!-- logo -->
            <div class="logo">
                <img src="../../assets/images/logo.png" alt="" ondragstart='return false;'>
                <img src="../../assets/images/text.png" alt="" ondragstart='return false;'>
            </div>
            <!-- 数据管理 ... 车辆结案 -->
            <div class="nav-sort">
                <!-- 数据管理 -->
                <router-link :to="{path:'sjgls'}">
                    <div class="sjgl">
                        <i class="iconfont icon-shujuguanli2"></i>
                        <div class="title">数据管理</div>
                    </div>
                </router-link>
                <!-- 一企一档 -->
                <router-link :to="{path:'yqydd'}">
                    <div class="yqyd active">
                        <i class="iconfont icon-qiye-copy-copy"></i>
                        <div class="title">一企一档</div>
                    </div>
                </router-link>
                <!-- 统计分析-->
                <router-link :to="{path:'tjfxs'}">
                    <div class="tjfx">
                        <i class="iconfont icon-tj3"></i>
                        <div class="title">统计分析</div>
                    </div>
                </router-link>
                <!-- 高排车辆挖掘-->
                <router-link :to="{path:'gpclwjs'}">
                    <div class="clwj">
                        <i class="iconfont icon-guzhangche"></i>
                        <div class="title">高排车辆挖掘</div>
                    </div>
                </router-link>
                <!-- 车辆结案-->
                <router-link :to="{path:'cljaa'}">
                    <div class="clja">
                        <i class="iconfont icon-xiangmujiean"></i>
                        <div class="title">车辆结案</div>
                    </div>
                </router-link>

            </div>

            <!-- 退出登录 -->
            <div class="out-login">
                <img src="../../assets/images/hede.png" alt="" ondragstart='return false;'>
                <span>退出登录</span>
            </div>
        </div>
        <!-- nav -->
        <div class="content">
            <!-- 左侧边栏 -->
            <div class="content-left">
                <ul class="tab-ul">
                    <li v-for="(item,index) in this.Items" :key='index' :class="{isCheck: item.status === current}" @click="tabClick(item.status)">
                        {{item.title}}
                    </li>
                </ul>
            </div>

            <div class="content-right">
                <div class="labei-tabs">
                    <!--左-->
                    <div class="tabs-left">
                        <ul id="ul-label">
                            <li class="Navigation">
                                <span class="glyphicon glyphicon-backward"></span>
                            </li>
                            <li v-for="(item,index) in this.tempData" @click="tab(index,item.status)" :key='index' :class="{isCheck: item.status === current}">
                                <span>{{item.title}}
                                    <i class="icon iconfont icon-guanbi" @click.stop="close(index,item.status)"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <!--右-->
                    <div class="tabs-right">
                        <ul>
                            <li class="Navigation">
                                <span class="glyphicon glyphicon-forward"></span>
                            </li>
                            <li class="closeAll" @click="closeAll()">
                                <span class="">关闭操作</span>
                            </li>
                            <li class="Navigation">
                                <span class="glyphicon glyphicon-play"></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <keep-alive>
                    <component :is="componentData"></component>

                </keep-alive>

            </div>
        </div>




    </div>

</template>

<script>
    // 引入子组件
    import carinformation from "./CarIformation";
    import gasstation from "./GasStationInformation";
    export default {
        name: "app",
        data() {
            return {
                componentData: "carinformation",
                current: 0,
                Items: [{
                        title: "车辆信息管理",
                        isChecked: true,
                        status: 0,
                        componentsName: "carinformation"
                    },
                    {
                        title: "加油站信息",
                        isChecked: false,
                        status: 1,
                        componentsName: "gasstation"
                    }
                ],
                tempData: [{
                    title: "车辆信息管理",
                    isChecked: true,
                    status: 0,
                    componentsName: "carinformation"
                }]
            };
        },
        components: {
            // 声明子组件
            carinformation,
            gasstation
        },
        methods: {
            tabClick: function (index) {
                if (this.current === index) return;
                this.current = index;
                this.componentData = this.Items[index].componentsName;
            },
        }
    };
</script>
<style scoped lang="less">
    /*左侧栏*/

    .tab-ul {
        width: 100%;
        padding-left: 0px;
    }

    .tab-ul li {
        width: 100%;
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        text-align: left;
        padding-left: 8%;
        color: #111111;
    }

    @font-face {
        font-family: "iconfont";
        src: url("../../../static/font_sy/iconfont.eot");
        src: url("../../../static/font_sy/iconfont.eot?#iefix") format("embedded-opentype"),
        url("../../../static/font_sy/iconfont.woff") format("woff"),
        url("../../../static/font_sy/iconfont.ttf") format("truetype"),
        url("../../../static/font_sy/iconfont.svg#iconfont") format("svg");
    }

    .tab-ul li:before {
        font-family: "iconfont" !important;
        font-size: 20px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        content: "\e659";
    }

    .tab-ul li:nth-child(2):before {
        content: "\e606";
    }

    .tab-ul li:nth-child(3):before {
        content: "\e600";
    }

    .tab-ul li:hover {
        cursor: pointer;
    }

    .tab-ul .isCheck {
        background: -webkit-linear-gradient( left,
        #00acea,
        #75d4f6);
        /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient( right,
        #00acea,
        #75d4f6);
        /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient( right,
        #00acea,
        #75d4f6);
        /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #00acea, #75d4f6);
        /* 标准的语法 */
        color: #ffffff;
    }

    .tab-ul .isCheck:before {
        color: #f0f0f0;
    }
    /*内容*/

    .content {
        width: 100%;
    }

    .content-left {
        float: left;
        width: 15%;
        background: #f6f7f8;
        border-right: #dbdbdb solid 1px;
        height: -moz-calc(100vh - 70px);
        height: -webkit-calc(100vh - 70px);
        height: calc(100vh - 70px) !important;
    }

    .content-right {
        margin: 0;
        padding: 0;
        float: left;
        width: 85%;
        height: -moz-calc(100vh - 70px);
        height: -webkit-calc(100vh - 70px);
        height: calc(100vh - 70px) !important;
    }
    /*右侧内容*/
    /*定位位置*/

    .labei-tabs {
        width: 100%;
        height: 36px;
        border-bottom: 1px solid #029ad1;
        display: flex;
        justify-content: space-between;
    }

    .Navigation {
        width: 36px !important;
        color: #c8c7c7 !important;
    }

    .glyphicon {
        color: #c8c7c7 !important;
    }
    /*左*/

    .tabs-left ul li {
        padding: 0px 5px;
        float: left;
        height: 35px;
        line-height: 35px;
        color: #029ad1;
        border-right: 1px solid #c8c7c7;
        background: #fff;
        cursor: pointer;
    }

    .tabs-left ul li.isCheck {
        color: #ffffff;
        border-right: 1px solid #c8c7c7;
        background: #029ad1;
    }

    .tabs-left ul li:nth-child(1) {
        background: none;
    }

    .tabs-right ul li {
        width: 120px;
        float: left;
        line-height: 36px;
        border-left: 1px solid #c8c7c7;
    }
    /*右*/

    .closeAll {
        cursor: pointer;
    } // 导航样式
    .jdc-nav {
        height: 70px;
        width: 100%;
        background: url("../../assets/images/header_1920.png");
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        .logo {
            width: 40%;
            height: 100%;
            display: flex;
            align-items: center;
            padding-left: 20px;
            img:nth-child(1) {
                width: 55px;
                margin-right: 14px;
            }
            img:nth-child(2) {
                height: 35px;
            }
        }
        .nav-sort {
            width: 45%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            a {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 20%;
                height: 100%;
                .active {
                    background: -webkit-linear-gradient( #75d4f6,
                    #00acea);
                    /* Safari 5.1 - 6.0 */
                    background: -o-linear-gradient( #75d4f6,
                    #00acea);
                    /* Opera 11.1 - 12.0 */
                    background: -moz-linear-gradient( #75d4f6,
                    #00acea);
                    /* Firefox 3.6 - 15 */
                    background: linear-gradient(#75d4f6, #00acea);
                    color: #fff;
                    /* 标准的语法 */
                }
                &>div {
                    width: 99%;
                    height: 100%;
                    div {
                        height: 50%;
                        line-height: 200%;
                        color: #333;
                    }
                    i {
                        display: block;
                        height: 30%;
                        font-size: 22px;
                        margin-top: 12px;
                    }
                }
                .yqyd {
                    div {
                        color: #fff;
                    }
                    i {
                        color: #fff;
                    }
                }
            }
        }
        .out-login {
            height: 100%;
            display: flex;
            align-items: center;
            padding-right: 20px;
            cursor: pointer;
            img {
                width: 40px;
                height: 40px;
                border-radius: 25px;
                margin-right: 10px;
            }
            span {
                font: 14px "microsoft yahei";
                color: #186fb0;
            }
        }
    } // 导航样式
</style>
