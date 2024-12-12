import Mock from 'mockjs'

import permissionApi from './mockServeData/permission'
import homeApi from "./mockServeData/home";

Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu);

Mock.mock(/home\/getData/, homeApi.getStatisticalData);
