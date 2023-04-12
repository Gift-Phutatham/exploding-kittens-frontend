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

  const wrapper = mount(DefuseDialog, {
    propsData,
    global: {
      plugins: [vuetify],
    },
  });

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.openDialog).toBe(true);

    const cardComponent = wrapper.findComponent({ name: 'CardComponent' });
    expect(cardComponent.props('name')).toBe(Object.keys(propsData.card)[0]);
    expect(cardComponent.props('description')).toBe(Object.values(propsData.card)[0].description);
    expect(cardComponent.props('color')).toBe(Object.values(propsData.card)[0].color);
  });
});
