import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CreateRoomBox from '@/components/CreateRoomBox.vue';
import CharacterSelector from '@/components/CharacterSelector.vue';
import { createVuetify } from 'vuetify';
import BlackCatPlayer from '@/assets/images/players/BlackCatPlayer.jpeg';
import GrayCatPlayer from '@/assets/images/players/GrayCatPlayer.jpeg';

describe('CreateRoomBox', () => {
  const vuetify = createVuetify();

  it('emits create-room event with form data when create button is clicked and form is valid', async () => {
    const wrapper = mount(CreateRoomBox, {
      global: {
        plugins: [vuetify],
      },
    });

    await wrapper.setData({
      name: 'Alice',
      roomId: '1234',
    });

    await wrapper.findComponent(CharacterSelector).vm.$emit('select-character', BlackCatPlayer);
    await wrapper.find('.v-btn').trigger('click');

    expect(wrapper.emitted('create-room')![0][0]).toEqual({
      name: 'Alice',
      roomId: '1234',
      selectedCharacterSrc: BlackCatPlayer,
    });
    expect(wrapper.find('.v-btn').element.hasAttribute('disabled')).toBe(false);
  });

  it('disables create button when form is invalid', async () => {
    const wrapper = mount(CreateRoomBox, {
      global: {
        plugins: [vuetify],
      },
    });


    // no input
    expect(wrapper.find('.v-btn').element.hasAttribute('disabled')).toBe(true);

    //only name input
    await wrapper.setData({
      name: 'Alice',
      roomId: '',
    });
    expect(wrapper.find('.v-btn').element.hasAttribute('disabled')).toBe(true);

    //only room id input
    await wrapper.setData({
      name: '',
      roomId: '1234',
    });
    expect(wrapper.find('.v-btn').element.hasAttribute('disabled')).toBe(true);

    //only select character input
    await wrapper.setData({
      name: '',
      roomId: '',
    });
    // Select BlackCatPlayer
    await wrapper.findComponent(CharacterSelector).vm.$emit('select-character', BlackCatPlayer);
    await wrapper.find('.v-btn').trigger('click');
    expect(wrapper.find('.v-btn').element.hasAttribute('disabled')).toBe(true);
  });

  it('emits create-room event with correct data when selecting different characters', async () => {
    const wrapper = mount(CreateRoomBox, {
      global: {
        plugins: [vuetify],
      },
    });

    await wrapper.setData({
      name: 'Alice',
      roomId: '1234',
    });

    // Select BlackCatPlayer
    await wrapper.findComponent(CharacterSelector).vm.$emit('select-character', BlackCatPlayer);
    await wrapper.find('.v-btn').trigger('click');
    expect(wrapper.emitted('create-room')![0][0]).toEqual({
      name: 'Alice',
      roomId: '1234',
      selectedCharacterSrc: BlackCatPlayer,
    });

    // Select GrayCatPlayer
    await wrapper.setData({
      selectedCharacterSrc: GrayCatPlayer,
    });
    await wrapper.find('.v-btn').trigger('click');
    expect(wrapper.emitted('create-room')![1][0]).toEqual({
      name: 'Alice',
      roomId: '1234',
      selectedCharacterSrc: GrayCatPlayer,
    });
  });

  it('updates isFormValid when form fields are updated', async () => {
    const wrapper = mount(CreateRoomBox, {
      global: {
        plugins: [vuetify],
      },
    });

    expect(wrapper.vm.isFormValid).toBeFalsy();

    await wrapper.setData({
      name: 'Alice',
      roomId: '1234',
    });

    expect(wrapper.vm.isFormValid).toBeFalsy();

    await wrapper.setData({
      selectedCharacterSrc: BlackCatPlayer,
    });

    expect(wrapper.vm.isFormValid).toBeTruthy();
  });
});
