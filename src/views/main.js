// import React, { useState } from 'react';
import React from 'react'
import CommonAside from '../components/commonAside'
import CommonHeader from '../components/commonHeader'
import CommonTag from '../components/commonTag'
import { RouterAuth } from '../router/routerAuth'
import { Outlet } from 'react-router-dom'
import '../api/mock'

import { Layout, theme } from 'antd'
import { useSelector } from 'react-redux'

const { Content } = Layout

const Main = () => {
  // const [collapsed, setCollapsed]=useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const collapsed = useSelector(state => state.tab.isCollapse)

  return (
    <RouterAuth>
      <Layout className="main-container">
        <CommonAside collapsed={collapsed} />
        <Layout>
          <CommonHeader collapsed={collapsed} /> <CommonTag />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </RouterAuth>
  )
}

export default Main
