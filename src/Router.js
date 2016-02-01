import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Container from './components/Container'
import CommentPage from './components/CommentPage'
import CommentPageList from './components/CommentPageList'
import CommentPageAll from './components/CommentPageAll'
import Article from './components/Article'
import ArticleIndex from './components/ArticleIndex'
import NotFound from './components/NotFound'
import NewArticle from './components/NewArticle'

export default (
    <Router history = {createBrowserHistory()}>
        <Route path="/articles" component = {Container} >
            <IndexRoute component={ArticleIndex} />
            <Route path="new" component={NewArticle} />
            <Route path=":id" component={Article}/>
        </Route>
        <Route path="/comments" component = {CommentPage} >
            <IndexRoute component={CommentPageAll} />
        	<Route path=":page" component={CommentPageList}/>
        </Route>
        <Route path = "*" component={NotFound} />
    </Router>
)
