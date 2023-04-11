import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CharacterSelector from '../CharacterSelector.vue';
import { createVuetify } from 'vuetify';

describe('CharacterSelector', () => {
  const vuetify = createVuetify();

  it('renders properly', () => {
    const wrapper = mount(CharacterSelector, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('emits select-character event on character selection', async () => {
    const wrapper = mount(CharacterSelector, {
      global: {
        plugins: [vuetify],
      },
    });
    await wrapper.find('.character-card:nth-child(2)').trigger('click');
    expect(wrapper.emitted()['select-character']![0][0]).toContain('GrayCatPlayer.jpeg');
  });

  it('applies selected class on character selection', async () => {
    const wrapper = mount(CharacterSelector, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.find('.character-card.selected').exists()).toBe(false);
    await wrapper.find('.character-card:nth-child(3)').trigger('click');
    expect(wrapper.find('.character-card.selected').exists()).toBe(true);
  });
});
