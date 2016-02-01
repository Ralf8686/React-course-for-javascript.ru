import React, { Component, PropTypes } from 'react'
import { comments } from '../stores'

import Select from 'react-select'
import "react-select/dist/react-select.css"

import { setFilterUser } from "../actions/commentActions"

class CommentsPage extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            filter: comments.getFilter(),
            comments: comments.getOrLoadForPage(this.props.params.num),
            users: comments.getAllUsers()
        }
    }

    componentDidMount() {
        comments.addListener(this.changeState)
    }

    componentWillUnmount() {
        comments.removeChangeListener(this.changeState)
    }

    componentWillReceiveProps(newProps) {
        this.changeState(newProps)
    }

    render() {
        let { comments } = this.state
        if (!comments || !comments.length) return <h3>Loading...</h3>
        const commetList = comments.map((comment) => {
            return <li key = {comment.id}>{comment.text} by {comment.user}</li>
        })
        return (
            <div>
                <Select
                    name="form-field-name"
                    value={this.state.filter}
                    options={this.getUserForSelect()}
                    onChange={setFilterUser}
                />
                <ul>{commetList}</ul>
            </div>
        )
    }

    getUserForSelect(){
        const users = this.state.users.map((el) => { return {value : el, label: el} })
        users.unshift({value: 'all', label: 'all'})
        return users
    }

    changeState = (props) => {
        this.setState({
            comments: comments.getOrLoadForPage((props || this.props).params.num),
            users: comments.getAllUsers(),
            filter: comments.getFilter(),
        })
    };
}

export default CommentsPage