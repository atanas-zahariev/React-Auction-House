import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ErrorProvider } from './contexts/ErrorContext';

import Header from './components/HeaderComponents';
import Home from './components/HomeComponent';
import Login from './components/LoginComponent';
import Logout from './components/LogoutComponent';
import Error from './components/ErrorComponent';
import Register from './components/RegisterComponent';
import Catalog from './components/Catalog/CatalogComponent';

function App() {
  
  return (
    <AuthProvider>
      <ErrorProvider>
        <div id="page-content">
          <Header />
          <Error />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/register' element={<Register />} />
              <Route path='/catalog' element={<Catalog />} />
            </Routes>
          </main>

          <footer>SoftUni &copy; 2022 | Design by Viktor Kostadinov</footer>
        </div>
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;
