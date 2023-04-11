import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import PlayNopeButton from '../../buttons/PlayNopeButton.vue';

import { createVuetify } from 'vuetify';

describe('PlayNopeButton', () => {
  const vuetify = createVuetify();

  it('renders properly', () => {
    const wrapper = mount(PlayNopeButton, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toBe('Play Nope');
  });
});
