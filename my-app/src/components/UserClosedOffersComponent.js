import { useContext, useEffect, useState } from 'react';
import { getTotalAction } from '../services/data';
import { ErrorContext } from '../contexts/ErrorContext';

export default function UserClosedOffers() {
    const { getError } = useContext(ErrorContext);
    const [offers, setOffers] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getTotalAction();
                setOffers(result);
            } catch (error) {                
                getError(error);
            }
        }

       fetchData();
    },[getError]);
   console.log(offers);
    return (
        <section id="catalog-section" className="spaced">

            <h1 className="item">Closed Auctions</h1>

            {/* <!-- List of closed auctions for the current user --> */}
            {/* {{#if items}} */}
            <ul className="catalog cards">
                {/* {{#each items}} */}
                <li className="item">
                    <header className="pad-med">
                        <h2> title </h2>
                    </header>

                    <div className="align-center">

                        <img className="img-thumb" src="{imgUrl}" alt="" />

                    </div>

                    <footer className="align-center pad-med">
                        <p>Closing price: <strong>$price</strong></p>
                        from bider.firstname bider.lastname
                    </footer>
                </li>
                {/* {{/each}} */}
            </ul>

            {/* <!-- If the current user doesn't have closed auctions ---> */}
            {/* {{else}} */}
            <div className="item pad-large align-center">
                <p>You haven't closed any auctions yet.</p>
            </div>
            {/* {{/if}} */}
        </section>
    );
}