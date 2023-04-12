import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SeeTheFutureDialog from '@/components/dialogs/SeeTheFutureDialog.vue';
import { createVuetify } from 'vuetify';

describe('SeeTheFutureDialog', () => {
  const vuetify = createVuetify();

  const propsData = {
    topThreeCards: {
      'Card 1': {
        description: 'Description 1',
        color: '#FF0000',
      },
      'Card 2': {
        description: 'Description 2',
        color: '#00FF00',
      },
      'Card 3': {
        description: 'Description 3',
        color: '#0000FF',
      },
    },
  };

  const wrapper = mount(SeeTheFutureDialog, {
    propsData,
    global: {
      plugins: [vuetify],
    },
  });

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.openDialog).toBe(true);
    expect(wrapper.vm.themeColor).toBe('#EB217D');

    const cardComponents = wrapper.findAllComponents({ name: 'CardComponent' });
    expect(cardComponents).toHaveLength(3);
    for (let i = 0; i < cardComponents.length; i++) {
      expect(cardComponents[i].props('name')).toBe(Object.keys(propsData.topThreeCards)[i]);
      expect(cardComponents[i].props('description')).toBe(
        Object.values(propsData.topThreeCards)[i].description,
      );
      expect(cardComponents[i].props('color')).toBe(
        Object.values(propsData.topThreeCards)[i].color,
      );
    }
  });
});
