import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button } from '@storybook/react/demo';
import Estimate from '../pages/App/components/EstimateView/components/EstimateWrapper/components/Estimate';

storiesOf('Estimate', module)
  .add('for Uber', () => (
    <Estimate
      service="Uber"
      flavor="Uber X"
      duration={200}
      price={500}
    />
  ))
  .add('for Lyft', () => (
    <Estimate
      service="Lyft"
      flavor="Lyft Line"
      duration={200}
      price={500}
    />
  ))
  .add('for car2go', () => (
    <Estimate
      service="car2go"
      flavor="For Two"
      duration={200}
      price={500}
    />
  ))
  .add('for ReachNow', () => (
    <Estimate
      service="ReachNow"
      duration={200}
      price={500}
    />
  ))
  .add('with long duration', () => (
    <Estimate
      service="Uber"
      duration={50000}
      price={800}
    />
  ));

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
