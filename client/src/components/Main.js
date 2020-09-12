import React, {useState} from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import {
    Spinner,
    ButtonGroup,
    ToggleButton,
    Container,
    Row, 
    Col,
    Navbar,
} from 'react-bootstrap';

import ReleaseCard from './ReleaseCard';
import ReleasePage from './ReleasePage';

const Main = ({darkMode, albums, loading, getAll, getAllbyLabel, labels, sortPosts, sortingOrder, setSortingOrder})=>{

    const relPage = (props)=>{
        const id = parseInt(props.match.params.id, 10)
        const album = albums.find(album => album.id === id);
        return (album !== undefined)
        ? <ReleasePage
                darkMode={darkMode}
                album={album}
            />
        :  null;
    };

    const buttonTheme = darkMode?"secondary":"outline-secondary";

    const [filterLabel, setFilterLabel] = useState('0');
    const [selectedRule, setSelectedRule] = useState('1');

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

    return(
        <div style={{minHeight:"100vh"}}>
            <div className="container">
                <Router>
                    <Route exact path="/">
                    <div 
                        className="mt-3 mb-60" 
                        style={{ paddingBottom: 60}} //footer height
                    >
                        <Container fluid>
                            <Row>
                                <Col>
                                    <Navbar
                                        collapseOnSelect
                                        expand="sm"
                                    >
                                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">

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
                                        </Navbar.Collapse>
                                    </Navbar>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {loading?
                                        <Spinner animation="grow" variant={darkMode?"dark":"light"}/>
                                    :albums.map(album=>
                                            <div key={album.id} style={{display: 'inline-block', width:'350px', margin:'5px'}}>
                                                <ReleaseCard key={album.id}
                                                    darkMode={darkMode}
                                                    album={album}
                                                />
                                            </div>
                                            )
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    </Route>
                    <Route path='/:id' component={relPage}/>
                </Router>
            </div>
        </div>
    );
}

export default Main;