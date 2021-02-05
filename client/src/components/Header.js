import React, {useState} from 'react';

const Header = ({setSelectedTab})=>{
  
  const [navOpen, setNavOpen] = useState(false);

  const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
  </svg>;
  const starIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg>;

    return(
      <nav className="flex items-center bg-gray-800 p-3 flex-wrap z-50">          
        <span className="text-xl text-white font-bold uppercase tracking-wide"
          >FULLMOONCREW</span>
      <button
        className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
        data-target="#navigation"
        onClick={()=>setNavOpen(!navOpen)}
      >
        <span>{menuIcon}</span>
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
          <a
            onClick={(event)=>{
              event.preventDefault();
              setSelectedTab("Fullwidth");
            }}
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
          >
            <span>{starIcon}</span>
          </a>
        </div>
      </div>
    </nav>
    );
}

export default Header;
