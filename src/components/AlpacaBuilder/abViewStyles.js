import { useState, memo, useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import {buildImagePath, CATEGORIES} from './data';

const AbViewStyles = ({
  cssClassNames,
  category,
  current = {},
  onStyleClick,
  showCategories = true
}) => {

  const [selectedStyle, setSelectedStyle] = useState(current.style);
  const [selectedColors, setSelectedColors] = useState(current.colors);
  const [selectedCategory, setSelectedCategory] = useState(category ?? CATEGORIES[0]);

  const onCategoryChanged = (cat) => {
    console.log('setting cat', cat)
    setSelectedCategory(cat);
  }

  const onStyleChanged = (style) =>{
    const colors = selectedColors ?? selectedCategory.colors[0];
    setSelectedStyle(style);
    setSelectedColors(colors);
    onStyleClick(selectedCategory.name,{
      style,
      colors,
    })
  }

  const onColorChanged = (colorIndex) =>{
    const style = selectedStyle ?? selectedCategory.styles[0];
    const colors = selectedCategory.colors[colorIndex];
    setSelectedStyle(style);
    setSelectedColors(colors);
    onStyleClick(selectedCategory.name, {
      style,
      colors,
    })
  }

  // useEffect(() => {
  //   if(current?.style && !selectedStyle) setSelectedStyle(current.style);
  //   if(current?.colors && !selectedColors) setSelectedColors(current.colors);
  //   if(category && !selectedCategory) setSelectedCategory(category);
  //   console.log('[abviewstyles] onload?', current, category)
  // }, [category, selectedCategory, setSelectedCategory, setSelectedStyle, setSelectedColors, current, selectedColors, selectedStyle]);

  const renderColorBtn = (index) => {
    const currentColors = selectedCategory.colors[index];
    const isSelected = selectedColors && selectedColors[0] === currentColors[0] &&  selectedColors[1] === currentColors[1];
    const specificColorsCss = {
      borderRightColor: currentColors[0],
      borderBottomColor: currentColors[0],
      borderTopColor: currentColors[1],
      borderLeftColor: currentColors[1],
    };
    return (
      <a
        key={`abcatcolors_${index}`}
        className={classNames(styles.color, isSelected ? styles.colorSelected : null)}
        style={specificColorsCss}
        href="#/"
        onClick={()=> {onColorChanged(index)}}>{index}</a>
    );
  }

  const renderStyleBtn = (style) => {
    const svgPath = buildImagePath(selectedCategory.name, style);
    return (
      <a
        key={`ab_cat_${style}`}
        className={classNames(styles.tile, selectedStyle === style ? styles.tileSelected : null)}
        href="#/"
        onClick={()=> {onStyleChanged(style)}}><img src={svgPath} alt={`${style}`}/></a>
    );
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

  return (

    <div className={cssClassNames}>
      <div className={styles.colors}>
        {selectedCategory.colors?.map((c,index) => renderColorBtn(index))}
      </div>
      <div className={styles.tiles}>
        {selectedCategory.styles?.map((style,index) => renderStyleBtn(style))}
      </div>
      {showCategories && (
        <div className={styles.categoriesRow}>
          {CATEGORIES?.map((c, index) => renderCategoryBtn(c, index))}
        </div>
      )}
    </div>
  );

};

export default memo(AbViewStyles);
