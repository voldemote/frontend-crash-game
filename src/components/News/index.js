import styles from './styles.module.scss';
import classNames from 'classnames';
import { matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../Button';

const News = ({}) => {
  const news = useSelector(state => state.event.newsData.articles);
  return (
    <div className={styles.newsTicker}>
      {news.map(item => (
        <div key={item.title} className={styles.newsItem}>
          <div className={styles.newsTitle}>{item.title}</div>
          <div className={styles.newsDesc}>{item.description}</div>
          <Button className={styles.readButton}>Read</Button>
        </div>
      ))}
    </div>
  );
};

export default News;
