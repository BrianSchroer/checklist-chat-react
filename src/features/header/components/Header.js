import React, {PropTypes} from 'react';
import { Link, IndexLink} from 'react-router';
import LoadingDots from '../../../components/LoadingDots';

const Header = ({isLoading}) => {
    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
            {isLoading && <LoadingDots interval={100} dots={20}/>}
        </nav>
    );
};

Header.propTypes = {
    isLoading: PropTypes.bool
};

export default Header;
