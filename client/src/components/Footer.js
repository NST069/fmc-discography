import React from 'react';

import {
    Navbar,
} from 'react-bootstrap';

import {SocialMediaIconsReact} from 'social-media-icons-react';

const Footer = ({darkMode})=>{
    const links=[
        {name:'instagram', url:'https://instagram.com/nst069'},
        {name:'github', url:'https://github.com/nst069'},
        {name:'twitter', url:'https://twitter.com/nst069'},
        {name:'vk', url:'https://vk.com/saturnashes'},
        {name:'youtube', url:'https://www.youtube.com/c/nst069'},
        {name:'deviantart', url:'https://deviantart.com/nst069'},
        {name:'behance', url:'https://behance.net/nst069'},
        {name:'pinterest', url:'https://pinterest.com/nst069'},
    ];
    return(
        <Navbar 
            variant={darkMode?"dark":"light"}
            bg={darkMode?"dark":"light"}
        >
            <Navbar.Text>
                {links.map(link=>
                    <SocialMediaIconsReact 
                        key={link.name}
                        borderColor="rgba(0,0,0,0)" 
                        borderWidth="5" 
                        borderStyle="solid" 
                        icon={link.name} 
                        iconColor={darkMode?"rgba(255,255,255,1)":"rgba(0,0,0,1)"} 
                        backgroundColor="rgba(0,0,0,0)" 
                        iconSize="10" 
                        roundness="20%" 
                        url={link.url} 
                        size="32" />
                )}
            </Navbar.Text>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <a href="https://github.com/nst069" target="_blank" rel="noopener noreferrer" className="text-decoration-none">@nst069</a> with ❤ and 🪐♄
                </Navbar.Text> 
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Footer;
