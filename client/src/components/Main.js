import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Modal from "react-modal";

import ReleaseCard from './ReleaseCard';
import ReleasePage from './ReleasePage';

const Main = ({albums, loading, getAll, getAllbyLabel, getAlbumById, currentAlbum, labels, sortPosts, sortingOrder, setSortingOrder, addToPlaylist, videos})=>{


    const [filterLabel, setFilterLabel] = useState('0');
    const [selectedRule, setSelectedRule] = useState('1');
    const [selectedTab, setSelectedTab] = useState('main');
    const [showModal, setShowModal] = useState(false);

    const styles = { 
        content :{ 
            border: '1px solid #ccc', background: '#fff',
            overflow: 'auto', WebkitOverflowScrolling: 'touch',
            borderRadius: '4px', outline: 'none', padding: '20px',
            top: '50%', left: '50%', right: 'auto', bottom: 'auto',
            marginRight: '-50%', transform: 'translate(-50%, -50%)',
            backgroundColor: 'transparent',           
        } 
    };
    
    useEffect(()=>{
        Modal.setAppElement(document.getElementById('root'));
    }, []);

    const openModal=()=>setShowModal(true);
    const closeModal=()=>setShowModal(false);
    const getVideo=(id)=>{
        const album=albums.find((a)=>a.id===id);
        let video={};
        if(album !== undefined){
            video = videos.find(vid=>{
                return vid.title.includes(album.title)
            });
        }
        return video;
    }

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
       <div className="container mx-auto max-w-screen-lg">
            <div className="card-container">
                {loading? 
                    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                : albums.map((album, index, array)=>{
                    //console.log(album.id)
                    return(<ReleaseCard key={album.id}
                        album={album}
                        getAlbumById={getAlbumById}
                        openModal={openModal}
                    />)
                })}
            </div>
            
            <Modal 
                isOpen={showModal}
                onRequestClose={()=>closeModal()}
                style={styles}
            >
                <ReleasePage
                    loading={loading}
                    currentAlbum={currentAlbum}
                    //prev={albums[index-1]?albums[index-1]:null}
                    //next={albums[index+1]?albums[index+1]:null}
                    video={getVideo(currentAlbum.id)}
                    getAlbumById={getAlbumById}
                    closeModal={closeModal}
                    />
            </Modal>
                {/*const index = albums.findIndex(album => album.id === id);
                const album=albums[index];
                let video={};
                if(album !== undefined){
                    video = videos.find(vid=>{
                        return vid.title.includes(album.title)
                    });
                }
                return (album !== undefined)
                    ? <ReleasePage
                    loading={loading}
                    album={album}
                    currentAlbum={currentAlbum}
                    //prev={albums[index-1]?albums[index-1]:null}
                    //next={albums[index+1]?albums[index+1]:null}
                    video={video}
                    getAlbumById={getAlbumById}
                    />
                    :  null;
                }}/>
            </>*/}
        </div>
    );
}

export default Main;