import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RandomCardDialog from '@/components/dialogs/RandomCardDialog.vue';
import { createVuetify } from 'vuetify';

describe('RandomCardDialog', () => {
  const vuetify = createVuetify();

  const wrapper = mount(RandomCardDialog, {
    global: {
      plugins: [vuetify],
    },
  });

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.openDialog).toBe(true);
    expect(wrapper.vm.themeColor).toBe('#232321');
  });
});
