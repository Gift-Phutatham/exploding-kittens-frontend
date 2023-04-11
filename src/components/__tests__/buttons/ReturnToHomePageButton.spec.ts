import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import ReturnToHomePageButton from '../../buttons/ReturnToHomePageButton.vue';

import { createVuetify } from 'vuetify';

describe('ReturnToHomePageButton', () => {
  const vuetify = createVuetify();

  it('renders properly', () => {
    const wrapper = mount(ReturnToHomePageButton, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toBe('Home Page');
  });
});
