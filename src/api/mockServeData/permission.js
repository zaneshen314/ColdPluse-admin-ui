import Mock from 'mockjs'
const permission = {
    getMenu: config => {
        console.log(config);
        const { username, password } = JSON.parse(config.body)
            // 先判断用户是否存在
            // 判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [{
                            path: '/home',
                            name: 'home',
                            label: 'Home',
                            icon: 's-home',
                            url: 'home/index'
                        },
                        {
                            path: '/mall',
                            name: 'mall',
                            label: ' welfare',
                            icon: 'video-play',
                            url: 'mall/index'
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: 'User',
                            icon: 'user',
                            url: 'User/index'
                        },
                        {
                            label: 'Other',
                            icon: 'location',
                            children: [{
                                    path: '/page1',
                                    name: 'page1',
                                    label: 'page1',
                                    icon: 'setting',
                                    url: 'other/pageOne.vue'
                                },
                                {
                                    path: '/page2',
                                    name: 'page2',
                                    label: 'page2',
                                    icon: 'setting',
                                    url: 'other/pageTwo.vue'
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }

    }
}
export default permission