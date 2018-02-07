import React, { Component } from 'react';
import AppIcon from 'components/AppIcon';
import './style.css';

export default function EstimateFacade(props) {
  return (
    <li className="EstimateFacade Estimate Estimate__InfoGroup">
      <div className="Estimate__AppIcon">
        <AppIcon app="uber" />
      </div>
      <div className="Estimate__Text" />
      <div className="Estimate__Text" />
    </li>
  )
}
