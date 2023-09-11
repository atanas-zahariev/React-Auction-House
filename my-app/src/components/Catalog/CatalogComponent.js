import { useContext, useEffect, useState } from 'react';
import { getAllDataInSystem } from '../../services/data';
import { Item } from './ItemComponent';
import { ErrorContext } from '../../contexts/ErrorContext';

export default function Catalog() {
    const { getError,cleanError } = useContext(ErrorContext);
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
                getError(['Something happened, please try again later']);
            }
        }
        fetchData();
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