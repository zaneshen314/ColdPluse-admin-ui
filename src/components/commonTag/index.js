import React, { useEffect } from 'react'
import { Tag, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { removeMenuListItem, selectMenuList } from '../../store/reducers/tab'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuList from '../../config'
import './index.css'

const CommonTag = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const tabList = useSelector(state => state.tab.tabList)
  useEffect(() => {
    let data
    MenuList.forEach(item => {
      console.log(item.path, location.pathname)
      if (item.path === location.pathname) {
        data = item
      }
      if (item.children) {
        let child = item.children.find(i => {
          console.log(i, location.pathname)
          return i.path === location.pathname
        })
        if (child) {
          data = child
        }
      }
    })
    console.log(data)
    if (data) {
      dispatch(
        selectMenuList({
          label: data.label,
          name: data.name,
          path: data.path
        })
      )
    }
  }, [])
  const handleClose = e => {
    console.log(e, '000')

    dispatch(
      removeMenuListItem({
        name: e.name,
        path: e.url,
        label: e.label
      })
    )
  }
  return (
    <Space className="commonTag" size={[0, 8]} wrap>
      {tabList.map(item => {
        return (
          <Tag
            closeIcon={location.pathname !== item.path && item.path !== '/home'}
            onClick={() => navigate(item.path)}
            onClose={() => handleClose(item)}
            color={location.pathname === item.path ? '#3b5999' : ''}
            key={item.path}
          >
            {item.label}
          </Tag>
        )
      })}
    </Space>
  )
}

export default CommonTag
