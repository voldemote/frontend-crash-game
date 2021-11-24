import {ReactComponent as Chip1} from './Chips/Chip1.svg';
import {ReactComponent as Chip2} from './Chips/Chip2.svg';
import {ReactComponent as Chip3} from './Chips/Chip3.svg';
import {ReactComponent as Chip4} from './Chips/Chip4.svg';
import {ReactComponent as Chip5} from './Chips/Chip5.svg';

import {ReactComponent as Body1} from './Body/Body1.svg';

import {ReactComponent as Mouth1} from './Mouth/Mouth1.svg';
import {ReactComponent as Mouth2} from './Mouth/Mouth2.svg';
import {ReactComponent as Mouth3} from './Mouth/Mouth3.svg';
import {ReactComponent as Mouth4} from './Mouth/Mouth4.svg';
import {ReactComponent as Mouth5} from './Mouth/Mouth5.svg';
import {ReactComponent as Mouth6} from './Mouth/Mouth6.svg';
import {ReactComponent as Mouth7} from './Mouth/Mouth7.svg';
import {ReactComponent as Mouth8} from './Mouth/Mouth8.svg';

import {ReactComponent as Hair1} from './Hair/Hair1.svg' ;
import {ReactComponent as Hair2} from './Hair/Hair2.svg' ;
import {ReactComponent as Hair3} from './Hair/Hair3.svg' ;
import {ReactComponent as Hair4} from './Hair/Hair4.svg' ;
import {ReactComponent as Hair5} from './Hair/Hair5.svg' ;
import {ReactComponent as Hair6} from './Hair/Hair6.svg' ;
import {ReactComponent as Hair7} from './Hair/Hair7.svg' ;
import {ReactComponent as Hair8} from './Hair/Hair8.svg' ;
import {ReactComponent as Hair9} from './Hair/Hair9.svg' ;

import {ReactComponent as Eyes1} from './Eyes/Eyes1.svg' ;
import {ReactComponent as Eyes2} from './Eyes/Eyes2.svg' ;
import {ReactComponent as Eyes3} from './Eyes/Eyes3.svg' ;
import {ReactComponent as Eyes4} from './Eyes/Eyes4.svg' ;
import {ReactComponent as Eyes5} from './Eyes/Eyes5.svg' ;
import {ReactComponent as Eyes6} from './Eyes/Eyes6.svg' ;
import {ReactComponent as Eyes7} from './Eyes/Eyes7.svg' ;
import {ReactComponent as Eyes8} from './Eyes/Eyes8.svg' ;
import {ReactComponent as Eyes9} from './Eyes/Eyes9.svg' ;
import {ReactComponent as Eyes10} from './Eyes/Eyes10.svg' ;

import {ReactComponent as Glasses1} from './Glasses/Glasses1.svg' ;
import {ReactComponent as Glasses2} from './Glasses/Glasses2.svg' ;
import {ReactComponent as Glasses3} from './Glasses/Glasses3.svg' ;
import {ReactComponent as Glasses4} from './Glasses/Glasses4.svg' ;
import {ReactComponent as Glasses5} from './Glasses/Glasses5.svg' ;
import {ReactComponent as Glasses6} from './Glasses/Glasses6.svg' ;
import {ReactComponent as Glasses7} from './Glasses/Glasses7.svg' ;

const allComponents = {
  Chip1, Chip2, Chip3, Chip4, Chip5,
  Body1,
  Mouth1,Mouth2,Mouth3,Mouth4,Mouth5,Mouth6,Mouth7,Mouth8,
  Hair1,Hair2,Hair3,Hair4,Hair5,Hair6,Hair7,Hair8,Hair9,
  Eyes1,Eyes2,Eyes3,Eyes4,Eyes5,Eyes6,Eyes7,Eyes8,Eyes9,Eyes10,
  Glasses1,Glasses2,Glasses3,Glasses4,Glasses5,Glasses6,Glasses7
 };

const DynamicSvg = ({ id, current, ...rest }) => {
    if(!current) return null;
    const { style, colors } = current
    const Component = allComponents[style];
    if(!Component) {
      console.error(`The style ${style} doesn't have an svg defined in the AlpacaBuilder>svgs react svg components.`)
      return null;
    }
    if(!style) return null;
    let stringBuilder = ['','',''];
    // override the fill color with css selector #id #abColor_1_1 ... #id #abColor_1_10
    if(colors){
      const times = 10;
      for(let i=0; i<=times; i++){
        const des = i === 0 ? '':`_${i}`;
        stringBuilder[0]+= `#${id} #abColor_1${des}`;
        stringBuilder[1]+= `#${id} #abColor_2${des}`;
        stringBuilder[2]+= `#${id} #abColor_3${des}`;
        const continuation1 = i === times ?  `{fill:${colors[0]}}`: ', ';
        const continuation2 = i === times ?  `{fill:${colors[1] || colors[0]}}`: ', ';
        const continuation3 = i === times ?  `{fill:${colors[0]}}`: ', ';
        stringBuilder[0]+= continuation1;
        stringBuilder[1]+= continuation2;
        stringBuilder[2]+= continuation3;
      }
    }
    return (
      <svg id={id} key={id} {...rest}>
        <style>
          {stringBuilder.join(' ')}
        </style>
        <Component {...rest}/>
      </svg>
    );
};

export default DynamicSvg;
