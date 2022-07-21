/**
 * @file 登录
 */

import apis from '@/apis';
import {classCreator} from '@/utils';
import {useNavigate} from 'react-router-dom';
import {Form, Input, Button, notification} from 'antd';
import React, {useState} from 'react';
import './index.less';

const prefixCls = classCreator('register');

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    await form.validateFields();

    // 注册
    await apis.register({
      name,
      password,
      email
    });
    notification.success({message: '注册成功'});
    navigate('/login');
  };
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-wrapper`}>
        <Form
          form={form}
          initialValues={{
            name,
            password
          }}
        >
          <Form.Item label="账号" name="name" rules={[{required: true, message: '请输入用户名'}]}>
            <Input placeholder="请输入账号" onChange={handleNameChange} />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {required: true, message: '请输入邮箱'},
              {type: 'email', message: '请输入正确的邮箱格式'}
            ]}
          >
            <Input placeholder="请输入邮箱" onChange={handleEmailChanged} />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {required: true, message: '请输入密码'},
              {type: 'string', min: 6}
            ]}
          >
            <Input.Password placeholder="请输入密码" onChange={handlePasswordChanged} />
          </Form.Item>
          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
