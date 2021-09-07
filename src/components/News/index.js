import styles from './styles.module.scss';
import classNames from 'classnames';
import { matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon from '../Icon';

const News = ({}) => {
  const news = useSelector(state => state.event.newsData) || [];
  return (
    <div className={styles.newsTicker}>
      {news.map(({ title, description, url, source }) => (
        <div key={title} className={styles.newsItem}>
          <div className={styles.newsTitle}>{title}</div>
          <div className={styles.newsDesc}>{description}</div>
          <a className={styles.newsLink} href={url} target="_blank">
            <Icon iconType={'activities'} iconTheme={'white'} /> Read more on{' '}
            {source}
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
