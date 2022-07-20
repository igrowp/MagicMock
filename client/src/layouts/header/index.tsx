import SvgIcon from '@/components/svg-icon';
import {classCreator} from '@/utils';
import {Popover} from 'antd';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {observer} from 'mobx-react';
import './index.less';
import {useStores} from '@/hooks';

const prefixCls = classCreator('header');

const AppHeader = () => {
  const userStore = useStores('userStore');
  // const navigate = useNavigate();

  useEffect(() => {
    userStore.getUserInfo();
  }, []);
  const logout = () => {
    location.href = '/login';
  };

  const getAvator = () => {
    const userName = userStore.user?.name;
    return (
      <div className="avatar">
        {userName ? userName.charAt(0).toUpperCase() : <SvgIcon name="avatar-user" width={24} />}
      </div>
    );
  };
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-left`}>{/* <h1>Magic Mock</h1> */}</div>
      <div className={`${prefixCls}-center`} />
      <div className={`${prefixCls}-right`}>
        {userStore.user?.name ? (
          <Popover
            placement="bottomRight"
            overlayClassName="user-info-popover"
            content={
              <div className="user-info-content">
                <div className="user-info-name">
                  {getAvator()}
                  <span className="epplipsis">{userStore.user?.name}</span>
                </div>
                <div className="user-info-footer" onClick={logout}>
                  退出登录
                </div>
              </div>
            }
          >
            <div className="account-wrapper">
              {getAvator()}
              <SvgIcon name="arrow-down-solid" size="small" />
            </div>
          </Popover>
        ) : (
          <div className="login-btn">登录</div>
        )}
      </div>
    </div>
  );
};

export default observer(AppHeader);
