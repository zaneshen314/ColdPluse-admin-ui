import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Table } from 'antd'
import { getData } from '../../api/index'
import Echarts from '../../components/Echarts'
import './home.css'



const columns = [
  {
    title: 'Concert',
    dataIndex: 'name'
  },
  {
    title: 'Today Purchase',
    dataIndex: 'todayBuy'
  },
  {
    title: 'Month Purchase',
    dataIndex: 'monthBuy'
  },
  {
    title: 'Today Purchase',
    dataIndex: 'totalBuy'
  }
]
const Home = () => {
  const [echartsData, setEchartsData] = useState({})
  const userImg = require('../../assets/images/user.png')
  useEffect(() => {
    getData().then(({ data }) => {
      console.log(data)
      const { tableData, orderData, userData, videoData } = data.data
      console.log(tableData)

      setTableData(tableData)
      // 对Echart数据的处理
      const order = orderData
      // x轴的数据
      const xData = order.date
      // series数据
      const keyArr = Object.keys(order.data[0])

      const series = keyArr.map(key => {
        return {
          name: key,
          data: order.data.map(item => item[key]),
          type: 'line'
        }
      })
      console.log(series)
      setEchartsData({
        order: {
          xData,
          series
        },
        user: {
          xData: userData.map(item => item.date),
          series: [
            {
              name: '新增用户',
              data: userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: userData.map(item => item.active),
              type: 'bar'
            }
          ]
        },
        video: {
          series: [
            {
              data: videoData,
              type: 'pie'
            }
          ]
        }
      })
    })
    // 基于准备好的dom，初始化echarts实例
  }, [])
  // 定义table数据
  const [tableData, setTableData] = useState([])
  return (
    <>
      <Row className="home">
        <Col span={8}>
          <Card hoverable>
            <div className="user">
              <img alt="logo" src={userImg}></img>
              <div className="userinfo">
                <p className="name">Jason</p>
                <p className="access">Super Admin</p>
              </div>
            </div>
            <div className="login-info">
              <p>
                LoginTime: <span>2024-12-10</span>
              </p>
              <p>
                BASE: <span>ZhuHai</span>
              </p>
            </div>
          </Card>
          <Card hoverable style={{ marginTop: 20 }}>
            <Table dataSource={tableData} rowKey="name" pagination={false} columns={columns} />
          </Card>
        </Col>
        <Col span={15} offset={1}>



          <div className="graph">
            <Card hoverable>{echartsData.user && <Echarts chartData={echartsData.user} style={{ height: 280 }} />}</Card>
            <Card hoverable>
              {echartsData.video && <Echarts chartData={echartsData.video} isAxisChart={false} style={{ height: 280 }} />}
            </Card>
          </div>
          <Card hoverable>{echartsData.order && <Echarts chartData={echartsData.order} style={{ height: 280 }} />}</Card>
        </Col>
      </Row>
    </>
  )
}

export default Home
