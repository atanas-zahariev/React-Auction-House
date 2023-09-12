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
import Details from './components/details/DetailsComponent';
import CloseOffer from './components/CloseOfferComponent';
import UserClosedOffers from './components/UserClosedOffersComponent';
import EditItem from './components/EditItemComponent';
import Create from './components/CreateComponent';
import { ItemsProvider } from './contexts/itemsContext';
import { AuthGuard } from './guards/UserGuard';

function App() {

  return (
    <AuthProvider>
      <ErrorProvider>
        <ItemsProvider>
          <div id="page-content">
            <Header />
            <Error />
            <main>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/catalog' element={<Catalog />} />
                <Route path='/details/:id' element={<Details />} />

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route element={<AuthGuard />}>
                  <Route path='/logout' element={<Logout />} />
                  <Route path='/create' element={<Create />} />
                  <Route path='/closed' element={<UserClosedOffers />} />
                  <Route path='/userAction/:id' element={<CloseOffer />} />
                  <Route path='/edit/:id' element={<EditItem />} />
                </Route>

              </Routes>
            </main>

            <footer>SoftUni &copy; 2022 | Design by Viktor Kostadinov</footer>
          </div>
        </ItemsProvider>
      </ErrorProvider>
    </AuthProvider>
  );
}

export default App;
