import { useEffect } from 'react'

const useSlider = (slideImage, slideText, slideTags, images) => {
    let slideCounter = 0;

    useEffect(() => startSlider())

    const startSlider =() => {
        slideImage.current.style.backgroundImage = `url(${images[0].src})`;
        slideText.current.innerHTML = images[0].text;
        slideTags.current.innerHTML = images[0].tags;
    }

    const handleSlide = (slide) => {
        slideImage.current.style.backgroundImage = `url(${images[slide - 1].src})`;
        slideText.current.innerHTML = images[slide - 1].text;
        slideTags.current.innerHTML = images[slide - 1].tags;
    }
    
    const goToPreviousSlide = () => {
        if (slideCounter === 0) {
            handleSlide(images.length)
            slideCounter = images.length;
        }
        
        handleSlide(slideCounter)         
        slideCounter--;
    }

    const goToNextSlide = () => {
      if (slideCounter === images.length - 1) {
        startSlider()
        slideCounter = -1;
      }

      slideImage.current.style.backgroundImage = `url(${images[slideCounter + 1].src})`;
      slideText.current.innerHTML = images[slideCounter + 1].text;
      slideTags.current.innerHTML = images[slideCounter + 1].tags;
      slideCounter++;
    }

    return { goToPreviousSlide, goToNextSlide }
}

export default useSlider