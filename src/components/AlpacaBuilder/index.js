import { useEffect, useState, memo } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import AbViewCategories from './abViewCategories';
import AbViewIntro from './abViewIntro';
import AbViewStyles from './abViewStyles';
import {AB_VIEWS, BASE_BODY_URL, CATEGORIES, buildImagePath} from './data';

const AlpacaBuilder = ({
  visible,
}) => {

  const [activeViews, setActiveViews] = useState([]);
  const [hidingView, setHidingView] = useState();
  const [showingView, setShowingView] = useState();
  const [svgProperties, setSvgProperties] = useState();
  const [currentCategory, setCurrentCategory] = useState();

  useEffect(() => {
    setActiveViews([])
    resetSvg(true);
    if (visible) {
      pushView(AB_VIEWS.styles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const resetSvg = (randomize) => {
    let p = {};
    for(let c of CATEGORIES){
      const style = randomize ? c.styles[Math.floor(Math.random() * c.styles.length)] : null;
      const colors = randomize ? c.colors[Math.floor(Math.random() * c.colors.length)] : null;
      p[c.name] = {style, colors};
    }
    setSvgProperties(p);
  }


  const pushView = (newView) =>{
    if(!newView) return;
    setShowingView(newView);
    setActiveViews([...activeViews, newView]);
    setTimeout(() => {
      setShowingView();
    }, 400);
  }

  const popView = (newView) =>{
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
      onClick={() => popView(activeViews[activeViews.length-1])}>Back</a>);
  }

  const selectCategory = (cat) => {
    setCurrentCategory(cat);
    pushView(AB_VIEWS.styles);
  }

  const applyStyle = (categoryName, style) => {
    let p = {...svgProperties};
    p[categoryName] = style;
    setSvgProperties(p);
    console.log(JSON.stringify(svgProperties,null, 2));
  }

  const renderSvg = (filterCat = () => true) =>
    svgProperties && Object.keys(svgProperties)
    .filter(filterCat)
    .map((catName, index) => {
       const current = svgProperties[catName];
       const svgPath = buildImagePath(catName, current?.style)
       return current.style && (<img key={`svg_abuilder_${index}`} alt='alpaca features' src={svgPath}/>);
    });


  return (
    <div
      className={classNames(
        styles.alpacaBuilder
      )}>
      <div className={styles.head}>
        <h2>Alpacabuilder
          <a
            href="#/"
            onClick={() => resetSvg(true)}> <em>Randomize</em></a>
        </h2>
        {activeViews.length > 1 && (renderBackButton())}
        <div className={styles.svg}>
          {renderSvg(c => c === "chips")}
          <img src={BASE_BODY_URL} alt="your alpacavatar"/>
          {renderSvg(c => c !== "chips")}
        </div>
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
