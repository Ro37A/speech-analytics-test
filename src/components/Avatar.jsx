import React from 'react';
import { ReactComponent as AvatarSVG } from '../assets/img/avatar.svg';

import './Avatar.css';

const Avatar = () => (
  <div styleName="circle">
    <AvatarSVG styleName="avatar" />
  </div>
);

export default Avatar;
