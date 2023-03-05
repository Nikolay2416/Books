import {useHttp} from '../../hooks/http.hook'; 
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { createSelector } from '@reduxjs/toolkit';

import { bookDeleted, fetchBooks } from './booksSlice';

import BooksListItem from "../booksListItem/BooksListItem";
import Spinner from '../spinner/Spinner';

import './booksList.scss';

const BooksList = () => {

    const filteredBooksSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.books.books,
        (filter, books) => {
            if (filter === 'all') {
                return books;
            } else {
                return books.filter(item => item.element === filter);
            }
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
        console.log(arr)
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
            {elements}
        </TransitionGroup>
    )
}

export default BooksList;