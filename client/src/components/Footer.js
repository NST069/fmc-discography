import React from 'react';

import {SocialMediaIconsReact} from 'social-media-icons-react';

const Footer = ()=>{
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
        <nav className="footer flex flex-col md:flex-row justify-between z-20">
            <div className="">
                {links.map(link=>
                <div className="inline-block" key={link.name}>
                    <SocialMediaIconsReact 
                    key={link.name}
                    borderColor="rgba(0,0,0,0)" 
                    borderWidth="5" 
                    borderStyle="solid" 
                    icon={link.name} 
                    iconColor="rgba(255,255,255,1)" 
                    backgroundColor="rgba(0,0,0,0)" 
                    iconSize="10" 
                    roundness="20%" 
                    url={link.url} 
                    size="32" />
                </div>
                )}
            </div>
            <div className="flex-auto px-4">
                <p className="no-underline mx-3 flex-none font-light text-gray-500 text-right">
                    <a href="https://github.com/nst069" target="_blank" rel="noopener noreferrer">@nst069</a> with ❤ and 🪐♄
                </p>
            </div>
        </nav>
    );
}

export default Footer;
