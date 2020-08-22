import React from 'react';


const Main = ({labels, getAllbyLabel, albums})=>{


    return(
        <div>
            {
                labels.map(label=>
                    <button onClick={(event)=>{
                        event.preventDefault();
                        getAllbyLabel(label)}}>{label}</button>)
            }            
            {
                albums.map(album=>
                    <div>
                        <img src={album.imageUrl} alt={`${album.artist} - ${album.title}`} />
                        <p>{`${album.artist} - ${album.title}`}</p>
                    </div>
                )
            }
        </div>
    );
}

export default Main;