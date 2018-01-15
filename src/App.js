import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import SearchComponent from './Search'
import BooksList from './BooksList'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books});
      this.setState({ currentlyReading: books.filter(book => book.shelf === 'currentlyReading')});
      this.setState({ wantToRead: books.filter(book => book.shelf === 'wantToRead')});
      this.setState({ read: books.filter(book => book.shelf === 'read')})
    });
  }

  updateShelf(book, e){
    BooksAPI.update(book, e.target.value).then(() => {
      BooksAPI.getAll().then(books => {
        this.setState({ currentlyReading: books.filter(book => book.shelf === 'currentlyReading')});
        this.setState({ wantToRead: books.filter(book => book.shelf === 'wantToRead')});
        this.setState({ read: books.filter(book => book.shelf === 'read')})
      });
    });
  }

  render() {
    return (
      <div className="app">
      <Route path="/search" component={() => (
        <SearchComponent update={(book, shelf) => this.updateShelf(book, shelf)} />
      )} />
      <Route exact path="/" render={() => (
        <BooksList
          update={(book, shelf) => this.updateShelf(book, shelf)}
          books={this.state.books}
          currentlyReading={this.state.currentlyReading}
          wantToRead={this.state.wantToRead}
          read={this.state.read}/>
      )} />
      </div>
    )
  }
}

export default BooksApp
