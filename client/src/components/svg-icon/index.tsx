import React from 'react';
import {classCreator} from '@/utils';
import './index.less';

interface IProps {
  iconClass: string;
  size?: 'small' | 'middle' | 'large';
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
  onClick?: Function;
}

export enum SvgIconSize {
  SMALL = 'small',
  MIDDLE = 'middle',
  LARGE = 'large'
}

const prefixCls = classCreator('svg');

const SvgIcon = ({iconClass, fill, size, width, height, className, onClick}: IProps) => {
  height = height || width;
  const svgStyle: {
    [key: string]: string | number;
  } = {};

  if (width) {
    svgStyle.width = width;
    svgStyle.height = height || width;
  } else if (size) {
    let fontSize;
    switch (size) {
      case SvgIconSize.SMALL:
        fontSize = 14;
        break;
      case SvgIconSize.LARGE:
        fontSize = 24;
        break;
      case SvgIconSize.MIDDLE:
      default:
        fontSize = 16;
        break;
    }
    svgStyle.fontSize = fontSize;
  }

  return (
    <svg
      style={svgStyle}
      className={`${prefixCls}${className ? ' ' + className : ''}`}
      onClick={() => onClick && onClick()}
    >
      <use xlinkHref={'#icon-' + iconClass} fill={fill} />
    </svg>
  );
};

SvgIcon.defaultProps = {
  fill: '#080E1A' // 默认图标颜色，与字体默认颜色相同
};

export default SvgIcon;
