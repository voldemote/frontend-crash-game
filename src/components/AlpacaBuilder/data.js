export const AB_VIEWS = {
  intro: 'intro',
  categories: 'categories',
  styles: 'styles',
};

export const BASE_BODY_URL = '/images/alpaca-builder/base body.svg';

export const CATEGORIES = [{
    name: 'chips',
    path: '/images/alpaca-builder/Chips/',
    styles: ['Chip_1', 'Chip_2', 'Chip_3', 'Chip_4', 'Chip_5'],
    colors:[
      ['#472D38','#D6D9BA'],['#E6AF83','#D16C5C'],['#72AD97','#E6AF83']
    ]
  },{
    name: 'body',
    path: '/images/alpaca-builder/Body/',
    styles: ['Body1'],
    colors:[
      ['#472D38','#D6D9BA'],['#E6AF83','#D16C5C'],['#72AD97','#E6AF83']
    ]
  },{
    name: 'hairs',
    path: '/images/alpaca-builder/Hair/',
    styles: ['Hair_1', 'Hair_2', 'Hair_3', 'Hair_4', 'Hair_5', 'Hair_6', 'Hair_7', 'Hair_8', 'Hair_9'],
    colors:[
      ['#472D38','#D6D9BA'],['#E6AF83','#D16C5C'],['#72AD97','#E6AF83']
    ]
  },{
    name: 'eyes',
    styles: ['Eyes_1', 'Eyes_2', 'Eyes_3', 'Eyes_4', 'Eyes_5', 'Eyes_6', 'Eyes_7', 'Eyes_8', 'Eyes_9'],
    path: '/images/alpaca-builder/Eyes/',
    colors:[
      ['#472D38','#D6D9BA'],['#E6AF83','#D16C5C'],['#72AD97','#E6AF83']
    ]
  },{
    name: 'mouths',
    path: '/images/alpaca-builder/Mouth/',
    styles: ['Mouth_1', 'Mouth_2', 'Mouth_3', 'Mouth_4', 'Mouth_5', 'Mouth_6', 'Mouth_7', 'Mouth_8'],
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
