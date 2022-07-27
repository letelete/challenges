import type { DatabaseSchema } from './types';

export const database: DatabaseSchema = {
  recipesToItems: {
    'coal|stick': { itemId: 'torch', amount: 1 },
  },
  items: {
    coal: {
      id: 'coal',
      name: 'Coal',
      image: {
        width: 48,
        height: 48,
        alt: 'Coal',
        src: '',
      },
    },
    stick: {
      id: 'stick',
      name: 'Stick',
      image: {
        width: 48,
        height: 48,
        alt: 'Stick',
        src: '',
      },
    },
    torch: {
      id: 'torch',
      name: 'Torch',
      image: {
        width: 48,
        height: 48,
        alt: 'Torch',
        src: '',
      },
    },
  },
};
