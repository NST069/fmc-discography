import React from 'react';

import { Link } from "react-router-dom";

import { 
        Card,
        Button,
}from 'react-bootstrap';

const ReleaseCard = ({darkMode, album})=>{

    return(
        <Card key={album.id} bg={darkMode?"dark":"light"} text={darkMode?"white":"dark"}>
            <Card.Img 
                variant="top"
                rounded 
                src={album.imageUrl}
                alt={`${album.artist} - ${album.title}`}
            />
            <Card.Body>
                <Card.Title>{`${album.artist} - ${album.title}`}</Card.Title>
                <Link 
                    to={`/${album.id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Button
                        block
                        size="lg"
                        variant={darkMode?"secondary":"outline-secondary"}
                    >Show</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default ReleaseCard;