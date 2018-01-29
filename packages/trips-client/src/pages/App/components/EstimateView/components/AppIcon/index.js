import React from 'react';
import cn from 'classnames';
import uberSvg from './icons/uber.svg';
import lyftSvg from './icons/lyft.svg';
import car2goSvg from './icons/car2go.svg';
import reachNowSvg from './icons/reachnow.svg';

const appSvgMap = {
  Uber: uberSvg,
  Lyft: lyftSvg,
  car2go: car2goSvg,
  ReachNow: reachNowSvg,
};

export default function AppIcon({ app, className, ...props }) {
  const src = appSvgMap[app];
  return (
    <img
      alt={app}
      className={cn('AppIcon', className)}
      src={src}
      {...props}
    />
  );
}
