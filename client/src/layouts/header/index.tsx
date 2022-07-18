import SvgIcon from '@/components/svg-icon';
import {classCreator} from '@/utils';
import {Popover} from 'antd';
import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import './index.less';

const prefixCls = classCreator('header');
const getAvator = (userName?: string) => (
  <div className="avatar">
    {userName ? userName.charAt(0).toUpperCase() : <SvgIcon name="avatar-user" width={24} />}
  </div>
);

const Header = () => {
  const [userName, setUserName] = useState('');
  // const navigate = useNavigate();

  const logout = () => {
    location.href = '/login';
  };
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-left`}>
        <h1>Magic Mock</h1>
      </div>
      <div className={`${prefixCls}-center`} />
      <div className={`${prefixCls}-right`}>
        {!userName ? (
          <Popover
            placement="bottomRight"
            overlayClassName="user-info-popover"
            content={
              <div className="user-info-content">
                <div className="user-info-name">
                  {getAvator(userName)}
                  <span className="epplipsis">{userName}</span>
                </div>
                <div className="user-info-footer" onClick={logout}>
                  退出登录
                </div>
              </div>
            }
          >
            <div className="account-wrapper">
              {getAvator(userName)}
              <SvgIcon name="solid-arrow-down" />
            </div>
          </Popover>
        ) : (
          <div className="login-btn">登录</div>
        )}
      </div>
    </div>
  );
};

export default Header;
