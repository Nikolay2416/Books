import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                Прочитанные книги
            </h1>
            <div className="app__search">
                <div className="app__search-text">Поиск</div>
                <div className="app__input">
                    <input type="text"/>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;