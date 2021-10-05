import classNames from 'classnames';
import Link from 'components/Link';
import styles from './styles.module.scss';

import ReactTimeAgo from 'react-time-ago';

export default function BlogCards({ blogs }) {
  //   const blog = blogs[0];
  return (
    <div className={styles.blogsContainer}>
      <div className={styles.blogs}>
        {blogs.map((blog, index) => (
          <div key={index} className={styles.wrapper}>
            <Link
              to={`/blog/${blog.slug}`}
              className={classNames(styles.gameLink)}
            >
              <div className={classNames(styles.blogItem)}>
                <div className={styles.blogHeader}>
                  <div className={styles.circle} />
                  <div className={styles.blogInformations}>
                    <div className={styles.blogCategory}>{blog.category}</div>
                    <div>{blog.author}</div>
                    <div className={styles.blogDate}>
                      {/* {blog.date} */}
                      <ReactTimeAgo date={blog.date} locale="en-US" />
                    </div>
                  </div>
                </div>
                <div className={styles.blogTitle}>{blog.title}</div>
                <div className={styles.blogText}>{blog.text}</div>
                <div className={styles.imgContainer}>
                  <img src={blog.background} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
