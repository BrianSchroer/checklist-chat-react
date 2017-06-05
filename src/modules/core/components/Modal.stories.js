import React from 'react';
import {storiesOf, action} from '@storybook/react';
import Modal from './Modal';

storiesOf('Modal', module)
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
