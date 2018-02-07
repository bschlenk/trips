import React from 'react';
import cn from 'classnames';

export default function Duration({ value, ...props }) {
  const minutes = Math.round(value / 60);
  const { className } = props;
  return (
    <span {...props}>
      <span className={cn({ [`${className}__Value`]: className })}>{minutes}</span>
      <br />
      <span className={cn({ [`${className}__Unit`]: className })}>minutes</span>
    </span>
  );
}
