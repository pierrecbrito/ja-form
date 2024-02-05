import '../css/Card.css';
import $ from 'jquery'


function Card({titulo, body}) {

    return (
        <div className="card">
            <header className='card-header'>
                {titulo}
            </header>
            <main className='card-body'>
                {body}
            </main>
        </div>
    );
}

export default Card;