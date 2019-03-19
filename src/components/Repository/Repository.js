import React from 'react'

import './Repository.css'
import Issues from '../Issues'

const Repository = ({
    id,
    login,
    name,
    url,
    renderIssues,
    issuesRenderedId,
    issues
}) =>
    <div className="repository">
        <a
            className="repository__link"
            href={url}
            target="__blank"
            onMouseOver={() => renderIssues(id, issuesRenderedId)}
        >
            {name}
        </a>
        {
            issues[id] &&
            <div className="repository__issues">
                <Issues
                    login={login}
                    repoName={name}
                />
            </div>
        }
    </div>

export default Repository