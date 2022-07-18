/**
 * @file 登录
 */

import apis from '@/apis';
import {classCreator} from '@/utils';
import store, {getKey} from '@/utils/store';
import {useNavigate} from 'react-router-dom';
import {Form, Input, Checkbox, Button, notification} from 'antd';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';
import React, {useEffect, useState} from 'react';
import './index.less';

const prefixCls = classCreator('login');
const STORE_KEY = 'account';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [autoFill, setAutoFill] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    try {
      let account = store.get(STORE_KEY);
      account = account ? JSON.parse(account) : {};
      const {name, password, autoFill} = account;
      console.log(autoFill);
      setAutoFill(autoFill);
      name !== undefined && setName(name);
      password !== undefined && setPassword(password);
      console.log('accoutn', account);
      form.setFieldsValue({
        name,
        password,
        autoFill
      });
    } catch (error) {
      console.error(`解析本地存储数据出错：${getKey()} -> ${STORE_KEY}`);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAutoFillChanged = (e: CheckboxChangeEvent) => {
    setAutoFill(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();

      // 处理记录密码
      if (autoFill) {
        store.set(
          STORE_KEY,
          JSON.stringify({
            name,
            password: encodeURI(password),
            autoFill
          })
        );
      } else {
        store.remove(STORE_KEY);
      }

      // 登录
      await apis.login({
        name,
        password
      });
      navigate('/');
    } catch (error) {
      console.log('err');
      notification.error({
        message: '账号或密码错误'
      });
    }
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
          <Form.Item label="密码" name="password" rules={[{required: true, message: '请输入密码'}]}>
            <Input.Password placeholder="请输入密码" onChange={handlePasswordChanged} />
          </Form.Item>
          <Form.Item name="autoFill" valuePropName="checked" wrapperCol={{offset: 18, span: 6}}>
            <Checkbox onChange={handleAutoFillChanged}>记住密码</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{offset: 8, span: 16}}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
