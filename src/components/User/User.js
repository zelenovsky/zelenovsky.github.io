import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import './User.css'
import Repository from '../Repository';

const GET_USER_INFO = gql`
    query getUserInfo($login: String!) {
        user(login: $login) {
            url
            avatarUrl
            repositories(first: 5) {
                edges {
                    node {
                        id
                        name
                        url
                    }
                    cursor
                }
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                }
            }
        }
    }
`

class User extends Component {
    state = {
        login: this.props.login,
        issues: {}
    }

    renderIssues = (activeIssueId, issuesRenderedId) => {
        this.setState({
            issues: {
                ...issuesRenderedId,
                [activeIssueId]: true
            }
        })
    }

    render() {
        const {
            login,
            issues
        } = this.state

        const issuesRenderedId = {}

        return (
            <Query
                query={GET_USER_INFO}
                variables={{ login }}>
                {({ loading, err, data, fetchMore }) => {
                    if (loading) return <p>Loading User...</p>
                    if (err) return <pre>{err}</pre>
                    if (!data) return <p>Not Found</p>
                    const repos = data.user.repositories

                    return (
                        <div className="user">
                            <div className="user__info">
                                <a href={data.user.url} target="__blank">
                                    <div className="user__avatar">
                                        <img src={data.user.avatarUrl} alt="avatar" />
                                    </div>
                                    <div className="user__name">
                                        {login}
                                    </div>
                                </a>
                            </div>
                            <div className="user__repositories">
                                {repos.edges.map(repo => {

                                    issuesRenderedId[repo.node.id] = false

                                    return <Repository
                                        key={repo.node.id}
                                        id={repo.node.id}
                                        name={repo.node.name}
                                        url={repo.node.url}
                                        login={login}
                                        renderIssues={this.renderIssues}
                                        issuesRenderedId={issuesRenderedId}
                                        issues={issues}
                                    />
                                })}
                            </div>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default User