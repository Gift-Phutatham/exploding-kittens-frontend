import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PlayerDisplayComponent from '@/components/PlayerDisplayComponent.vue';
import { createVuetify } from 'vuetify';
import BlackCatPlayer from '@/assets/images/players/BlackCatPlayer.jpeg';

describe('PlayerDisplayComponent', () => {
  const vuetify = createVuetify();

  it('renders the player name and image', () => {
    const wrapper = mount(PlayerDisplayComponent, {
      props: {
        name: 'Alice',
        selectedCharacterSrc: BlackCatPlayer,
        diedPlayer: [],
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.find('.player-name').text()).toBe('Alice');
    expect(wrapper.find('img').attributes('src')).toBe(BlackCatPlayer);
    // should still be visible
    expect(wrapper.classes()).not.toContain('v-card--disabled');
  });

  it('disables the player card if the name is in the diedPlayer array', () => {
    const wrapper = mount(PlayerDisplayComponent, {
      props: {
        name: 'Alice',
        selectedCharacterSrc: BlackCatPlayer,
        diedPlayer: ['Alice', 'Joe'],
      },
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.props('diedPlayer')).toContain('Alice');
    expect(wrapper.props('diedPlayer')).toContain('Joe');
    expect(wrapper.attributes('tabindex')).toBe('-1');
    // check if it disabled
    expect(wrapper.classes()).toContain('v-card--disabled');
  });
});
