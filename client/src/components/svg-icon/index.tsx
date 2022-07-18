import React, {useEffect, useState} from 'react';
import {classCreator} from '@/utils';
import './index.less';

interface IProps {
  name: string;
  size?: 'small' | 'normal' | 'large';
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

export enum SvgIconSize {
  SMALL = 'small',
  NORMAL = 'normal',
  LARGE = 'large'
}

const prefixCls = classCreator('svg');

const SvgIcon = ({name, fill, size = 'normal', width, height, className, onClick}: IProps) => {
  const [svgStyle, setSvgStyle] = useState<{
    [key: string]: string | number;
  }>({});
  useEffect(() => {
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
          fontSize = 16;
          break;
        case SvgIconSize.LARGE:
          fontSize = 32;
          break;
        case SvgIconSize.NORMAL:
        default:
          fontSize = 24;
          break;
      }
      svgStyle.fontSize = fontSize;
    }
    setSvgStyle(svgStyle);
  }, [width, height, size]);

  return (
    <svg style={svgStyle} className={`${prefixCls}${className ? ' ' + className : ''}`} onClick={e => onClick?.(e)}>
      <use xlinkHref={'#icon-' + name} fill={fill} />
    </svg>
  );
};

SvgIcon.defaultProps = {
  fill: '#080E1A' // 默认图标颜色，与字体默认颜色相同
};

export default SvgIcon;
