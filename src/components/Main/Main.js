import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import './Main.css'
import Users from '../Users'

const GET_USERS = gql`
    query getUsers($inputText: String!, $cursor: String) {
        search(query: $inputText, type: USER, first: 10, after: $cursor) {
            userCount

            edges {
                textMatches {
                    highlights {
                        text
                    }
                    property
                    fragment
                }
            }

            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
        }
    }
`

const Main = ({ inputText }) =>
    <main className="main">
        <div className="container">
            <div className="content">
                <Query
                    query={GET_USERS}
                    variables={{ inputText }}>

                    {({ loading, err, data, fetchMore }) => {
                        if (err) return <pre>{err}</pre>

                        const search = data.search

                        return <Users
                            loading={loading}
                            entries={search}
                            onLoadMore={() =>
                                fetchMore(
                                    {
                                        variables: {
                                            inputText,
                                            cursor: search.pageInfo.endCursor
                                        },
                                        updateQuery: (prevResult, { fetchMoreResult }) => {
                                            const newEdges = fetchMoreResult.search.edges;
                                            const pageInfo = fetchMoreResult.search.pageInfo;
                                            return newEdges.length
                                                ? {
                                                    search: {
                                                        __typename: prevResult.search.__typename,
                                                        edges: [...prevResult.search.edges, ...newEdges],
                                                        pageInfo
                                                    }
                                                }
                                                : prevResult;
                                        }
                                    }
                                )
                            }
                        />
                    }}
                </Query>
            </div>
        </div>
    </main>

export default Main