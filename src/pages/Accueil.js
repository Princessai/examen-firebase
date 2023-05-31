import { onValue, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { fireDb } from '../Firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Header2 from '../components/Header2';


const Accueil = () => {
    const [collections, setData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {

        const produitsCollection = ref(fireDb, "produits");
        onValue(produitsCollection, (snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val())
            } else {
                setData({})
            }
            return () => {
                setData({})
            }
        })
    })

    const SupprimeProduits = (id) => {
        if (window.confirm("Etre vous sûr de vouloir supprimer ?")) {
            const produitsSelectionner = ref(fireDb, `produits/${id}`)
            remove(produitsSelectionner, (err) => {
                if (err) {
                    toast.error(err)
                } else {
                    toast.success("suppression Effectuée")
                }
            })
            setTimeout(() => navigate("/accueil"), 700);
        }
    }
    return (
        <>
        <Header2 />
            <div>
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Nom du produit</th>
                            <th scope="col">Description du produit</th>
                            <th scope="col">Prix</th>
                            <th scope="col">Image</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(collections).map((id, index) => {
                            return (
                                <tr key={id}>
                                    <th scope="row">{index + 1}</th>
                                    <td style={{
                                        width: '150px',
                                    }}>{collections[id].name}</td>

                                    <td style={{
                                        width: '600px',
                                    }}>{collections[id].description}</td>
                                    <td>{collections[id].prix}f CFA</td>
                                    <td className='img-thumbnail'>{collections[id].image}</td>


                                    <td><Link to={`/afficher/${id}`}>
                                        <button type="button" class="btn btn-secondary">Voir</button>
                                    </Link>&nbsp;
                                        <Link to={`/editer/${id}`}>
                                            <button type="button" class="btn btn-warning">editer</button>
                                        </Link>&nbsp;
                                            <button type="button" class="btn btn-danger" onClick={() => SupprimeProduits(id)}>Supprimer</button>
                                    </td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Accueil;
