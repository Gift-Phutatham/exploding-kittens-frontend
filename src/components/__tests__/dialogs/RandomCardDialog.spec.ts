import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import RandomCardDialog from '../../dialogs/RandomCardDialog.vue';

import { createVuetify } from 'vuetify';

describe('RandomCardDialog', () => {
  const vuetify = createVuetify();

  it('renders properly', async () => {
    const wrapper = mount(RandomCardDialog, {
      global: {
        plugins: [vuetify],
      },
    });
    expect(wrapper.vm.openDialog).toBe(true);
    // expect(wrapper.vm.$vuetify.display).toContain('You got a card from another player.');
    expect(wrapper.vm.themeColor).toBe('#232321');
    wrapper.find('.v-btn').trigger('click');
    expect(wrapper.vm.openDialog).toBe(false);
    expect(wrapper.emitted().onClose).toBeTruthy();
  });
});
