import { sprintf } from 'sprintf-js';
import fetch from 'node-fetch';

class Bawler {
    constructor() {
        this.messages = {};
        this.currentLang = 'en';
    }

    lang(lang = 'en') {
        this.currentLang = lang;
    }

    register(lang, messages) {
        this.messages[lang] = messages;
    }

    async registerUrl(url, lang) {
        const data = await fetch(url);
        const jsondata = await data.json();

        this.register(lang, jsondata);
    }

    all(lang = null) {
        if (!lang) {
            return this.messages;
        }

        return this.messages[lang] || {};
    }

    msg(messageKey, vars = []) {
        const message = this.all(this.currentLang)[messageKey] || messageKey;
        const args = [message, ...vars];

        return sprintf(...args);
    }
}

const instance = new Bawler();
const msg = instance.msg.bind(instance);

export default instance;

export { msg };
