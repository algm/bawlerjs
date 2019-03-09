import { expect } from 'chai';
import Bawler from '../src/index';
import messages from './fixtures/lang.js';

/*global describe, it*/

describe('Bawler', () => {
    describe('Configuration', () => {
        it('can initialize from a single object', () => {
            Bawler.register('en', messages);

            expect(Bawler.all()).to.deep.equal({ en: messages });
        });
    });

    describe('Messages', () => {
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
    });
});
