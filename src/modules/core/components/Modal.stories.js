import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withInfoDecorator } from '../../../../tools/storybook';
import Modal from './Modal';

storiesOf('Modal', module)
  .addDecorator(withInfoDecorator)
  .add('Modal', () => (
    <Modal
      title="title"
      buttons="(buttons)"
      onSubmit={action('onSubmit')}
      onCloseRequest={action('onCloseRequest')}
    >
      <p>{'(<children>)'}</p>
    </Modal>
  ));
