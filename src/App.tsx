import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import TabsNav from './components/TabsNav/TabsNav';
import GeneralPage from './pages/GeneralPage/GeneralPage';
import ProducerPage from './pages/ProducerPage/ProducerPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import FinalPage from './pages/FinalPage/FinalPage';
import Footer from './components/summary/Footer/Footer';

function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = ['/general', '/productor', '/productos', '/final'];
  const idx = order.indexOf(location.pathname);
  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;

  return (
    <div className='row'>
        <h2 className='col-sm-8'>Products Entry App</h2>
      <div className='col-sm-4' style={{display: 'flex', justifyContent: 'flex-end'}}>
        <button
          className='btn btn-secondary'
          style={{marginRight: '10px'}}
          disabled={!prev}
          onClick={() => prev && navigate(prev)}
        >
          Anterior
        </button>
        <button
          className='btn btn-primary'
          disabled={!next}
          onClick={() => next && navigate(next)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div id="app-container" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <main style={{flex: 1}}>
          <div className='container py-3'>
            <TopBar />
            <TabsNav />
            <Routes>
              <Route path='/' element={<Navigate to='/general' replace />} />
              <Route path='/general' element={<GeneralPage />} />
              <Route path='/productor' element={<ProducerPage />} />
              <Route path='/productos' element={<ProductsPage />} />
              <Route path='/final' element={<FinalPage />} />
              <Route path='*' element={<Navigate to='/general' replace />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
