import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { getMenu } from '../../api/MenuApi'
import { useNavigate, Navigate } from 'react-router-dom'
import './login.css'
const Login = () => {
  const navigate = useNavigate()

  if (localStorage.getItem('token')) {
    return <Navigate to="/home" replace />
  }

  const handleSubmit = val => {
    console.log(val)
    if (!val.username || !val.password) {
      message.error('账号密码必须输入')
      return
    }
    getMenu(val).then(({ data }) => {
      console.log(data)

      if (data.code === 20000) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('menu', JSON.stringify(data.data.menu))
        message.success('登录成功')
        navigate('/home')
      } else {
        message.error(data.data.message)
      }
    })
  }
  return (
      <Form name="basic" onFinish={handleSubmit} className="login-container">
        <div className="login_title">Login</div>
        <Form.Item label=" Email" name="username">
          <Input placeholder="Entry Email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Entry Password" type="password" />
        </Form.Item>
        <Form.Item className="login-button">
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
  )
}

export default Login
