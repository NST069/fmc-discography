import React from 'react';


const Main = ({labels, getAllbyLabel, getAll, albums, loading, sortPosts})=>{


    return(
        <div>
            <button onClick={(event)=>{
                event.preventDefault();
                getAll();
            }}>All</button>
            {
                labels.map(label=>
                    <button onClick={(event)=>{
                        event.preventDefault();
                        getAllbyLabel(label);
                    }}>{label}</button>)
            }
            <div>
                <button onClick={(event)=>{
                    event.preventDefault();
                    sortPosts("artist");
                }}>by Artist</button>
                <button onClick={(event)=>sortPosts("title")}>by Title</button>
            </div>      
            {
                loading
                ? <h1>LOADING...</h1>
                :
                <table style={{padding:5+'px'}}>
                    <tr>
                    {albums.map(album=>
                        <td style={{marginTop:2+'px'}}>
                            <img src={album.imageUrl} alt={`${album.artist} - ${album.title}`} />
                            <p>{`${album.artist} - ${album.title}`}</p>
                        </td>
                    )}
                    </tr>
                </table>
            }
        </div>
    );
}

export default Main;