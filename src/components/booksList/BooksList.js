import {useHttp} from '../../hooks/http.hook'; 
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { createSelector } from '@reduxjs/toolkit';

import { bookDeleted, fetchBooks } from './booksSlice';

import BooksListItem from "../booksListItem/BooksListItem";
import Spinner from '../spinner/Spinner';

import './booksList.scss';

const BooksList = () => {

    const [value, setValue] = useState('');

    const filteredBooksSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.books.books,
        (filter, books) => {

            let meaning;

            if (filter !== 'all' && (value !== '' || value === '')) {
                meaning = books.filter(item => item.element === filter && item.name.toLowerCase().includes(value.toLowerCase()));
            } else if (filter === 'all') {
                meaning = books.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
            } else {
                meaning = books;
            }

            console.log(meaning); 
            return meaning;
        }
    );

    const filteredBooks = useSelector(filteredBooksSelector);
    const booksLoadingStatus = useSelector(state => state.books.booksLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchBooks());
        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/books/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(bookDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);

    if (booksLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (booksLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderBooksList = (arr) => {

        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Книг пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <BooksListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderBooksList(filteredBooks);
    return (
        
        <TransitionGroup component="ul">
            <form className="d-flex mt-0 mb-4">
                <div className="fs-4 p-1">Поиск по названию</div>
                <input
                class="input" 
                type="text"
                onChange={(event) => setValue(event.target.value)}/>
            </form>
                
            {elements}
        </TransitionGroup>
    )
}

export default BooksList;