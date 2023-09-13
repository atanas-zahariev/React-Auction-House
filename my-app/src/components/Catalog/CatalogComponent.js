import { useContext, useEffect, useState } from 'react';

import { Item } from './ItemComponent';

import { ErrorContext } from '../../contexts/ErrorContext';

import { DataContext } from '../../contexts/DataContext';

export default function Catalog() {
    const { getError, cleanError } = useContext(ErrorContext);

    const { getAllDataInSystem } = useContext(DataContext);

    const [items, setItems] = useState({});

    
    
    useEffect(() => {
        cleanError();

        async function fetchData() {
            try {
                const result = await getAllDataInSystem();
                setItems(items => ({ ...items, result }));
            } catch (error) {              
                getError(['Something happened, please try again later']);
            }
        }
        
        fetchData();
        // eslint-disable-next-line
    }, [getError]);

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