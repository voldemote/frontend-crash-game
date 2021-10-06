import { ReactComponent as ElonOnRocketSvg } from '../data/icons/elon-on-rocket.svg';

export const ELON_GAME_STEPS = [
  {
    number: '01',
    title: 'Place a bet',
    description: 'Set the amount of your bet',
    marginLeftText: -30,
  },
  {
    number: '02',
    title: 'Wait until next round starts',
    description: `You'll see a countdown on the game screen`,
    imageText: 'Starting in 24.30',
    svg: <ElonOnRocketSvg width={105} height={105} />,
    marginLeftImage: -20,
  },
  {
    number: '03',
    title: 'Take profit before Elon explodes',
    description: 'If Elon explodes before you take profit, you lose your bet',
  },
];
