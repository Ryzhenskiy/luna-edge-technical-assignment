import type { Preview } from '@storybook/react';
import '../src/index.css';

import myTheme from './myTheme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
        expanded: true,
      },
    },
  },
};

export default preview;
