import styles from './styles.module.scss';
import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon';

// timer ref must outlive render, otherwise a memory leak occurs
let nextSlideTimer = null;

const CoverFlowCarousel = ({ children, currentSlide = 0, slideDurationSeconds = 10, onSlideChange = (index) => {} }) => {
  const numOfPages = children.length;

  if(slideDurationSeconds > 0) {
    nextSlideTimer = window.setTimeout(
      () => setCurrentSlideIndex(
        getNextIndex(currentSlideIndex)
      ),
      slideDurationSeconds * 1_000
    );
  }
  
  const [currentSlideIndex, setCurrentIndex] = useState(currentSlide);

  const setCurrentSlideIndex = (newIndex) => {
    window.clearTimeout(nextSlideTimer);
    nextSlideTimer = null;

    setCurrentIndex(newIndex);
    onSlideChange(newIndex);
  }

  const getPreviousIndex = (index) => index === 0 ? numOfPages - 1 : index -1;
  const getNextIndex = (index) => index === numOfPages - 1 ? 0 : index + 1;

  return (
    <div className={styles.sliderContainer}>
      {children.map((el, index) => (
        <div
          key={index}
          className={classNames(
            styles.slide,
            currentSlideIndex === index && styles.slideCurrent,
            index === getPreviousIndex(currentSlideIndex) && styles.slidePrevious,
            index === getNextIndex(currentSlideIndex) && styles.slideNext,
          )}
          data-slide-index={index}
        >
          {el}
        </div>
      ))}

      <button
        className={styles.previousSlideButton}
        onClick={() => setCurrentSlideIndex(getPreviousIndex(currentSlideIndex))}
      >
        <Icon iconType={'arrowLeft'}/>
      </button>
      <button
        className={styles.nextSlideButton}
        onClick={() => setCurrentSlideIndex(getNextIndex(currentSlideIndex))}
      >
        <Icon iconType={'arrowLeft'}/>
      </button>
      
      <div
        className={styles.slideSelector}
      >
        {
          children.map((_, i) => (
            <button
              key={i}
              className={classNames(styles.slideButton, currentSlideIndex === i && styles.selectedSlideButton)}
              onClick={() => setCurrentSlideIndex(i)}
            >
            </button>
          ))
        }
      </div>
    </div>
  )
}


export default CoverFlowCarousel;