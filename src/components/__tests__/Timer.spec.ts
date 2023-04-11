import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import TimerComponent from '../TimerComponent.vue';

describe('TimerComponent', () => {
  it('count down time from 10 to 0', async () => {
    const wrapper = mount(TimerComponent, {
      props: {
        initialTime: 10,
      },
    });

    expect(wrapper.find('.display-1').text()).toBe('10');

    await new Promise((resolve) => setTimeout(resolve, 11000));

    expect(wrapper.find('.display-1').text()).toBe('0');
  }, 15000); // sets time out to 15s.
});
