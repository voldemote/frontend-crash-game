export const AB_VIEWS = {
  intro: 'intro',
  categories: 'categories',
  styles: 'styles',
};

export const EXPORT_SIZE = 512;

export const CATEGORIES = [{
    name: 'chip',
    path: '/images/alpaca-builder/Chips/',
    previewInTiles: true,
    styles: ['Chip1', 'Chip2', 'Chip3', 'Chip4', 'Chip5'],
    colors:[
      ['#000','#fff'],['#e9004f','#fff'],['#1783e7','#fff'], ['#72bb4e', '#fff'],['#e9004f','#ecdb49'],['#1783e7','#8c8c8c'], ['#72bb4e', '#b3d448']
    ]
  },{
    name: 'body',
    path: '/images/alpaca-builder/Body/',
    styles: ['Body1'],
    colors:[
      ['#fef6ee','#ddd'],['#af7c54','#ddd'],['#3b2a26','#ddd'],['#fec428','#ddd']
    ]
  },{
    name: 'hair',
    path: '/images/alpaca-builder/Hair/',
    styles: ['Hair1', 'Hair2', 'Hair3', 'Hair4', 'Hair5', 'Hair6', 'Hair7', 'Hair8', 'Hair9'],
    colors:[
      ['#fef6ee','#fef6ee'],['#af7c54','#af7c54'],['#3b2a26','#3b2a26']
    ]
  },{
    name: 'eyes',
    styles: ['Eyes1', 'Eyes2', 'Eyes3', 'Eyes4', 'Eyes5', 'Eyes6', 'Eyes7', 'Eyes8', 'Eyes9', 'Eyes10'],
    path: '/images/alpaca-builder/Eyes/',
  },{
    name: 'mouth',
    styles: ['Mouth1', 'Mouth2', 'Mouth3', 'Mouth4', 'Mouth5', 'Mouth6', 'Mouth7', 'Mouth8'],
    path: '/images/alpaca-builder/Mouth/',
    useColorFrom: 'body'
  },{
    name: 'glasses',
    styles: ['Glasses1', 'Glasses2', 'Glasses3', 'Glasses4', 'Glasses5', 'Glasses6', 'Glasses7'],
    path: '/images/alpaca-builder/Glasses/',
    optional: true,
  },
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
