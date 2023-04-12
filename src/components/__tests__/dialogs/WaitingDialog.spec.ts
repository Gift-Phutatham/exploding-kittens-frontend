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
  });
});
