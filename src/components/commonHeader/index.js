import React from 'react'
import { Layout, Button, Avatar, Dropdown, Space } from 'antd'
import { MenuFoldOutlined } from '@ant-design/icons'
import './index.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { collapseMenu } from '../../store/reducers/tab'

const { Header } = Layout

const CommonHeader = ({ collapsed }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem('adminToken')
        navigate('/login', { replace: true })
    }

    const items = [
        {
            key: '1',
            label: (
                <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#1890ff' }}>
                    Center
                </button>
            )
        },
        {
            key: '2',
            label: (
                <button onClick={() => logout()} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#1890ff' }}>
                    Logout
                </button>
            )
        }
    ]

    const setCollapsed = () => {
        dispatch(collapseMenu())
    }

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
                <button onClick={e => e.preventDefault()} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    <Space>
                        <Avatar src={<img alt="logo" src={require('../../assets/images/user.png')} />} size={36} />
                    </Space>
                </button>
            </Dropdown>
        </Header>
    )
}

export default CommonHeader