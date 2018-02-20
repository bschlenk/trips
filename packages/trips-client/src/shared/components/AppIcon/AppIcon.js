import React from 'react';
import cn from 'classnames';
import uberSvg from './icons/uber.svg';
import lyftSvg from './icons/lyft.svg';
import car2goSvg from './icons/car2go.svg';
import reachNowSvg from './icons/reachnow.svg';
import { createImage } from 'utils/images';

const appSvgMap = {
  uber: uberSvg,
  lyft: lyftSvg,
  car2go: car2goSvg,
  reachnow: reachNowSvg,
};

export default function AppIcon({ app, className, ...props }) {
  const src = appSvgMap[app.toLowerCase()];
  return (
    <img
      alt={app}
      className={cn('AppIcon', className)}
      src={src}
      {...props}
    />
  );
}

// Preload the svg images
// eslint-disable-next-line no-unused-vars
const images = Object.values(appSvgMap)
  .map(svg => createImage(svg));
