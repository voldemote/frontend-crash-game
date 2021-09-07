import styles from './styles.module.scss';
import classNames from 'classnames';
import { matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon from '../Icon';

const News = ({}) => {
  const news = useSelector(state => state.event.newsData.articles);
  return (
    <div className={styles.newsTicker}>
      {news.map(item => (
        <div key={item.title} className={styles.newsItem}>
          <div className={styles.newsTitle}>{item.title}</div>
          <div className={styles.newsDesc}>{item.description}</div>
          <a className={styles.newsLink} href={item.url} target="_blank">
            <Icon iconType={'activities'} iconTheme={'white'} /> Read more on{' '}
            {item.source.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
