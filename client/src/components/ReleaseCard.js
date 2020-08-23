import React from 'react';

import { 
        Card,
        Button,
    }from 'react-bootstrap';

const ReleaseCard = ({imageUrl, artist, title})=>{

    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{`${artist} - ${title}`}</Card.Title>
                <Card.Text>
                Some additional info
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default ReleaseCard;