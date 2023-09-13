import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ErrorProvider } from './contexts/ErrorContext';
import { ApiProvider } from './contexts/ApiContext';
import { DataProvider } from './contexts/DataContext';

import Header from './components/common/HeaderComponents';
import Home from './components/common/HomeComponent';
import Error from './components/common/ErrorComponent';

import Login from './components/auth/LoginComponent';
import Register from './components/auth/RegisterComponent';
import Logout from './components/auth/LogoutComponent';

import Create from './components/action/CreateComponent';
import EditItem from './components/action/EditItemComponent';
import CloseOffer from './components/action/CloseOfferComponent';

import Catalog from './components/Catalog/CatalogComponent';
import Details from './components/details/DetailsComponent';

import UserClosedOffers from './components/closed-offers/UserClosedOffersComponent';


import { AuthGuard } from './guards/UserGuard';
import { GuestGuard } from './guards/GuestGuard';

function App() {

  return (
    <AuthProvider>
      <ErrorProvider>
        <ApiProvider>
          <DataProvider>
            <div id="page-content">
              <Header />
              <Error />
              <main>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/catalog' element={<Catalog />} />
                  <Route path='/details/:id' element={<Details />} />

                  <Route element={<GuestGuard />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                  </Route>

                  <Route element={<AuthGuard />}>
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/edit/:id' element={<EditItem />} />
                    <Route path='/userAction/:id' element={<CloseOffer />} />
                    <Route path='/closed' element={<UserClosedOffers />} />
                  </Route>

                </Routes>
              </main>

              <footer>SoftUni &copy; 2022 | Design by Viktor Kostadinov</footer>
            </div>
          </DataProvider>
        </ApiProvider>
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;
