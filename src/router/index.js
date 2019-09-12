import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 数据管理 监察车辆信息
// import sjgls from '@/components/DataManagement/CheckCarIformation'
import CheckCarIformationDetialTC from '@/components/DataManagement/CheckCarIformationDetialTC'
import CheckCarIformationDetial from '@/components/DataManagement/CheckCarIformationDetial'
import NotRoadMechanicalTC from '@/components/DataManagement/NotRoadMechanicalTC'
import CarMajorUserTC from '@/components/DataManagement/CarMajorUserTC'

// 一企一档 行驶证信息
import GasStationTC from '@/components/OneCompanyAndOneFile/GasStationInformationTC'
import CarIformationTC from '@/components/OneCompanyAndOneFile/CarIformationTC'
// 统计分析
// 报表生成弹窗、台账生成弹窗
import ReportWindow from '@/components/StatisticalAnalysis/ReportWindow'
import AccountWindow from '@/components/StatisticalAnalysis/AccountWindow'
// 高排车辆挖掘
import ExcavateWindow from '@/components/VehicleMining/ExcavateWindow'
import  fasttb from '@/components/VehicleMining/SeriousOverStandardCar'
// 快速超标
//车辆结案
import cljaaTC from '@/components/VehicleSettlement/VehicleSettlementTC'

//监测模块
//环检线监测
import loopmont from '@/components/MonitorModule/LoopMonitoring'
import looptc from '@/components/MonitorModule/LoopMonitoringTC'
//遥感监测
import remote from '@/components/MonitorModule/RemoteSensingMonitoring'
import remotetc from '@/components/MonitorModule/RemoteSensingMonitoringTC'
// 监测数据对比
import monit from '@/components/MonitorModule/MonitoringAndContrast'

import head from '@/components/Head'

Vue.use(Router)

export default new Router({
	routes: [

		{
			path: '/CheckCarIformationDetialTC/:id',
			name: 'CheckCarIformationDetialTC',
			component: CheckCarIformationDetialTC,
		},
		{
			path: '/CheckCarIformationDetial',
			name: 'CheckCarIformationDetial',
			component: CheckCarIformationDetial,
		},
		{
			path: '/CarIformationTC/:id',
			name: 'CarIformationTC',
			component: CarIformationTC,
		},
		{
			path: '/NotRoadMechanicalTC/:id',
			name: 'NotRoadMechanicalTC',
			component: NotRoadMechanicalTC,
		},
		{
			path: '/CarMajorUserTC/:id',
			name: 'CarMajorUserTC',
			component: CarMajorUserTC,
		},

		//一企一档

		{
			path: '/GasStationTC/:id',
			name: 'GasStationTC',
			component: GasStationTC
		},
		
		
        // 统计分析
		{
			path: '/ReportWindow/:id',
			name: 'ReportWindow',
			component: ReportWindow
		},
		{
			path: '/AccountWindow/:id',
			name: 'AccountWindow',
			component: AccountWindow
		},
        // 高排车辆挖掘
		{
			path: '/ExcavateWindow/:id',
			name: 'ExcavateWindow',
			component: ExcavateWindow
		},

		{
			path: '/cljaaTC/:id',
			name: 'cljaaTC',
			component: cljaaTC
		},
		{
			path: '/fasttb',
			name: 'fasttb',
			component: fasttb
		},
		//监测模块
		{
			path: '/loopmont',
			name: 'loopmont',
			component: loopmont,
			meta: {
				keepAlive: true
			}
		},
		{
			path: '/remote',
			name: 'remote',
			component: remote,
		},
		{
			path: '/remotetc/:id',
			name: 'remotetc',
			component: remotetc,
		},
		{
			path: '/looptc/:id',
			name: 'looptc',
			component: looptc,
		},
		{
			path: '/monit',
			name: 'monit',
			component: monit
		},
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		},
		

	]
})