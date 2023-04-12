import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import PlayTwoOfAKindButton from '../../buttons/PlayTwoOfAKindButton.vue';

import { createVuetify } from 'vuetify';

describe('PlayTwoOfAKindButton', () => {
  const vuetify = createVuetify();

  it('renders properly', () => {
    const wrapper = mount(PlayTwoOfAKindButton, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.text()).toBe('Play 2 of a Kind');
  });
});
