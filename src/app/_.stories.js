import React from 'react';
import {storiesOf} from '@kadira/storybook';

/* eslint-disable import/namespace */
/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-unused-vars */
import styles from '../styles/styles.css';
import bootstrapCss from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';
/* eslint-enable */

storiesOf('Welcome', module)
    .add('React Storybook', () => (
        <div className="container" style={{marginTop: '1em'}}>
            <div className="jumbotron">
                <h1 className="display-3">Welcome!</h1>

                <p className="lead">React Storybook is a UI development environment for React components.</p>
                <p>
                With it, you can visualize different states of your UI components and
                develop them interactively.
                </p>

                <p>It also serves as a "live style guide" for the site.</p>

                <hr className="my-2" />

                <p>
                    {"More info: "}
                    <a href="https://github.com/storybooks/react-storybook"
                        target ="_blank">
                        https://github.com/storybooks/react-storybook
                    </a>
                </p>
            </div>
        </div>
    ));
