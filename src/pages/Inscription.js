import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';



const Inscription = () => {
    const [erreur, setErreur] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const soumettre = (e) => {
        e.preventDefault()

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;

                navigate("/accueil");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

            });
    }

    return (
        <div className='Gconnexion'>
            <Header />
            <div className='connexion'>
                <h1 className='mb-5 mt-3'>Inscription</h1>
                <form onSubmit={soumettre}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email: </label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Mot de passe: </label>
                        <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Je suis d'accord avec les termes de service</label>
                    </div>

                    <p>Déjà inscrit ?
                        <Link to={'/'}>
                            <a> Se connecter</a>
                        </Link>
                    </p>

                    <button type="submit" class="btn btn-primary">S'inscrire</button>
                </form>
            </div>

        </div>
    )
}

export default Inscription
