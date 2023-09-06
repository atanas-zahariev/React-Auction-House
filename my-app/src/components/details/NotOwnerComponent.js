export default function NotOwner({ item }) {
    console.log(item);
    const user = item.user?._id;
    const bider = item.item.bider?._id === user;
    console.log(bider);
    return (
        <section id="catalog-section">

            <h1 className="item">
                {item.item.title}
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

                            {/* <!-- If current user is the bidder --> */}
                            {/* {{ #if username }} */}
                            {/* {{ #if currentHigherOffer }} */}
                            {user ?
                                <div>
                                    {bider ?
                                    <div>
                                        You are currently the <strong>highest bidder</strong> for this auction
                                    </div>:
                                    <form className="vertical" method="get">
                                        <label><span>Bid amount</span><input type="number" name="price" /></label>
                                        <input className="action" type="submit" value="Place bid" />
                                    </form>
                                    }
                                </div> :
                                null
                            }

                        </div>

                    </div>
                </div>

                <footer>
                    {user ?
                    <div>Listed by {item.user.username} </div>
                    :null
                }
                </footer>
            </div>

        </section>
    );
}