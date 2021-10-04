import classNames from 'classnames';
import Link from 'components/Link';
import styles from './styles.module.scss';

export default function BlogCards({ blogs }) {
  const blog = blogs[0];
  return (
    <div className={styles.blogsContainer}>
      <div className={styles.blogs}>
        <div className={styles.wrapper}>
          <Link to={'/blog/test'} className={classNames(styles.gameLink)}>
            <div
              // key={index}
              className={classNames(styles.gameItem)}
            >
              <img src={blog.background} />
              <div className={styles.gameInfo}>
                {/* <div className={styles.subtitle}>{'game.subtitle'}</div> */}
                <div className={styles.title}>{'Blog title'}</div>
                <div className={styles.description}>{'Blog description'}</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
