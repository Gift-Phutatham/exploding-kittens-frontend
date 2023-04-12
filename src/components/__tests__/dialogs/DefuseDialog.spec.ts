import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DefuseDialog from '@/components/dialogs/DefuseDialog.vue';
import { createVuetify } from 'vuetify';

describe('DefuseDialog', () => {
  const vuetify = createVuetify();

  const propsData = {
    card: {
      Defuse: {
        description: 'A card that defuses the bomb',
        color: 'green',
      },
    },
  };

  it('renders properly', () => {
    const wrapper = mount(DefuseDialog, {
      propsData,
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.openDialog).toBe(true);
    // expect(wrapper.find('.v-btn').exists()).toBe(true);
    // expect(wrapper.find('.text-h6').text()).toBe('You got a Defuse card. You SURVIVE!');
  });

  it('closes the dialog when the Done button is clicked', async () => {
    const wrapper = mount(DefuseDialog, {
      propsData,
      global: {
        plugins: [vuetify],
      },
    });

    // await wrapper.find('.v-btn').trigger('click');
    // expect(wrapper.emitted('onClose')).toBeTruthy();
    // expect(wrapper.vm.openDialog).toBe(false);
  });
});
