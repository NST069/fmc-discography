import React, {useState} from 'react';

const Header = ({setSelectedTab})=>{
  
  const [navOpen, setNavOpen] = useState(false);
    return(
      <nav className="flex items-center bg-gray-800 p-3 flex-wrap">          
        <span className="text-xl text-white font-bold uppercase tracking-wide"
          >FULLMOONCREW</span>
      <button
        className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        data-target="#navigation"
        onClick={()=>setNavOpen(!navOpen)}
      >
        <i className="material-icons">{`${(navOpen ? "menu" : "menu_open")}`}</i>
      </button>
      <div
        className={`${(navOpen ? "flex" : "hidden")} top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        id="navigation"
      >
        <div
          className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto"
        >
          <a
            // onClick={(event)=>{
            //   event.preventDefault();
            //   setSelectedTab("Home");
            // }}
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-600 items-center justify-center"
          >
            <span>Home</span>
          </a>
          <a
            onClick={(event)=>{
              event.preventDefault();
              setSelectedTab("Discography");
            }}
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>Discography</span>
          </a>
          <a
            onClick={(event)=>{
              event.preventDefault();
              setSelectedTab("Videography");
            }}
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>Videography</span>
          </a>
        </div>
      </div>
    </nav>
    );
}

export default Header;
