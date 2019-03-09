import { sprintf } from 'sprintf-js';

class Brawler {
    constructor() {
        this.messages = {};
        this.currentLang = 'en';
    }

    lang(lang = 'en') {
        this.currentLang = lang;
    }

    register(lang = 'en', messages = {}) {
        this.messages[lang] = messages;
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

const instance = new Brawler();

export default instance;
