import BooksList from '../booksList/BooksList';
import BooksAddForm from '../booksAddForm/BooksAddForm';
import BooksFilters from '../booksFilters/BooksFilters';

import './app.scss';

const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                <BooksList/>
                <div className="content__interactive">
                    <BooksFilters/>
                    <BooksAddForm/>
                </div>
            </div>
        </main>
    )
}

export default App;