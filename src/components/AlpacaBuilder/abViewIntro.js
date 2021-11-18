import { useEffect, memo } from 'react';
import styles from './styles.module.scss';
import { AB_VIEWS } from './data';


const AbViewIntro = ({
  visible,
  onPushView,
  cssClassNames
}) => {
  useEffect(() => {
    console.log('[alpacabuilder-mainview] show', visible)
    if (visible) {

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);


  return (
    <div className={cssClassNames}>
      <h3>This is the Intro View</h3>
      <a onClick={() => onPushView(AB_VIEWS.categories)}>Customize</a>
    </div>
  );
};

export default memo(AbViewIntro);
