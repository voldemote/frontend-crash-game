import BaseContainerWithNavbar from 'components/BaseContainerWithNavbar';
import styles from './styles.module.scss';

import ContentFooter from 'components/ContentFooter';
import Link from 'components/Link';
import classNames from 'classnames';
import bgSrc from '../../data/backgrounds/blogs/test-blog-bg.png';
import BlogCards from 'components/BlogCards';

const Blog = () => {
  const blogs = [
    {
      background: bgSrc,
    },
  ];
  return (
    <BaseContainerWithNavbar withPaddingTop={true}>
      <div className={styles.container}>
        <BlogCards blogs={blogs}></BlogCards>
        <ContentFooter />
      </div>
    </BaseContainerWithNavbar>
  );
};

export default Blog;
