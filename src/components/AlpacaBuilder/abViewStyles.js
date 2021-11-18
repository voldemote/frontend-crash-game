import { useState, memo, useEffect } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const AbViewStyles = ({
  cssClassNames,
  category = {},
  current = {},
  onStyleClick
}) => {

  const [selectedStyle, setSelectedStyle] = useState(current.style);
  const [selectedColors, setSelectedColors] = useState(current.colors);

  const onStyleChanged = (index) =>{
    const style = `${category.name}_${index+1}`;
    const colors = selectedColors ?? category.colors[0];
    setSelectedStyle(index);
    setSelectedColors(colors);
    onStyleClick({
      style,
      colors,
    })
  }

  const onColorChanged = (colorIndex) =>{
    const colors = category.colors[colorIndex];
    const style = `${category.name}_${selectedStyle+1}`;
    setSelectedColors(colors);
    onStyleClick({
      style,
      colors
    })
  }

  useEffect(() => {
    setSelectedColors(current?.colors);
    setSelectedStyle(current?.style);
  }, [current]);

  const renderStyleBtn = (index) => {
    const style = `${category.name}_${index+1}`;
    return (
      <a
        key={`abcatstyle_${index}`}
        className={classNames(styles.tile, selectedStyle === style ? styles.tileSelected : null)}
        href="#/"
        onClick={()=> {onStyleChanged(index)}}>{style}</a>
    );
  }

  const renderColorBtn = (index) => {
    const isSelected = selectedColors && selectedColors[0] === category.colors[index][0] &&  selectedColors[1] === category.colors[index][1];
    return (
      <a
        key={`abcatcolors_${index}`}
        className={classNames(styles.color, isSelected ? styles.colorSelected : null)}
        href="#/"
        onClick={()=> {onColorChanged(index)}}>{index}</a>
    );
  }

  return (

    <div className={cssClassNames}>
      {JSON.stringify(current)}
      <div className={styles.colors}>
        {category.colors?.map((c,index) => renderColorBtn(index))}
      </div>
      <div className={styles.tiles}>
        {new Array(category.styles).fill(0).map((c,index) => renderStyleBtn(index))}
      </div>
    </div>
  );

};

export default AbViewStyles;
