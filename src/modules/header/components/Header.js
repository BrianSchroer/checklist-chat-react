import React from 'react';
import PropTypes from 'prop-types';
import {Link, MemoryRouter} from 'react-router-dom';
import routePaths from '../../../app/routePaths';

const Header = () => {
    return (
        <MemoryRouter>
            <div id="appHeaderRow" className="app-header-row">
                <nav className="navbar">
                    <div className="nav navbar-nav">
                        <Link to={routePaths.home} className="navbar-brand">
                            <div className="header-logo-img"></div>
                        </Link>
                    </div>
                </nav>
            </div>
        </MemoryRouter>
    );
};

Header.propTypes = {
    isLoading: PropTypes.bool
};

export default Header;
