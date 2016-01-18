import React, {Component} from 'react'

export var Toggle = ComposedComponent => class extends Component {
    state = {
        isOpen : false
    }
    superToggle = (ev) =>{
        ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return <ComposedComponent
                      superToggle={this.superToggle}
                      {...this.state}
                      {...this.props}
                />;
    }
};