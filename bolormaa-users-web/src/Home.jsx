import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
    const userName = location.state?.name; // Retrieve the name from the state

    return (
        <div>
            <h2>Welcome, {userName ? userName : 'Guest'}</h2>
        </div>
    );
};

export default Home;
