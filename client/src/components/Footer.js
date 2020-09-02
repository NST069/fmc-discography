import React from 'react';

import {
    Navbar,
} from 'react-bootstrap';

const Footer = ({darkMode})=>{

    return(
        <Navbar 
            variant={darkMode?"dark":"light"}
            bg={darkMode?"dark":"light"}
            fixed="bottom"
        >
            <Navbar.Text>
                <a href="https://github.com/nst069" target="_blank" rel="noopener noreferrer" className="text-decoration-none">@nst069</a> with {`<3`} and (something else)
            </Navbar.Text> 
        </Navbar>
    );
}

export default Footer;
