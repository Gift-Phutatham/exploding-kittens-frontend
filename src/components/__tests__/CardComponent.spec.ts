import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CardComponent from '@/components/CardComponent.vue';
import { createVuetify } from 'vuetify';

describe('CardComponent', () => {
  const vuetify = createVuetify();

  const propsData = {
    name: 'Test Name',
    description: 'Test Description',
    color: 'red',
  };

  it('renders correctly', () => {
    const wrapper = mount(CardComponent, {
      propsData,
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props()).toEqual(propsData);
    expect(wrapper.find('.text-subtitle-1').text()).toBe(propsData.name);
    expect(wrapper.find('.text-caption').text()).toBe(propsData.description);
  });

  it('renders the v-divider with the correct color prop', () => {
    const wrapper = mount(CardComponent, {
      propsData,
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.find('.v-divider').classes()).toContain(`text-${propsData.color}`);
  });

  it('renders the v-divider with the correct class', () => {
    const wrapper = mount(CardComponent, {
      propsData,
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.find('.border-opacity-100').exists()).toBe(true);
    expect(wrapper.find('.my-5').exists()).toBe(true);
  });
});
