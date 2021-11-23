import { useState, memo } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import {buildImagePath, CATEGORIES} from './data';
import DynamicSvg from './svgs/dynamicSvg';

const AbViewStyles = ({
  cssClassNames,
  category,
  current = {},
  onStyleClick,
  showCategories = true
}) => {

  const [selectedCategory, setSelectedCategory] = useState(category ?? CATEGORIES[0]);

  const onCategoryChanged = (cat) => {
    setSelectedCategory(cat);
  }

  const getCurrentCategory = () => current && current[selectedCategory?.name];

  const isStyleSelected = (style) => {
    const currentCat = getCurrentCategory();
    return currentCat?.style === style;
  }
  const isColorSelected = (colors) => {
    const currentCat = getCurrentCategory();
    return colors && colors[0] === currentCat?.colors[0] &&  colors[1] === currentCat?.colors[1];
  }

  const onStyleChanged = (style) =>{
    const currentCat = getCurrentCategory();
    onStyleClick(selectedCategory.name,{
      ...currentCat,
      style,
    })
  }

  const onColorChanged = (colorIndex) =>{
    const currentCat = getCurrentCategory();
    const colors = selectedCategory.colors && selectedCategory.colors[colorIndex];
    onStyleClick(selectedCategory.name, {
      ...currentCat,
      colors,
    })
  }

  const renderColorBtn = (index) => {
    const currentColors = selectedCategory.colors[index];
    const specificColorsCss = {
      borderRightColor: currentColors[0],
      borderBottomColor: currentColors[0],
      borderTopColor: currentColors[1],
      borderLeftColor: currentColors[1],
    };
    return (
      <a
        key={`abcatcolors_${index}`}
        className={classNames(styles.color, isColorSelected(currentColors) ? styles.colorSelected : null)}
        style={specificColorsCss}
        href="#/"
        onClick={()=> {onColorChanged(index)}}>{index}</a>
    );
  }

  const renderStyleBtn = (style) => {
    if(!style) return null;
    if(selectedCategory.previewInTiles){
      const id = `ab_cat_${style}`;
      const cat = {...getCurrentCategory(), style};
      return (<DynamicSvg key={id} id={id} current={cat} width="100%" height="100%"/>)
    }
    else{
      const svgPath = buildImagePath(selectedCategory.name, style);
      return (<img src={svgPath} alt={`${style}`}/>)
    }
  }

  const renderCategoryBtn = (cat, index) => {
    const isSelected = selectedCategory && selectedCategory.name === cat.name;
    return (
      <a
        key={`abcat_${index}`}
        className={classNames(styles.category, isSelected ? styles.categorySelected : null)}
        href="#/"
        onClick={()=> {onCategoryChanged(cat)}}>{cat.name}</a>
    );
  }

  const renderClearBtn = () => {
    //const svgPath = buildImagePath(selectedCategory.name, style);
    return (
      <a
        key={`ab_cat_remove`}
        className={classNames(styles.tile, isStyleSelected(null) ? styles.tileSelected : null)}
        href="#/"
        onClick={()=> {onStyleChanged(null)}}>Clear</a>
    );
  }

  return (

    <div className={cssClassNames}>
      {showCategories && (
        <div className={styles.categoriesRow}>
          {CATEGORIES?.map((c, index) => renderCategoryBtn(c, index))}
        </div>
      )}
      <div className={styles.tiles}>
        {selectedCategory.optional && renderClearBtn()}
        {selectedCategory.styles
          && selectedCategory.styles.length>1
          && selectedCategory.styles?.map((style,index) =>
            (<a
              key={`ab_cat_${style}`}
              className={classNames(styles.tile, isStyleSelected(style) ? styles.tileSelected : null)}
              href="#/"
              onClick={()=> {onStyleChanged(style)}}>
                {renderStyleBtn(style)}
            </a>))}
      </div>
      <div className={styles.colors}>
        {selectedCategory.colors?.map((c,index) => renderColorBtn(index))}
      </div>
    </div>
  );

};

export default memo(AbViewStyles);
