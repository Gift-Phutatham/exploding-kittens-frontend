import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import ChatComponent from '../ChatComponent.vue';

describe('ChatComponent', () => {
  const vuetify = createVuetify();
  const wrapper = mount(ChatComponent, {
    global: {
      plugins: [vuetify],
    },
  });

  it('render component', () => {
    expect(wrapper.exists()).toBe(true);
  });

});
