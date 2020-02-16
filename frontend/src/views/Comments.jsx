import React from 'react';
import Disqus from 'disqus-react';
// Alternatively, import specific members:
// import { DiscussionEmbed, CommentCount, CommentEmbed } from 'disqus-react';

 class Comments extends React.Component {
    render() {
        const disqusShortname = 'courses-3';
        const disqusConfig = {
            url: this.props.url,
            identifier: this.props.article_id,
            title: this.props.article_title,
        };

        return (
            <div className="article">
                <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
                    Comments
                </Disqus.CommentCount>
                               
                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
            </div>
        );
    }
}

export default Comments