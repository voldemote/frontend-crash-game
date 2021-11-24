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
      ['#29313D','#346553'],['#29313D','#ffffff'],['#29313D','#B43F3F'],
      ['#E6B71A','#ffffff'],['#D78A23','#ffffff'],['#3D0937','#ffffff'],
      ['#29313D','#7067AC'],['#093D2F','#ffffff'],['#29313D','#C96EBF'],
      ['#29313D','#D78A23'],['#29313D','#3F89B4']
    ]
  },{
    name: 'body',
    path: '/images/alpaca-builder/Body/',
    styles: ['Body1'],
    colors:[
      ['#FEFFCF','#999999'],['#ffffff','#999999'],['#FFCECE','#999999'],
      ['#B5FFC9','#B5FFC9'],['#B5FFC9','#FF0101'],['#CECBCE','#423434'],
      ['#70FF00','#7C7070'],['#00FFE0','#7C7070'],['#FAFF00','#7C7070'],
      ['#ED7CFF','#7C7070'],['#FF7CD3','#7C7070'],['#00D1FF','#7C7070'],
      ['#00D1FF','#F80D0D'],['#70FF00','#F80D0D'],['#B6B6B6','#0075FF'],
      ['#555555','#DBFF00'],['#2BFFCC','#DBFF00'],
    ]
  },{
    name: 'hair',
    path: '/images/alpaca-builder/Hair/',
    styles: ['Hair1', 'Hair2', 'Hair3', 'Hair4', 'Hair5', 'Hair6', 'Hair7', 'Hair8', 'Hair9'],
    colors:[
      ['#FEFFCF'],['#ffffff'],['#B5FFC9'],['#CECBCE'],['#70FF00'],
      ['#00FFE0'],['#FAFF00'],['#ED7CFF'],['#FF7CD3'],['#00D1FF'],
      ['#555555'],['#2BFFCC'],
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
