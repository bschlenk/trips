import React, { Children }  from 'react';
import cn from 'classnames';
import './style.css';

export default function(props) {
  const only = Children.only(props.children);
  return React.cloneElement(
    only, {
      className: cn('ResponsiveCentered',
      only.props.className)
    });
}
