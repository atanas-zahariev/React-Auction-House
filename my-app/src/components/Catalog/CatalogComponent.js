import { useContext, useEffect, useState } from 'react';
import { getAllDataInSystem } from '../../services/data';
import { Item } from './ItemComponent';

import { ErrorContext } from '../../contexts/ErrorContext';
import {AuthContext} from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Catalog() {
    const { getError,cleanError } = useContext(ErrorContext);
   const {onLogout} = useContext(AuthContext);
   const navigate = useNavigate();

    const [items, setItems] = useState({});

    useEffect(() => {

        cleanError();
        // eslint-disable-next-line
    },[]);

    useEffect(() => {

        async function fetchData() {
            try {
                const result = await getAllDataInSystem();
                setItems(items => ({ ...items, result }));
            } catch (error) {
                if (error[0] === 'Invalid authorization token') {
                    localStorage.clear();
                    onLogout();
                    navigate('/login');
                    return;
                }
                getError(['Something happened, please try again later']);
            }
        }
        fetchData();
    }, [getError, navigate, onLogout]);
   
    return (
        <section id="catalog-section" className="spaced">
            {items.result ?
                <ul className="catalog cards">
                    {items.result.items.map(x => <Item key={x._id} {...x} />)}
                </ul> :
                <div className="item pad-large align-center">
                    <p>Nothing has been listed yet. Be the first!</p>
                    <div>
                        <a className="action" href="/house/create">Publish Auction</a>
                    </div>
                </div>
            }

        </section>
    );
}