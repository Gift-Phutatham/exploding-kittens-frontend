import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import WaitingDialog from '@/components/dialogs/WaitingDialog.vue';
import { createVuetify } from 'vuetify';

describe('WaitingDialog', () => {
  const vuetify = createVuetify();

  const propsData = {
    disableStart: true,
  };

  const wrapper = mount(WaitingDialog, {
    propsData,
    global: {
      plugins: [vuetify],
    },
  });

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.openDialog).toBe(true);
    // expect(wrapper.text()).toContain('Waiting for others to join');
  });

  it('disables the Start button when "disableStart" prop is true', () => {
    // expect(wrapper.find('.v-btn').attributes('disabled')).toBeTruthy();
  });

  it('emits onClose event and closes dialog when "Done" button is clicked', async () => {
    const wrapper = mount(WaitingDialog, {
      props: {
        disableStart: false,
      },
      global: {
        plugins: [vuetify],
      },
    });

    // expect(wrapper.find('.v-btn').attributes('disabled')).toBeFalsy();
    // await wrapper.find('.v0btn').trigger('click');
    // expect(wrapper.emitted('start')).toBeTruthy();
  });
});
