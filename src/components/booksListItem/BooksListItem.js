const BooksListItem = ({name, description, onDelete, img, author, evaluation}) => {

    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white bg-dark bg-gradient`}>
            <img src={img} 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown book" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <h3 className="card-title">{author}</h3>
                <p className="card-text">{description}</p>
                <p className="card-title">Оценка произведения: {evaluation}</p>
            </div>
            <span onClick={onDelete} 
                className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default BooksListItem;