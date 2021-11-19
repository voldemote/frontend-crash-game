export const AB_VIEWS = {
  intro: 'intro',
  categories: 'categories',
  styles: 'styles',
};

export const BASE_BODY_URL = '/images/alpaca-builder/base body.svg';

export const CATEGORIES = [{
    name: 'chips',
    path: '/images/alpaca-builder/chips/',
    styles: ['chip_1', 'chip_2', 'chip_3', 'chip_4', 'chip_5'],
    colors:[
      ['#472D38','#D6D9BA'],['#E6AF83','#D16C5C'],['#72AD97','#E6AF83']
    ]
  },{
    name: 'hairs',
    path: '/images/alpaca-builder/hair/',
    styles: ['hair_1', 'hair_2', 'hair_3', 'hair_4', 'hair_5', 'hair_6', 'hair_7', 'hair_8', 'hair_9'],
    colors:[
      ['#472D38','#D6D9BA'],['#E6AF83','#D16C5C'],['#72AD97','#E6AF83']
    ]
  },{
    name: 'eyes',
    styles: ['eyes_1', 'eyes_2', 'eyes_3', 'eyes_4', 'eyes_5', 'eyes_6', 'eyes_7', 'eyes_8'],
    path: '/images/alpaca-builder/eyes/',
    colors:[
      ['#472D38','#D6D9BA'],['#E6AF83','#D16C5C'],['#72AD97','#E6AF83']
    ]
  },{
    name: 'mouths',
    path: '/images/alpaca-builder/mouths/',
    styles: ['mouth_1', 'mouth_2', 'mouth_3', 'mouth_4', 'mouth_5', 'mouth_6', 'mouth_7', 'mouth_8', 'mouth_9'],
    colors:[
      ['#472D38','#D6D9BA'],['#E6AF83','#D16C5C'],['#72AD97','#E6AF83']
    ]
  }
];

/**
 * Returns the full url of the image based on the category name and style name
 * @param  {} categoryName
 * @param  {} styleName
 */
export const buildImagePath = (categoryName, styleName) => {
  if(!categoryName || !styleName) return null;
  const basePath = CATEGORIES.find(c => c.name === categoryName)?.path;
  const svgPath = `${basePath}${styleName}.svg`;
  return basePath ? svgPath : null;
}
