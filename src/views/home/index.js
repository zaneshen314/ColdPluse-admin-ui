import React from 'react'
import { Col, Row, Card } from 'antd'
import './home.css'

const Home = () => {
  const userImg = require('../../assets/images/user.png')
  return (
    <>
      <Row className="home">
        <Col span={8}>
          <Card hoverable>
            <div className="user">
              <img alt="logo" src={userImg}></img>
              <div className="userinfo">
                <p className="name">Zane</p>
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
        </Col>
      </Row>
    </>
  )
}

export default Home
