import { Link } from 'react-router-dom';

export default function Owner({ item }) {
    //console.log(item);

    const bider = item.item.bider?._id === item.user._id;
    //console.log(bider);
    return (
        <section id="catalog-section">

            <h1 className="item">
                {item.item.title}
                <div className="f-right">
                    <Link className="action pad-small f-left" href="/house/edit/{{item._id}}">Edit</Link>
                    <Link className="action pad-small f-left" href="/house/delete/{{item._id}}">Delete</Link>
                </div>
            </h1>
            <div className="item padded">

                <div className="layout right large">

                    <div className="col">
                        <img src={item.item.imgUrl} className="img-large" alt="" />
                    </div>

                    <div className="content pad-med">

                        <p>In category: <strong>{item.item.category}</strong></p>
                        <p>Description</p>

                        <div className="align-center">
                            <div>
                                Current price: $<strong>{item.item.price}</strong>
                            </div>

                            <div>                               
                                {bider ?
                                    <div>
                                        Bid by <strong>bider.firstname</strong>
                                        <Link className="action pad-med cta" href="/house/userAction/{{item._id}}">Close Auction</Link>
                                    </div> :
                                    <div>
                                        No bids
                                    </div>}
                            </div>
                        </div>

                    </div>
                </div>

                <footer>
                    {bider ?
                    <div>Listed by {item.item.bider.firstname} {item.item.bider.lastname}</div>
                    :'Listed by Peter Jakson'
                    }
                </footer>
            </div>

        </section>
    );
}