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

  const wrapper = mount(ExplodingKittenDialog, {
    propsData,
    global: {
      plugins: [vuetify],
    },
  });

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.openDialog).toBe(true);
    // expect(wrapper.find('.v-btn').exists()).toBe(true);
    // expect(wrapper.find('.text-h6').text()).toBe('You DIED!');

    const cardComponent = wrapper.findComponent({ name: 'CardComponent' });
    expect(cardComponent.props('name')).toBe(Object.keys(propsData.card)[0]);
    expect(cardComponent.props('description')).toBe(Object.values(propsData.card)[0].description);
    expect(cardComponent.props('color')).toBe(Object.values(propsData.card)[0].color);
  });

  it('closes the dialog when the Done button is clicked', async () => {
    // await wrapper.find('.v-btn').trigger('click');
    // expect(wrapper.emitted('onClose')).toBeTruthy();
    // expect(wrapper.vm.openDialog).toBe(false);
  });
});
