import './App.css';
import { Routes, Route } from 'react-router-dom';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Accueil from './pages/Accueil';
import NewProducts from './pages/NewProducts'
import AfficherProduit from './pages/AfficherProduit';
import EditerProduit from './pages/EditerProduit'


function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" />
          <Routes>
            <Route path='/examen-firebase' element={<Connexion />} />
            <Route path='/register' element={<Inscription />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/new" element={<NewProducts />} />
            <Route path='/afficher:id' element={<AfficherProduit />} />
            <Route path='/editer:id' element={<EditerProduit />} />

          </Routes>
          
    </div>
  );
}

export default App;
