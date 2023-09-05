export function Item({
   x
}){
    return (
        <li className="item">
        <header className="pad-med">
            <h2>{x.title}</h2>
        </header>

        <div className="align-center">
            <img className="img-thumb" src={x.imgUrl} alt="" />
        </div>

        <footer className="align-center pad-med">
            <p>Current price: <strong>${x.price}</strong></p>
            <a className="action" href="/house/details/{{_id}}">See details</a>
        </footer>
    </li>
    );
}