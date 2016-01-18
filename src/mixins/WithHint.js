import React, {Component} from 'react'
import Hint from '../components/Hint'

export var WithHint = ComposedComponent => class extends Component {
    state = {
        text: undefined,
        x: undefined,
        y: undefined
    }
    hideHint = () => {
        this.setState({ text: undefined })
    }
    showHint = (text) => {
        return (ev) => {
            const { left, bottom, width } = ev.target.getBoundingClientRect()
            const y = bottom
            const x = left

            this.setState({ text, x, y })
        }
    }
    getHint = () => {
        return this.state && this.state.text ? <Hint {...this.state} /> : null
    }
    render() {
        return <ComposedComponent
                      hideHint={this.hideHint}
                      showHint={this.showHint}
                      getHint={this.getHint}
                      {...this.state}
                      {...this.props}
                />;
    }
};