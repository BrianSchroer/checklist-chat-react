import { storiesOf } from '@storybook/react';
import storybookFrameDecorator from './storybookFrameDecorator';
import infoDecorator from './infoDecorator';

export default function(description) {
  return storiesOf(description, module)
    .addDecorator(infoDecorator)
    .addDecorator(storybookFrameDecorator);
}
