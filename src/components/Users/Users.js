import React, { Component } from "react"
import { generate } from 'shortid'

import './Users.css'
import User from '../User'

class Users extends Component {
    componentDidMount() {
        window.addEventListener("scroll", this.handleOnScroll)
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleOnScroll)
    }

    handleOnScroll = () => {
        var scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        var scrollHeight =
            (document.documentElement && document.documentElement.scrollHeight) ||
            document.body.scrollHeight
        var clientHeight =
            document.documentElement.clientHeight || window.innerHeight
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
        if (scrolledToBottom) {
            this.props.onLoadMore()
        }
    }

    render() {
        const { entries, loading } = this.props
        if (!entries && loading) return <p>Loading....</p>

        return (
            <div className="users">
                <div className="users__count">Total count: {entries.userCount}</div>
                {
                    entries.edges.map(edge =>
                        edge.textMatches.map(text =>
                            text.property === 'login' &&
                            <div className="users__row" key={generate()}>
                                <User login={text.fragment} />
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default Users