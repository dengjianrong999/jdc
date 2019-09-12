<!--测试一下-->
<template>

	<div class="jdc-tabs">
		<!-- 头部 -->
		<!-- nav -->
		<div>
			<div class="signBar">
				<!-- logo -->
				<div class="logo">
					<img src="../assets/images/logo_1920.png" alt="" ondragstart='return false;'>
					<img src="../assets/images/jidongche_1920.png" alt="" ondragstart='return false;'>
				</div>
				<!-- 退出登录 -->
				<div class="logo-login">
					<a>
						<img src="../assets/images/hede.png" alt=""> 管理员</a>
        	<!-- <a  href='http://124.42.41.43:9001/bjsy-sys/'> -->
          <a href='http://117.121.97.120:9001/bjsy-sys/'>
						<i class="icon iconfont icon-shouye3"></i> 首页导航</a>
					<a href='javascript:void(0)' @click="loginout()">
						<i class="icon iconfont icon-tuichu"></i> 退出</a>
				</div>
			</div>
			<!--导航菜单栏-->
			<div class="navigationBar">
				<ul class="First-navigationBar">
					<li v-for='(item,index) in data' :key="index">
						<a href="#" @click="tabInt(index,item)" :class="{isChecked: index === currentIndex}">
						   <i :class="item.icon"></i>
						     {{item.name}}
						   <div class="triangle"></div>
						</a>
						<ul class="Second-navigationBar">
						<li @click="tabInter(item,index,itm)" v-for='(itm,index) in item.childList' :key="index">
							<a :class="{isChecke: CurtIndex === itm.CurtIndex}">{{itm.name}}</a>
						</li>
						</ul>
					</li>
			  </ul>
			</div>
		</div>

		<!-- nav -->
		<div v-if="this.$route.name != 'monit'" class="content">
				<component :is="componentData"></component>
		</div>
	</div>

</template>

<script>
// 数据管理
// 引入数据管理子组件
import carCheckInfo from "./DataManagement/CheckCarIformationDetial";
import fdljxCheckInfo from "./DataManagement/NotRoadMechanical";
import carerCheckInfo from "./DataManagement/CarMajorUser";
// 引入一企一档子组件
import carInfoXSZ from "./OneCompanyAndOneFile/CarIformation";
import oilstationInfo from "./OneCompanyAndOneFile/GasStationInformation";
// 引入统计分析子组件
import formProducInfo from "./StatisticalAnalysis/ReportGeneration";
import ledgerProduceInfo from "./StatisticalAnalysis/AccountGeneration";
// 引入高排车辆信息子组件
import fastovercarInfo from "./VehicleMining/FastOverStandardCar";
import SeriousovercarInfo from "./VehicleMining/SeriousOverStandardCar";
// 引入车辆结案子组件
import carCase from "./VehicleSettlement/VehicleSettlement";

// 引入监测模块子组件
import JDCLoopInspection from "./MonitorModule/LoopMonitoring";
import Yghj from "./MonitorModule/MonitoringAndContrast";
import remotesensingInfo from "./MonitorModule/RemoteSensingMonitoring";
export default {
  name: "app",
  isShow: false,
  data() {
    return {
      routerName: "",
      currentIndex: 0,
      CurtIndex: 0,
      componentData: "carCheckInfo",
      data: []
    };
  },
  components: {
    // 声明子组件
    carCheckInfo,
    fdljxCheckInfo,
    carerCheckInfo,
    carInfoXSZ,
    oilstationInfo,
    formProducInfo,
    ledgerProduceInfo,
    fastovercarInfo,
    SeriousovercarInfo,
    carCase,
    remotesensingInfo,
    JDCLoopInspection,
    Yghj
  },
  mounted() {
    this.routerName = this.$route.name;
    //加载菜单页
    var _this = this;
    _this
      .$http({
        method: "get",
        // url: `${_this.baseurl.slice(0, 33)}/sys/menu/listJson`
        url: `${_this.baseurl.slice(0, 35)}/sys/menu/listJson`
      })
      .then(function(res) {
        if (res.status === 200 && res.data.status === "1") {
          _this.data = res.data.data[0].childList;
          console.log("this.data", _this.data);
          //组件和背景颜色
          _this.data.map((item, index) => {
            item.currentIndex = index;
            item.childList.map((ite, idx) => {
              ite.componentsName = ite.href.split("/")[2];
              ite.CurtIndex = ite.target;
            });
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        setTimeout(() => {
          layer.msg("加载异常", {
            icon: 2
          });
        }, 5000);
      });
  },
  watch: {
    routerName: function(newVal, oldVal) {
      if (newVal == "monit") {
        this.currentIndex = 5;
        this.CurtIndex = 12;
      }
      return;
    }
  },
  methods: {
    //退出登录
    	loginout() {
				this.$http
				     .get('http://117.121.97.120:9001/bjsy-sys/logout',{
					//  .get(`http://124.42.41.43:9001/bjsy-sys/logout`, {
						headers: {
							"Content-Type": "application/json;charset=UTF-8"
						}
					})
					.then(function(res) {
						// window.location.href ="http://124.42.41.43:9001/bjsy-sys/loginPage/index.html";
						window.location.href ="http://117.121.97.120:9001/bjsy-sys/loginPage/index.html";
					});
			},
    tabInter(item, index, itm) {
      this.$router.push({
        path: "/",
        name: "HelloWorld"
      });
      this.currentIndex = item.currentIndex;
      this.CurtIndex = itm.CurtIndex;
      console.log(this.CurtIndex);
      this.componentData = itm.componentsName;
    },
    tabInt(index, item) {
      // this.componentData = item.componentsName;
      // this.currentIndex = item.currentIndex;
      // console.log(item.currentIndex);
      // if (item.currentIndex == 4) {
      //     return;
      // } else {
      //     this.CurtIndex = item.items[0].CurtIndex;
      // }
    }
  }
};
</script>
<style scoped lang="less">
.jdc-tabs {
  min-width: 1000px;
} ///////头部背景
.signBar {
  width: 100%;
  height: 60px;
  background: url(../assets/images/header_1920.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
} // 导航栏
.navigationBar {
  min-width: 1000px;
  width: 100%;
  height: 36px;
  z-index: 1;
  border-bottom: 1px solid #029ad1;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  background-image: -moz-linear-gradient(
    90deg,
    rgb(241, 241, 241) 0%,
    rgb(248, 248, 248) 49%,
    rgb(255, 255, 255) 100%
  );
  background-image: -webkit-linear-gradient(
    90deg,
    rgb(241, 241, 241) 0%,
    rgb(248, 248, 248) 49%,
    rgb(255, 255, 255) 100%
  );
}

.navigationBar ul {
  position: absolute;
  z-index: 999;
}
.navigationBar > ul {
  min-width: 1000px;
}
.navigationBar ul,
.navigationBar li {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}

.First-navigationBar > li:nth-child(3) .iconfont {
  font-size: 18px !important;
}

.First-navigationBar > li:nth-child(6) .iconfont {
  font-size: 20px !important;
}

.First-navigationBar > li {
  position: relative;
  height: 35px;
  margin-left: 10px;
}

.First-navigationBar li:hover ul {
  display: inline-block;
}

.First-navigationBar > li > a {
  width: 100%;
  padding: 0 10px;
  line-height: 35px;
  color: #333 !important;
  text-align: center;
  display: inline-block;
}

.Second-navigationBar {
  width: 100%;
  left: 0;
  display: none;
  background: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}

.Second-navigationBar li {
  float: none;
  height: 32px;
  border-bottom: 1px solid #dbdbdb;
  border-top: none;
}

.Second-navigationBar li a {
  width: 100%;
  line-height: 32px;
  color: #333 !important;
  text-align: left;
  border-top: none;
  display: block;
  padding: 0 10px;
}

.First-navigationBar > li:hover > a,
.Second-navigationBar > li:hover a,
.First-navigationBar > li .isChecke,
.Second-navigationBar .isChecked,
.Second-navigationBar .isChecked a {
  color: #fff !important;
  height: 100%;
  background-color: rgb(0, 172, 234);
  background-image: -webkit-linear-gradient(
    90deg,
    rgb(0, 172, 234) 0%,
    rgb(117, 212, 246) 100%
  );
} //  小三角
.triangle {
  display: inline-block;
  width: 0px;
  height: 0px;
  border-width: 5px;
  border-top-width: 5px;
  border-bottom-width: 0;
  margin-bottom: 2px;
  border-style: solid;
  border-color: #999 transparent transparent transparent;
}

.First-navigationBar li:hover .triangle {
  border-color: #fff transparent transparent transparent;
}

.First-navigationBar > li .isChecke .triangle {
  border-color: #fff transparent transparent transparent;
}
</style>
