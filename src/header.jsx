import React from 'react';


const Header = () =>{
    return(
    <>
        <main>
            <div className="pattern" />
            <div className="wrapper">
                <header >
                    <img src="./hero.png" />
                    <h1> <span className="text-gradient" >Find Movies</span>  YOU like  </h1>
                </header>
            </div>
        </main>

    </>
    )
}


export default Header;