import React, {Component} from 'react'

export var Toggle = ComposedComponent => class extends Component {
    state = {
        isOpen: false
    }
    toggle = (ev) =>{
        ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return <ComposedComponent
                      superToggle={this.toggle}
                      {...this.state}
                      {...this.props}
                />;
    }
};