import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fireDb } from '../Firebase';
import { onValue, ref } from 'firebase/database';
import { Link } from 'react-router-dom';
import Header2 from '../components/Header2';

const AfficherProduit = () => {
    const [item, setItem] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const produitsSelectionner = ref(fireDb, `produits/${id}`)
        onValue(produitsSelectionner, (result) => {
            if (result.exists()) {
                setItem({
                    ...result.val()
                })
            } else {
                setItem({})
            }
        })
    })
    return (
        <div>
            <Header2 />
            <div class="mb-3">
                <label for="name" class="form-label">Nom du produit</label>
                <input type="text" name='name' class="form-control" id="name" aria-describedby="emailHelp" value={item.name} readOnly />

            </div>

            <div class="mb-3">
                <label for="description" class="form-label">Description du produit</label>
                <input type="message" name='description' class="form-control" id="email" aria-describedby="emailHelp" value={item.description} readOnly />

            </div>

            <div class="mb-3">
                <label for="prix" class="form-label">Prix</label>
                <input type="number" name='prix' class="form-control" id="contact" aria-describedby="emailHelp" value={item.prix} readOnly />

            </div>

            <br /> <br />
            <Link to="/accueil">   <button type="button" class="btn btn-dark">Retour</button></Link>
        </div>
    );
};

export default AfficherProduit;