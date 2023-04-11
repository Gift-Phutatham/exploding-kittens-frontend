import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import PlayButton from '../../buttons/PlayButton.vue';

import { createVuetify } from 'vuetify';

describe('PlayButton', () => {
  const vuetify = createVuetify();

  it('renders properly', () => {
    const wrapper = mount(PlayButton, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toBe('Play');
  });
});
