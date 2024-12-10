import React, { useState } from 'react'

import { Layout, Button, Avatar, Dropdown, Space } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collapseMenu } from '../../store/reducers/tab'
const { Header } = Layout
// 动态获取icon
const CommonHeader = ({ collapsed }) => {
  const navigate = useNavigate()
  const logout = () => {
    console.log('退出登录')
    localStorage.removeItem('token')
    // 重定向
    navigate('/login', { replace: true })
  }
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Center
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a onClick={() => logout()} target="_blank" rel="noopener noreferrer">
          Logout
        </a>
      )
    }
  ]
  // 创建useDispatch
  const dispath = useDispatch()
  // 点击展开收起按钮
  const setCollapsed = () => {
    // dispath
    dispath(collapseMenu())
    console.log(collapsed)
  }

  // const [collapsed, setCollapsed]=useState(false);
  return (
    <Header className="header-container">
      <Button
        onClick={setCollapsed}
        type="info"
        style={{
          fontSize: '16px',
          width: 64,
          height: 32,
          backgroundColor: '#fff'
        }}
        icon={<MenuFoldOutlined />}
      />

      <Dropdown
        menu={{
          items
        }}
      >
        <a onClick={e => e.preventDefault()}>
          <Space>
            <Avatar src={<img alt="logo" src={require('../../assets/images/user.png')} />} size={36} />
          </Space>
        </a>
      </Dropdown>
    </Header>
  )
}

export default CommonHeader
