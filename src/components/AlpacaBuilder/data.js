export const AB_VIEWS = {
  intro: 'intro',
  categories: 'categories',
  styles: 'styles',
};

export const EXPORT_SIZE = 512;

export const CATEGORIES = [{
    name: 'chips',
    path: '/images/alpaca-builder/Chips/',
    reactComponent: true,
    styles: ['Chip1', 'Chip2', 'Chip3', 'Chip4', 'Chip5'],
    colors:[
      ['#000','#fff'],['#E6AF83','#D16C5C'],['#72AD97','#E6AF83'],['#fff','#000']
    ]
  },{
    name: 'body',
    path: '/images/alpaca-builder/Body/',
    styles: ['Body1'],
    colors:[
      ['#000','#fff'],['#E6AF83','#D16C5C'],['#72AD97','#E6AF83'],['#fff','#000']
    ]
  },{
    name: 'hairs',
    path: '/images/alpaca-builder/Hair/',
    styles: ['Hair1', 'Hair2', 'Hair3', 'Hair4', 'Hair5', 'Hair6', 'Hair7', 'Hair8', 'Hair9'],
    colors:[
      ['#fff','#fff'],['#E6AF83','#E6AF83'],['#72AD97','#72AD97'],['#000','#000']
    ]
  },{
    name: 'eyes',
    styles: ['Eyes1', 'Eyes2', 'Eyes3', 'Eyes4', 'Eyes5', 'Eyes6', 'Eyes7', 'Eyes8', 'Eyes9', 'Eyes10'],
    path: '/images/alpaca-builder/Eyes/',
  },{
    name: 'mouths',
    styles: ['Mouth1', 'Mouth2', 'Mouth3', 'Mouth4', 'Mouth5', 'Mouth6', 'Mouth7', 'Mouth8'],
    path: '/images/alpaca-builder/Mouth/',
    colors:[
      ['#fff','#fff'],['#E6AF83','#E6AF83'],['#72AD97','#72AD97'],['#000','#000']
    ],
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
