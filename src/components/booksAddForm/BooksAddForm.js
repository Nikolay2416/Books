import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { bookCreated } from '../booksList/booksSlice';

const BooksAddForm = () => {
    // Состояния для контроля формы
    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [author, setAuthor] = useState('');
    const [element, setElement] = useState('');
    const [img, setImg] = useState('');

    const {filters, filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();

        // Генерация id через библиотеку
        const newBook = {
            id: uuidv4(),
            name: name,
            author: author,
            description: descr,
            element: element,
            img: img == '' || img == ' ' ? "https://png.pngtree.com/png-vector/20190117/ourlarge/pngtree-frequency-ask-question-iconblack-icon-color-png-image_323491.jpg" : img,
        }
        
        // Отправляем данные на сервер в формате JSON
        // ТОЛЬКО если запрос успешен - отправляем персонажа в store
        request("http://localhost:3001/books", "POST", JSON.stringify(newBook))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(bookCreated(newBook)))
            .catch(err => console.log(err));

        // Очищаем форму после отправки
        setName('');
        setDescr('');
        setAuthor('');
        setElement('');
        setImg('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка оценок</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        // Если фильтры есть, то рендерим их
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // Один из фильтров нам тут не нужен

                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Название книги</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Автор</label>
                <input 
                    required
                    type="text" 
                    name="author" 
                    className="form-control" 
                    id="author" 
                    placeholder=""
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Комментарий</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder=""
                    style={{"height": '130px'}}
                    value={descr}
                    onChange={(e) => setDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Ссылка на обложку книги</label>
                <input 
                    required
                    type="text" 
                    name="img" 
                    className="form-control" 
                    id="img" 
                    placeholder="В формате jpg"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Оценка</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)}>
                    <option value="">Оцените книгу...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Добавить</button>
        </form>
    )
}

export default BooksAddForm;