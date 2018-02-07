import React, { Component } from 'react';
import Estimate from './components/Estimate';
import EstimateError from './components/EstimateError';

export default function EstimateWrapper(props) {
  const { service, estimate, error } = props.estimate;
  if (error) {
    return <EstimateError key={service} {...{ service, error }} />;
  }

  const { flavor } = estimate;
  const key = `${service}#${flavor}`;
  const values = { key, service, ...estimate };
  return <Estimate {...values} />;
}
