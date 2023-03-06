import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    books: [],
    booksLoadingStatus: 'idle'
}

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/books");
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        bookCreated: (state, action) => {
            state.books.push(action.payload);
        },
        bookDeleted: (state, action) => {
            state.books = state.books.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, state => {state.booksLoadingStatus = 'loading'})
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.booksLoadingStatus = 'idle';
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, state => {
                state.booksLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = booksSlice;

export default reducer;
export const {
    booksFetching,
    booksFetched,
    booksFetchingError,
    bookCreated,
    bookDeleted
} = actions;