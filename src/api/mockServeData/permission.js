import Mock from 'mockjs'
const permission = {
    getMenu: config => {
        console.log(config);
            // 先判断用户是否存在
            // 判断账号和密码是否对应
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
                        path: '/ticket',
                        name: 'ticket',
                        label: 'TicketSetting',
                        icon: 'user',
                        url: 'User/index'
                    }
                ],
                token: Mock.Random.guid(),
                message: '获取成功'
            }
        }
    }
}
export default permission