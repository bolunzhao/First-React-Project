import Mock from 'mockjs'
import homeApi from './mockServeData/home'

// Interception interface
Mock.mock(/home\/getData/, homeApi.getStatisticalData)