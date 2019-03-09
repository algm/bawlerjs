import 'regenerator-runtime/runtime';
import '@babel/polyfill';
import { expect } from 'chai';
import Bawler, { msg } from '../src/index';
import messages from './fixtures/lang.js';
import remoteMessages from './fixtures/remoteMessages.js';

/*global describe, it, beforeEach*/

describe('Bawler', () => {
    describe('Configuration', () => {
        it('can initialize from a single object', () => {
            Bawler.register('en', messages);

            expect(Bawler.all()).to.deep.equal({ en: messages });
        });

        it('can initialize from an url', async () => {
            await Bawler.registerUrl(
                'https://gist.githubusercontent.com/mendezcode/8275387/raw/db75e0adae779aaebfe25cd0e953356e34fc8d03/locales.json',
                'test'
            );

            expect(Bawler.all('test')).to.deep.equal(remoteMessages);
        });

        it('can change language', async () => {
            Bawler.lang('zu');
            expect(Bawler.currentLang).to.equal('zu');
        });
    });

    describe('Messages', () => {
        beforeEach(() => {
            Bawler.lang();
            Bawler.messages = {};
        });

        it('returns empty object when the language does not have any message', () => {
            expect(Bawler.all('foo')).to.be.empty;
        });

        it('can get messages from a single language', () => {
            Bawler.register('en', messages);

            expect(Bawler.all('en')).to.deep.equal(messages);
        });

        it('can output messages that are not registered', () => {
            expect(Bawler.msg('TEST')).to.equal('TEST');
        });

        it('can replace variables in messages', () => {
            expect(Bawler.msg('HELLO %s', ['Foo'])).to.equal('HELLO Foo');
        });

        it('outputs registered messages', () => {
            Bawler.register('en', { Foo: 'bar' });

            expect(Bawler.msg('Foo')).to.equal('bar');
        });

        it('outputs messages in different languages', () => {
            Bawler.register('en', { HELLO: 'hello' });
            Bawler.register('es', { HELLO: 'hola' });

            Bawler.lang('en');
            expect(Bawler.msg('HELLO')).to.equal('hello');

            Bawler.lang('es');
            expect(Bawler.msg('HELLO')).to.equal('hola');
        });

        it('outputs messages with shortcut function', () => {
            expect(msg('HELLO WORLD')).to.equal('HELLO WORLD');
        });
    });
});
