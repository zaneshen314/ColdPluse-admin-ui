import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { getMenu } from '../../api/MenuApi'
import { useNavigate, Navigate } from 'react-router-dom'
import './login.css'
import {login} from "../../api/login";
const Login = () => {
  const navigate = useNavigate()

  if (localStorage.getItem('adminToken')) {
    return <Navigate to="/home" replace />
  }

  const handleSubmit = async val => {
      console.log(val)
      if (!val.username || !val.password) {
          message.error('Enter the correct information')
          return
      }
      try {
          const data = await login(val.username, val.password);
          localStorage.setItem('adminToken', data.data);
          // 模拟动态获得菜单
          getMenu(val).then(({data}) => {
              console.log(data)
              if (data.code === 20000) {
                  localStorage.setItem('menu', JSON.stringify(data.data.menu))
                  message.success('Login Success')
                  navigate('/home')
              } else {
                  message.error(data.data.message)
              }
          })
      } catch (error) {
          alert("Login failed");
      }

  }
  return (
      <Form name="basic" onFinish={handleSubmit} className="login-container">
        <div className="login_title">Login</div>
          <p>Email:</p>
        <Form.Item label="" name="username">
          <Input placeholder="Entry Email" />
        </Form.Item>
          <p>Password:</p>
        <Form.Item label="" name="password">
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
