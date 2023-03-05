import BooksList from '../booksList/BooksList';
import BooksAddForm from '../booksAddForm/BooksAddForm';
import BooksFilters from '../booksFilters/BooksFilters';
import AppHeader from '../appHeader/appHeader';

import './app.scss';

const App = () => {
    
    return (
        <main className="app">
            <AppHeader/>
            <div className="content">
                <BooksList/>
                <div className="content__interactive">
                    <BooksAddForm/>
                    <BooksFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;