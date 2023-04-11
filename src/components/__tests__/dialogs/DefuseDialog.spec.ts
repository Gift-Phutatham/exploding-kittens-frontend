import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import DefuseDialog from '@/components/dialogs/DefuseDialog.vue';

import { createVuetify } from 'vuetify';

describe('DefuseDialog', () => {
  const vuetify = createVuetify();

  it('renders properly', () => {
    const wrapper = mount(DefuseDialog, {
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.openDialog).toBe(true);
    expect(wrapper.vm.themeColor).toBe('#232321');
    expect(wrapper.find('.v-btn').exists()).toBe(true);
    expect(wrapper.find('.text-h6').text()).toBe('You got a card from another player.');
  });

  it('emits onClose event and closes dialog when "Done" button is clicked', async () => {
    const wrapper = mount(DefuseDialog, {
      global: {
        plugins: [vuetify],
      },
    });

    await wrapper.find('.v-btn').trigger('click');
    expect(wrapper.vm.openDialog).toBe(false);
    expect(wrapper.emitted('onClose')).toBeTruthy();
  });
});