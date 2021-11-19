import { useEffect, useState, memo, useRef } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import AbViewCategories from './abViewCategories';
import AbViewIntro from './abViewIntro';
import AbViewStyles from './abViewStyles';
import {AB_VIEWS, BASE_BODY_URL, CATEGORIES, buildImagePath} from './data';
import "external-svg-loader";

const AlpacaBuilder = ({
  visible,
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

  const renderSvg = () =>
    svgProperties && Object.keys(svgProperties)
    .map((catName, index) => {
       const current = svgProperties[catName];
       const svgPath = buildImagePath(catName, current?.style)
       const cssStyle = {
          "--color_fill": current.colors[0]
       };
      //  return current.style && (<>
      //   <image href={svgPath} key={`svg_abuilder_${index}`} alt='alpaca features' style={cssStyle} src={svgPath}/>
      //   <use href="#Rectangle" x="10" fill="blue"/>
      //   </>);
      // return current.style && (<>
      //   <use href={svgPath} key={`svg_abuilder_${index}`} alt='alpaca features' style={cssStyle} ></use>
      //   </>);
      return current.style && (<>
        <g data-src={svgPath} fill="currentColor" data-cache="disabled"

        style={{
          color: current.colors[0],
          opacity:0.5,
        }}></g>
        </>);
    });

    function triggerDownload (imgURI) {
      var evt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
      });

      var a = document.createElement('a');
      a.setAttribute('download', 'MY_COOL_IMAGE.png');
      a.setAttribute('href', imgURI);
      a.setAttribute('target', '_blank');

      a.dispatchEvent(evt);
    }

  const exportSvg = () => {
    try{
    var svg = svgRef.current;
    var canvas = svgDownloader.current;


    var ctx = canvas.getContext('2d');
    var data = (new XMLSerializer()).serializeToString(svg);
    var DOMURL = window.URL || window.webkitURL || window;
    var img = new Image();
    var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svgBlob);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);

      var imgURI = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');

      triggerDownload(imgURI);
    };

    img.src = url;



    //var svg = document.getElementById("svg");

    //get svg source.
    // var serializer = new XMLSerializer();
    // var source = serializer.serializeToString(svg);

    // var svgBlob = new Blob([source], {type: 'image/svg+xml;charset=utf-8'});

    // //add name spaces.
    // // if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
    // //     source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    // // }
    // // if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
    // //     source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    // // }

    // // //add xml declaration
    // // source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    // // //convert svg source to URI data scheme.
    // // var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    // var DOMURL = window.URL || window.webkitURL || window;
    // var url = DOMURL.createObjectURL(svgBlob);
    // const link = document.createElement("a");
    //       link.href = url;
    //       link.setAttribute("download", "image.png"); //or any other extension
    //       document.body.appendChild(link);
    //       link.click();
    // //set url value to a element's href attribute.
 //   link.href = url;
    // var win = window.open();
    // win.document.write('<iframe src="' + url  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');

    //you can download svg file by right click menu.
    }catch(err){
      console.log(err);
    }
  };

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
        <div className={styles.toolbar}>
          {activeViews.length > 1 && (renderBackButton())}
          <a

            className={styles.saveBtn}
            href="#/"
            onClick={() => exportSvg()}>Save</a>
        </div>
        {/* <svg>
          <image href="/images/alpaca-builder/Mouth/Mouth_4.svg" src="/images/alpaca-builder/Mouth/Mouth_4.svg" width="100" height="100" />
        </svg> */}
        <svg ref={svgRef} className={styles.svg} viewBox="0 0 512 512">
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
          current={currentCategory && svgProperties[currentCategory.name]}
          ></AbViewStyles>
      </div>
      <canvas ref={svgDownloader} style={{visibility:"hidden"}}></canvas>
    </div>
  );
};

export default memo(AlpacaBuilder);
