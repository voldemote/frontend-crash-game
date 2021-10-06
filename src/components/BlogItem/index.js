import { useState, useEffect } from 'react';
import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';
import { useParams, useHistory } from 'react-router-dom';
import ContentFooter from 'components/ContentFooter';
import blogs from '../../data/blogs/blogs.json';
import marked from 'marked';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';

export default function BlogItem() {
  let history = useHistory();
  const { slug } = useParams();
  const blog = blogs[slug];
  if (!blog) {
    history.push('/');
  }

  const file_name = `${slug}.md`;
  const [post, setPost] = useState('');

  useEffect(() => {
    import(`../../data/blogs/${file_name}`)
      .then(res => {
        fetch(res.default)
          .then(res => res.text())
          .then(res => setPost(res))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <div className={styles.blogContainer}>
          <div className={styles.blogHeader}>
            <div className={styles.circle} />
            <div className={styles.blogInformations}>
              <div className={styles.blogCategory}>{blog.category}</div>
              <div>{blog.author}</div>
              <div className={styles.blogDateAgo}>{blog.date}</div>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <img src={blog.background} />
          </div>
          <div className={styles.blogDate}>{blog.date}</div>
          <div className={styles.blogContentContainer}>
            <div className="markdown-body" style={{ color: 'white' }}>
              <ReactMarkdown source={post}>{post}</ReactMarkdown>
            </div>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: marked(post, {
                  gfm: true,
                  tables: true,
                  breaks: true,
                  pedantic: true,
                  sanitize: true,
                  smartLists: true,
                  smartypants: true,
                }),
              }}
            /> */}
          </div>
        </div>

        <ContentFooter />
      </div>
    </BaseContainerWithNavbar>
  );
}
