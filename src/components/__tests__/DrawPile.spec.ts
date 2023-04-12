import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import DrawPileComponent from '../DrawPileComponent.vue';

describe('DrawPileComponent', () => {
  const vuetify = createVuetify();
  const wrapper = mount(DrawPileComponent, {
    global: {
      plugins: [vuetify],
    },
  });

  it('renders the draw pile', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the image', async () => {
    const image = wrapper.find('.v-img');
    expect(image.exists()).toBe(true);
  });

  it('display the title', () => {
    expect(wrapper.find('.text-center').text()).toContain('Exploding');
  });
});
