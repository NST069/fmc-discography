import React from 'react';

import { Link } from "react-router-dom";

import { 
        Card,
        Button,
}from 'react-bootstrap';

const ReleaseCard = ({darkMode, album})=>{

    return(
        <Card className="mt-3 mb-6" style={{ maxWidth: '18rem'}} key={album.id} bg={darkMode?"dark":"light"} text={darkMode?"white":"dark"}>
            <Card.Img 
                variant="top" 
                src={album.imageUrl}
                alt={`${album.artist} - ${album.title}`}
            />
            <Card.Body>
                <Card.Title>{`${album.artist} - ${album.title}`}</Card.Title>
                <Link to={`/${album.id}`}>
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