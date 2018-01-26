import React from 'react';
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
  className = 'AppIcon' + (className || '');
  return <img className={className} src={src} {...props} />;
}
