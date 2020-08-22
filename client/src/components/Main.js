import React from 'react';


const Main = ({getAllSNH, albums})=>{


    return(
        <div>
            <button onClick={(event)=>getAllSNH()}>get</button>
            
                {
                    albums.map(album=>
                        <img src={album.imageUrl} alt={`${album.artist} - ${album.title}`} />
                    )
                }
        </div>
    );
}

export default Main;