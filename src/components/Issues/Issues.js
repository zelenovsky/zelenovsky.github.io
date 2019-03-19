import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import './Issues.css'

const GET_ISSUES = gql`
    query getIssues($repoName: String!, $login: String! ) {
        repository(name: $repoName, owner: $login) {
            issues(first: 5) {
                nodes {
                    id
                    title
                    state
                    body
                    url
                }
            }
        }
    }
`

const Issues = ({ login, repoName }) =>
    <Query
        query={GET_ISSUES}
        variables={{ repoName, login }}
    >
        {({ loading, err, data }) => {
            if (loading) return <p>Loading Issues...</p>
            if (err) return <pre>{err}</pre>
            if (!data) return <p>Not Found</p>

            const issues = data.repository.issues.nodes

            return issues.map(issue =>
                <div className="issue" key={issue.id}>
                    <a
                        className="issue__link"
                        href={issue.url}
                        target="__blank"
                    >
                        <h3 className="issue__title">{issue.title}</h3>
                        <span className={
                            issue.state === 'OPEN'
                                ? 'issue__state opened'
                                : 'issue__state closed'}
                        >
                            {issue.state}
                        </span>
                        <div className="issue__body">
                            {issue.body}
                        </div>
                    </a>
                </div>
            )
        }}
    </Query>

export default Issues