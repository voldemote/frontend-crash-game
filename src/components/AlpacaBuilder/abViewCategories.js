import { useEffect, memo } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { AB_VIEWS, CATEGORIES } from './data';

const AbViewCategories = ({
  visible,
  cssClassNames,
  onCategorySelected
}) => {
  useEffect(() => {
    console.log('[alpacabuilder-mainview] show', visible)
    if (visible) {

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);


  const onCategoryClick = (cat) => {
    onCategorySelected(cat);
  }

  const renderCategoryBtn = (cat, index) => {
    return (
      <a key={`abcat_${index}`} className={styles.tile} href="#/" onClick={()=> {onCategoryClick(cat)}}>{cat.name}</a>
    );
  }


  return (
    <div className={cssClassNames}>
      <div className={styles.tiles}>
        {CATEGORIES?.map((c, index) => renderCategoryBtn(c, index))}
      </div>
    </div>
  );
};

export default memo(AbViewCategories);
