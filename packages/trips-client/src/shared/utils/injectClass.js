import React, { Children }  from 'react';
import cn from 'classnames';

export default function injectClass(injectedClass) {
  return function({
    className,
    children,
    ...props
  }) {
    const only = Children.only(children);
    return React.cloneElement(
      only, {
        className: cn(
          injectedClass,
          only.props.className,
          className,
        ),
      });
  }
}
