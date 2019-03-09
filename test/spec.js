import { expect } from 'chai';
import Brawler from '../src/index';
import messages from './fixtures/lang.js';

/*global describe, it*/

describe('Brawler', () => {
    describe('Configuration', () => {
        it('can initialize from a single object', () => {
            Brawler.register('en', messages);

            expect(Brawler.all()).to.deep.equal({ en: messages });
        });
    });

    describe('Messages', () => {
        it('can get messages from a single language', () => {
            Brawler.register('en', messages);

            expect(Brawler.all('en')).to.deep.equal(messages);
        });

        it('can output messages that are not registered', () => {
            expect(Brawler.msg('TEST')).to.equal('TEST');
        });

        it('can replace variables in messages', () => {
            expect(Brawler.msg('HELLO %s', ['Foo'])).to.equal('HELLO Foo');
        });

        it('outputs registered messages', () => {
            Brawler.register('en', { Foo: 'bar' });

            expect(Brawler.msg('Foo')).to.equal('bar');
        });

        it('outputs messages in different languages', () => {
            Brawler.register('en', { HELLO: 'hello' });
            Brawler.register('es', { HELLO: 'hola' });

            Brawler.lang('en');
            expect(Brawler.msg('HELLO')).to.equal('hello');

            Brawler.lang('es');
            expect(Brawler.msg('HELLO')).to.equal('hola');
        });
    });
});
