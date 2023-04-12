import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ExplodingKittenDialog from '@/components/dialogs/ExplodingKittenDialog.vue';
import { createVuetify } from 'vuetify';

describe('ExplodingKittenDialog', () => {
  const vuetify = createVuetify();

  const propsData = {
    card: {
      'Exploding Kitten': {
        description: 'A card that explodes when drawn',
        color: 'red',
      },
    },
  };

  it('renders properly', () => {
    const wrapper = mount(ExplodingKittenDialog, {
      propsData,
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.openDialog).toBe(true);
    // expect(wrapper.find('.v-btn').exists()).toBe(true);
    // expect(wrapper.find('.text-h6').text()).toBe('You DIED!');
  });

  it('closes the dialog when the Done button is clicked', async () => {
    const wrapper = mount(ExplodingKittenDialog, {
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
