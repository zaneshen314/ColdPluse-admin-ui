// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = []

const homeApi = {
    getStatisticalData: () => {
        //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    Concert1: Mock.Random.float(100, 8000, 0, 0),
                    Concert2: Mock.Random.float(100, 8000, 0, 0),
                    Concert3: Mock.Random.float(100, 8000, 0, 0),
                    Concert4: Mock.Random.float(100, 8000, 0, 0),
                    Concert5: Mock.Random.float(100, 8000, 0, 0),
                    Concert6: Mock.Random.float(100, 8000, 0, 0)
                })
            )
        }
        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [{
                        name: '16-20',
                        value: 2999
                    },
                    {
                        name: '25-30',
                        value: 5999
                    },
                    {
                        name: '35-40',
                        value: 1500
                    },
                    {
                        name: '40-50',
                        value: 1999
                    },
                    {
                        name: '50-60',
                        value: 2200
                    },
                    {
                        name: '60-70',
                        value: 4500
                    }
                ],
                // 柱状图
                userData: [{
                        date: 'Monday',
                        new: 5,
                        active: 200
                    },
                    {
                        date: 'Tuesday',
                        new: 10,
                        active: 500
                    },
                    {
                        date: 'Wednesday',
                        new: 12,
                        active: 550
                    },
                    {
                        date: 'Thursday',
                        new: 60,
                        active: 800
                    },
                    {
                        date: 'Friday',
                        new: 65,
                        active: 550
                    },
                    {
                        date: 'Saturday',
                        new: 53,
                        active: 770
                    },
                    {
                        date: 'Sunday',
                        new: 33,
                        active: 170
                    }
                ],
                // 折线图
                orderData: {
                    date: ['202303', '202306', '202309', '202312', '202403', '20406', '202409'],
                    data: List
                },
                tableData: [{
                        name: 'New York',
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: 'London',
                        todayBuy: 300,
                        monthBuy: 2200,
                        totalBuy: 24000
                    },
                    {
                        name: 'Tokyo',
                        todayBuy: 800,
                        monthBuy: 4500,
                        totalBuy: 65000
                    },
                    {
                        name: 'Paris',
                        todayBuy: 1200,
                        monthBuy: 6500,
                        totalBuy: 45000
                    },
                    {
                        name: 'Sydney',
                        todayBuy: 300,
                        monthBuy: 2000,
                        totalBuy: 34000
                    },
                    {
                        name: 'Zhuhai',
                        todayBuy: 350,
                        monthBuy: 3000,
                        totalBuy: 22000
                    }
                ]
            }
        }
    }
}
export default homeApi