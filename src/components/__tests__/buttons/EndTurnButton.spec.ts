import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import EndTurnButton from '../../buttons/EndTurnButton.vue';

import { createVuetify } from 'vuetify';

describe('EndTurnButton', () => {
  const vuetify = createVuetify();

  it('renders properly', () => {
    const wrapper = mount(EndTurnButton, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toBe('End Turn');
  });
});
