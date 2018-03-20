import React from 'react';

export default function Anchor({
  href,
  newTab = false,
  children,
  ...props,
}) {
  const blank = newTab
    ? {
      target: '_blank',
      rel: "noopener",
    } : {};

  const aprops = {
    href,
    ...blank,
    ...props,
  };

  return (
    <a {...aprops}>{children}</a>
  );
}
