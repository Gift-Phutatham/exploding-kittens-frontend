import { describe, it, expect} from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import ChatComponent from '../ChatComponent.vue';
import vuetify from '@/plugins/vuetify';

describe('ChatComponent', () => {
    const vuetify = createVuetify();
    const wrapper = mount(ChatComponent, {
        global: {
            plugins: [vuetify],
        },
    });

    it('render component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('adds a new chat message', async () => {
        const message = wrapper.find('input[type="text"]');
        const send = wrapper.find('.v-input__icon--append-inner');

        await message.setValue('Hello');
        await send.trigger('click');
    

        expect(wrapper.vm.chats).to.deep.equal({
            name: 'Anonymous',
            message: 'Hello',
        });
    });


    // it('send a message to the chat box', async () => {
    //     const message = wrapper.find('input[type=text]');
    //     const send = wrapper.find('button');

    //     message.setValue('Hello');
    //     await send.trigger('click');

    //     expect(wrapper.findAll('.text-caption').length).toBe(1);
    //     expect(wrapper.find('.text-caption div').text()).toBe('Hello');
    // });
});