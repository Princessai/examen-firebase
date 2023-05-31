import React, { useState, useEffect } from 'react';
import { fireDb } from '../Firebase';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { onValue, push, ref, update } from 'firebase/database';
import Header2 from '../components/Header2';


const initialState = { name: "", description: "", image: "", prix: "" };
const NewProducts = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const [state, setState] = useState(initialState);
    const [collectionData, setDb] = useState({});
    const { name, description, image, prix } = state;
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        //fonction qui permet de pouvoir récupérer une collection de données depuis la base de données
        const produitsRef = ref(fireDb, "produits");
        onValue(produitsRef, (resultat) => {
            if (resultat.exists()) {
                setDb(resultat.val())
            } else {
                setDb({})
            }
        })
        return () => { setDb({}) }
    }, [id]);

    useEffect(() => {
        if (id) {
            setState({ ...collectionData[id] })
        } else {
            setState({ ...initialState })
        }
        return () => {
            setState({ ...initialState })
        }
    }, [id, collectionData]);

    const changerValeurInput = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }
    const soumettreFormulaire = (e) => {
        e.preventDefault();
        if (!name || !description || !prix) {
            toast.error("S'il vous plait veuillez entrer les valeurs de chaques champs")
        } else {
            //Si l'id n'existe pas en paramètre, alors on fera une insertion dans la base de données
            if (!id) {
                console.log("avant")
                push(ref(fireDb, "produits"), state, (err) => {
                    if (err) {
                        toast.error(err.message)
                    } else {
                        toast.success("Le produit a été ajouté")
                    }
                })
            } else {
                //Si l'id existe, alors on fera une modification dans la base de données
                update(ref(fireDb, `produits/${id}`), state, (err) => {
                    if (err) {
                        toast.error(err.message)
                    } else {
                        toast.success("le produit a bien été mis à jour")
                    }
                })
            }
            toast.success("le produit a été envoyé avec succès");
            navigate("/accueil");
        }

    }
    return (
        <div>
            <Header2 />
            <form onSubmit={soumettreFormulaire}>
                <div class="mb-3">
                    <label for="name" class="form-label">Nom du produit</label>
                    <input type="text" name='name' onChange={changerValeurInput} value={name || ""} class="form-control" id="name" aria-describedby="emailHelp" />

                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Description du produit </label>
                    <input type="message" name='description' onChange={changerValeurInput} value={description || ""} class="form-control" id="email" aria-describedby="emailHelp" />

                </div>

                <div class="mb-3">
                    <label for="prix" class="form-label">Prix</label>
                    <input type="number" name='prix' onChange={changerValeurInput} value={prix || ""} class="form-control" id="contact" aria-describedby="emailHelp" />

                </div>

                {selectedImage && (
                    <div>
                        <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)} />
                        < br />
                    </div>
                )}


                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[1]);
                    }}
                />

                <input type="submit" class="btn btn-primary" value={id ? "Mettre à jour" : "Enregistrer"} />
            </form>
        </div>)
}


export default NewProducts;
