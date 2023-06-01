import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header2() {
    return (
        <div>
            <nav class="navbar navbar-light bg-light">
                <span class="navbar-brand mb-0 h1 bg-light">Navbar</span>
                <div className='buttonAuth bg-light'>
                    <Link to={'/new'} >
                    <button type="button" class="btn btn-primary">Créer un nouveau produit</button>
                    </Link>
                    
                    <Link to={'/examen-firebase/'} >
                    <button type="button" class="btn btn-primary">Se deconnecter</button>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Header2
