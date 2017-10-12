import React from 'react';
import {
  storiesOf,
  action,
  infoDecorator
} from '../../../../tools/storybook';
import Modal from './Modal';

storiesOf('Modal', module)
  .addDecorator(infoDecorator)
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
