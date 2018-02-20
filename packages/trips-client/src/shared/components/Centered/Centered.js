import React, { Children }  from 'react';
import cn from 'classnames';
import './style.css';

export default function({
  className,
  children,
  ...props
}) {
  const only = Children.only(children);
  return React.cloneElement(
    only, {
      className: cn(
        'Centered',
        only.props.className,
        className,
      ),
    });
}
export default injectClass('Centered');
