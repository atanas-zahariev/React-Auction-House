import { useEffect, useState } from 'react';
import { getAllDataInSystem } from '../../services/data';
import { Item } from './ItemComponent';

export default function Catalog() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getAllDataInSystem().then(result => {
            setItems(items => [...items, result]);
        });
    }, []);
   
    return (
        <section id="catalog-section" className="spaced">
            {items.length > 0 ?
                <ul className="catalog cards">
                   {items[0].items.map(x => <Item key={x._id} x={x}/>)}
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