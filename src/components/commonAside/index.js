import React from 'react'
import MenuList from '../../config'
import * as Icons from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { useDispatch } from 'react-redux'
import { selectMenuList } from '../../store/reducers/tab'
const { Sider } = Layout

// 动态获取icon
const iconToElement = name => React.createElement(Icons[name])
// 处理菜单的数据
const items = MenuList.map(item => {
  // 没有子菜单
  const child = {
    key: item.path,
    icon: iconToElement(item.icon),
    label: item.label
  }
  //有子菜单
  if (item.children) {
    child.children = item.children.map(item => {
      return {
        key: item.path,
        label: item.label
      }
    })
  }
  return child
})

const CommonAside = ({ collapsed }) => {
  const location = useLocation()


  const navigate = useNavigate()
  const dispath = useDispatch()

  // 添加数据到store
  const setTabList = data => {
    dispath(selectMenuList(data))
  }

  const selectMenu = info => {
    let data
    MenuList.forEach(item => {
      if (item.path === info.keyPath[info.keyPath.length - 1]) {
        data = item
        if (info.keyPath.length > 1) {
          data = item.children.find(child => {
            return child.path === info.key
          })
        }
      }
    })
    console.log(data,'datadatadatadatadata');
    
    setTabList({
      label: data.label,
      name: data.name,
      path: data.path
    })
    console.log(info)
    const { key } = info
    navigate(key)
  }
  console.log(collapsed, 'CommonAside')
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className="app-name"> {collapsed ? 'ColdPulse' : 'ColdPulse Manager'} </h3>
      <Menu
        theme="dark"
        mode="inline"
        style={{
          height: '100%'
        }}
        defaultSelectedKeys={[location.pathname]}
        items={items}
        onClick={selectMenu}
      />
    </Sider>
  )
}

export default CommonAside
