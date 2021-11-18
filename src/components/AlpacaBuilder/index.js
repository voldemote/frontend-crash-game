import { useEffect, useState, memo } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import AbViewCategories from './abViewCategories';
import AbViewIntro from './abViewIntro';
import AbViewStyles from './abViewStyles';
import {AB_VIEWS, CATEGORIES} from './data';

const AlpacaBuilder = ({
  visible,
}) => {

  const [activeViews, setActiveViews] = useState([]);
  const [hidingView, setHidingView] = useState();
  const [showingView, setShowingView] = useState();
  const [svgProperties, setSvgProperties] = useState();
  const [currentCategory, setCurrentCategory] = useState();

  useEffect(() => {
    console.log('[alpacabuilder] show', visible)
    setActiveViews([])
    resetSvg();
    //setHidingView();
    if (visible) {
      pushView(AB_VIEWS.intro);
      //setShowingView(AB_VIEWS.intro);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const resetSvg = () => {
    let p = {};
    for(let c of CATEGORIES){
      p[c.name] = {style:null, colors:null};
    }
    setSvgProperties(p);
  }


  const pushView = (newView, props) =>{
    if(!newView) return;
    setShowingView(newView);
    setActiveViews([...activeViews, newView]);
    setTimeout(() => {
      setShowingView();
    }, 400);
  }

  const pullView = (newView) =>{
    if(activeViews.length <= 1) return;
    setHidingView(newView);
    setActiveViews(activeViews.filter(v => v !==  newView));
    setTimeout(() => {
      setHidingView();
    }, 400);
  }

  const getCssClass = (viewName) => {
    let classes = [styles.abView];
    if(activeViews.includes(viewName)) classes.push(styles.active);
    if(hidingView === viewName) classes.push(styles.hiding);
    if(showingView === viewName) classes.push(styles.showing);
    return classes;
  }

  const renderBackButton = () => {
    return (<a
      className={styles.backBtn}
      href="#/"
      onClick={() => pullView(activeViews[activeViews.length-1])}>Back</a>);
  }

  const selectCategory = (cat) => {
    setCurrentCategory(cat);
    pushView(AB_VIEWS.styles);
  }

  const applyStyle = (style) => {
    let p = {...svgProperties};
    p[currentCategory.name] = style;
    setSvgProperties(p);
  }

  return (
    <div
      className={classNames(
        styles.alpacaBuilder
      )}>
      <div className={styles.head}>
        <h2>Alpacabuilder</h2>
        {activeViews.length > 1 && (renderBackButton())}
        <div className={styles.svg}><pre>{JSON.stringify(svgProperties,null, 2)}</pre></div>
      </div>
      <div className={styles.viewsContainer}>
        <AbViewIntro
          cssClassNames={classNames(getCssClass(AB_VIEWS.intro))}
          onPushView={pushView}></AbViewIntro>
        <AbViewCategories
          cssClassNames={classNames(getCssClass(AB_VIEWS.categories))}
          onCategorySelected={selectCategory}></AbViewCategories>
        <AbViewStyles
          cssClassNames={classNames(getCssClass(AB_VIEWS.styles))}
          category={currentCategory}
          onStyleClick={applyStyle}
          current={currentCategory && svgProperties[currentCategory.name]}
          ></AbViewStyles>
      </div>
    </div>
  );
};

export default memo(AlpacaBuilder);
