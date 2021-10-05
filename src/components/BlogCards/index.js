import classNames from 'classnames';
import Link from 'components/Link';
import styles from './styles.module.scss';

export default function BlogCards({ blogs }) {
  const blog = blogs[0];
  return (
    <div className={styles.blogsContainer}>
      <div className={styles.blogs}>
        {blogs.map((blog, index) => (
          <div key={index} className={styles.wrapper}>
            <Link to={'/blog/test'} className={classNames(styles.gameLink)}>
              <div className={classNames(styles.blogItem)}>
                <div className={styles.blogHeader}>
                  <div className={styles.circle} />
                  <div className={styles.blogInformations}>
                    <div className={styles.blogCategory}>Category</div>
                    <div>Name of the writer</div>
                    <div className={styles.blogDate}>3 hours ago</div>
                  </div>
                </div>
                <div className={styles.blogTitle}>
                  Very long name of the main title of this article
                </div>
                <div className={styles.blogText}>
                  This is the classic game mode that put Counter-Strike on the
                  map. Two teams of five compete in a best-of-30 match using
                  standard competitive Counter-Strike rules.
                </div>
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
