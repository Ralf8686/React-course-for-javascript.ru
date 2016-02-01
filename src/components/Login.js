import linkedState from 'react-addons-linked-state-mixin'
import { addUser } from '../actions/userActions'
import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import { users } from '../stores'
const Login = React.createClass({
    mixins: [linkedState],
    getInitialState() {
        return {
            username: ''
        }
    },
    componentDidMount() {
        users.addListener(this.redirect)
    },
    componentWillUnmount() {
        users.removeChangeListener(this.redirect)
    },
    contextTypes : {
        history: PropTypes.object
    },
    render: function() {
        return (
            <div>
                <Link to="/articles/new">New article</Link>
                <input valueLink = {this.linkState("username")}/>
                <a href = "#" onClick = {this.addUser}> login</a>
            </div>

        )
    },
    addUser(ev) {
        ev.preventDefault()
        addUser({
            name: this.state.username
        })
    },
    redirect() {
        this.context.history.pushState(null, '/articles/new')
    }
});

export default Login