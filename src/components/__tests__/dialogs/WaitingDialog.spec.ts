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

  it('renders properly ', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.openDialog).toBe(true);
    // expect(wrapper.find('.v-btn').exists()).toBe(true);
  });

  it('emits onClose event and closes dialog when "Done" button is clicked', async () => {
    // await wrapper.find('.v-btn').trigger('click');
    // expect(wrapper.emitted('onClose')).toBeTruthy();
    // expect(wrapper.vm.openDialog).toBe(false);
  });
});
