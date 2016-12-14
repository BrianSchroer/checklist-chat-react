import React, {PropTypes} from 'react';
import {IndexLink} from 'react-router';
import {routePaths} from '../../../app/routes';

const Header = () => {
    return (
        <nav className="navbar">
            <div className="nav navbar-nav">
                <IndexLink to={routePaths.home} className="navbar-brand">
                    <div className="header-logo-img"></div>
                </IndexLink>
            </div>
        </nav>
    );
};

Header.propTypes = {
    isLoading: PropTypes.bool
};

export default Header;
