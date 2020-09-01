import React, {useState} from 'react';

import {
    Navbar,
    ButtonToolbar,
    ButtonGroup, 
    Button,
    ToggleButton,
} from 'react-bootstrap';

const sunIcon = 
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-sun" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/>
        <path fillRule="evenodd" d="M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.155l-.36 1.508a.25.25 0 0 1-.282.19l-1.532-.245a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.508a.25.25 0 0 0-.374-.155l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"/>
    </svg>;

const moonIcon =
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-moon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"/>
    </svg>;

const sortDn = 
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-sort-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3 2a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-1 0v-10A.5.5 0 0 1 3 2z"/>
        <path fillRule="evenodd" d="M5.354 10.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L3 11.793l1.646-1.647a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
    </svg>;

const sortUp = 
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-sort-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M3 13a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-1 0v10a.5.5 0 0 0 .5.5z"/>
    <path fillRule="evenodd" d="M5.354 4.854a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L3 3.207l1.646 1.647a.5.5 0 0 0 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 9a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
    </svg>;

const Header = ({darkMode, setDarkMode, getAll, getAllbyLabel, labels, sortPosts, sortingOrder, setSortingOrder})=>{

    const buttonTheme = darkMode?"secondary":"outline-secondary";

    const [filterLabel, setFilterLabel] = useState('0');
    const [selectedRule, setSelectedRule] = useState('1');

    return(
        <Navbar 
            variant={darkMode?"dark":"light"} 
            bg={darkMode?"dark":"light"}
            sticky="top"
        >
            <Navbar.Brand className="font-weight-bold">FULLMOONCREW</Navbar.Brand>
            <ButtonToolbar>
                <ButtonGroup toggle className="mr-2" variant={darkMode?"dark":"light"}>
                    <ToggleButton 
                        type="radio"
                        key={0}
                        value="0"
                        variant={buttonTheme} 
                        checked={filterLabel === "0"}
                        onChange={(event)=>{
                            event.preventDefault();
                            setFilterLabel("0");
                            getAll();
                    }}>All</ToggleButton>
                    {
                        labels.map(label=>
                            <ToggleButton 
                                type="radio"
                                variant={buttonTheme} 
                                key={label.name} 
                                value={label.value}
                                checked={filterLabel === label.value}
                                onChange={(event)=>{
                                    event.preventDefault();
                                    setFilterLabel(label.value);
                                    getAllbyLabel(label.name);
                            }}>{label.name}</ToggleButton>)
                    }
                </ButtonGroup>
                <ButtonGroup toggle className="mr-2" variant={darkMode?"dark":"light"}>
                    {[{name: "New", value: "1"}, {name: "Artist", value:"2"}, {name: "Title", value:"3"}].map((rule, idx)=>
                        <ToggleButton 
                            type="radio"
                            key={idx}
                            value={rule.value} 
                            variant={buttonTheme}
                            checked={selectedRule === rule.value}
                            onChange={(event)=>{
                                event.preventDefault();
                                setSelectedRule(event.currentTarget.value);
                                sortPosts(rule.name.toLowerCase());
                        }}>by {rule.name}</ToggleButton>    
                    )}
                    <ButtonGroup toggle>
                        <ToggleButton
                            type="checkbox"
                            variant={buttonTheme}
                            checked={sortingOrder}
                            value="1"
                            onChange={(event)=>{
                                event.preventDefault();
                                setSortingOrder(!sortingOrder);
                                sortPosts();
                            }}
                        >
                            {sortingOrder
                            ? sortDn
                            : sortUp}
                        </ToggleButton>
                    </ButtonGroup>
                </ButtonGroup>      
            </ButtonToolbar>
            <Navbar.Collapse className="justify-content-end">
                <ButtonGroup toggle>
                    <ToggleButton
                        type="checkbox"
                        variant={buttonTheme}
                        checked={darkMode}
                        value="1"
                        onChange={(event)=>{
                            event.preventDefault();
                            setDarkMode(!darkMode);
                        }}
                    >
                        {darkMode
                        ? moonIcon
                        : sunIcon}
                    </ToggleButton>
                </ButtonGroup>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;