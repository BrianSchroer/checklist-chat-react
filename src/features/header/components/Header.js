import React, {PropTypes} from 'react';
import { Link, IndexLink} from 'react-router';
import LoadingDots from '../../../components/LoadingDots';

const Header = ({isLoading}) => {
    return (
        <nav className="navbar">
            <div className="nav navbar-nav">
                <IndexLink to="/" className="navbar-brand header-logo-img" />
            </div>
        </nav>
    );
};

Header.propTypes = {
    isLoading: PropTypes.bool
};

export default Header;
