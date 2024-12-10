import Mock from 'mockjs'

import permissionApi from './mockServeData/permission'

Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu);
