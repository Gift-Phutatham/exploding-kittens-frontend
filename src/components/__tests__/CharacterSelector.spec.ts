import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CharacterSelector from '../CharacterSelector.vue';
import { createVuetify } from 'vuetify';
import BlackCatPlayer from '@/assets/images/players/BlackCatPlayer.jpeg';
import GrayCatPlayer from '@/assets/images/players/GrayCatPlayer.jpeg';
import OBCatPlayer from '@/assets/images/players/OBCatPlayer.jpeg';
import OrangeCatPlayer from '@/assets/images/players/OrangeCatPlayer.jpeg';

describe('CharacterSelector', () => {
  const vuetify = createVuetify();

  it('renders properly', () => {
    const wrapper = mount(CharacterSelector, {
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.card-style').exists()).toBe(true);
    expect(wrapper.find('.card-title-style').text()).toBe('Select Character');
    expect(wrapper.findAll('.character-card')).toHaveLength(4);
  });

  it('emits select-character event with correct image source when character card is clicked', async () => {
    const wrapper = mount(CharacterSelector, {
      global: {
        plugins: [vuetify],
      },
    });

    // Simulate clicking the first character card
    await wrapper.findAll('.character-card')[0].trigger('click');

    // Ensure selected character is set to 1 and the event was emitted with the correct image source
    expect(wrapper.vm.selectedCharacter).toBe(1);
    expect(wrapper.emitted('select-character')![0][0]).toBe(BlackCatPlayer);

    // Simulate clicking the second character card
    await wrapper.findAll('.character-card')[1].trigger('click');

    // Ensure selected character is set to 2 and the event was emitted with the correct image source
    expect(wrapper.vm.selectedCharacter).toBe(2);
    expect(wrapper.emitted('select-character')![1][0]).toBe(GrayCatPlayer);

    // Simulate clicking the third character card
    await wrapper.findAll('.character-card')[2].trigger('click');

    // Ensure selected character is set to 3 and the event was emitted with the correct image source
    expect(wrapper.vm.selectedCharacter).toBe(3);
    expect(wrapper.emitted('select-character')![2][0]).toBe(OBCatPlayer);

    // Simulate clicking the forth character card
    await wrapper.findAll('.character-card')[3].trigger('click');

    // Ensure selected character is set to 4 and the event was emitted with the correct image source
    expect(wrapper.vm.selectedCharacter).toBe(4);
    expect(wrapper.emitted('select-character')![3][0]).toBe(OrangeCatPlayer);
  });
});
