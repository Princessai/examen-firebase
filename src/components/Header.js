import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <nav class="navbar navbar-light bg-light">
                <span class="navbar-brand mb-0 h1 bg-light">Navbar</span>
                <div className='buttonAuth bg-light'>
                    <Link to={'/examen-firebase/'} >
                    <button type="button" class="btn btn-primary">Connexion</button>
                    </Link>
                    
                    <Link to={'/register'} >
                    <button type="button" class="btn btn-primary">Inscription</button>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Header
