import { useEffect, useState, memo, useRef, createElement } from 'react';

import classNames from 'classnames';
import styles from './styles.module.scss';
import AbViewCategories from './abViewCategories';
import AbViewIntro from './abViewIntro';
import AbViewStyles from './abViewStyles';
import {AB_VIEWS, CATEGORIES, EXPORT_SIZE} from './data';
import DynamicSvg from './svgs/dynamicSvg';

const AlpacaBuilder = ({
  visible = false,
  showTitle = true,
  onExport
}) => {

  const [activeViews, setActiveViews] = useState([]);
  const [hidingView, setHidingView] = useState();
  const [showingView, setShowingView] = useState();
  const [svgProperties, setSvgProperties] = useState();
  const [currentCategory, setCurrentCategory] = useState();
  const svgRef = useRef();
  const svgDownloader = useRef();

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
      const colors = c.colors && (randomize ? c.colors[Math.floor(Math.random() * c.colors.length)] : null);
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
    console.log('onStyleChanged', categoryName, style);
    let p = {...svgProperties};
    p[categoryName] = style;
    setSvgProperties(p);
    console.log(JSON.stringify(svgProperties,null, 2));
  }

  const renderSvg = () =>
    svgProperties && Object.keys(svgProperties)
    .map((catName, index) => {
      const current = svgProperties[catName];
      if(!current.style) return null;
      const id = `svg_abuilder_${catName}_${index}`;
      return (<DynamicSvg key={id} id={id} current={current}/>);
    });

  const exportSvg = () => {
    try{
      var svg = svgRef.current;
      var canvas = svgDownloader.current;
      canvas.width =EXPORT_SIZE;
      canvas.height=EXPORT_SIZE;
      var ctx = canvas.getContext('2d');
      var data = (new XMLSerializer()).serializeToString(svg);
      var DOMURL = window.URL || window.webkitURL || window;
      var img = new Image();
      var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
      var url = DOMURL.createObjectURL(svgBlob);
      if(onExport){
        onExport({blob:svgBlob});
      }
      img.onload = function () {
        ctx.drawImage(img, 0, 0, EXPORT_SIZE, EXPORT_SIZE);
        DOMURL.revokeObjectURL(url);
        var imgURI = canvas
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');

        var evt = new MouseEvent('click', {
          view: window,
          bubbles: false,
          cancelable: true
        });

        var a = document.createElement('a');
        a.setAttribute('download', 'my_alpaca.png');
        a.setAttribute('href', imgURI);
        a.setAttribute('target', '_blank');
        a.dispatchEvent(evt);
      };
      img.src = url;
    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
    <div
      className={classNames(
        styles.alpacaBuilder
      )}>
      <div className={styles.head}>
        {showTitle && (<h2>Alpacabuilder</h2>)}
        <div className={styles.toolbar}>
          {/* {activeViews.length > 1 && (renderBackButton())} */}
          <a
            className={styles.saveBtn}
            href="#/"
            onClick={() => exportSvg()}>Save</a>
          <a
            href="#/"
            onClick={() => resetSvg(true)}>Random</a>
        </div>
        <svg ref={svgRef} className={styles.svg} viewBox="0 0 512 512">
          <rect width="100%" height="100%" fill="white" />
          {renderSvg()}
        </svg>
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
          current={svgProperties}
          ></AbViewStyles>
      </div>

    </div>
    <canvas ref={svgDownloader} style={{visibility:"hidden", height:0, backgroundColor:"white"}}></canvas>
    </>
  );
};

export default memo(AlpacaBuilder);
