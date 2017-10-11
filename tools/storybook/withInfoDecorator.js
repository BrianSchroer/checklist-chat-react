import { withInfo } from '@storybook/addon-info';

export default (story, context) => {
  return withInfo('info')(story)(context);
};
