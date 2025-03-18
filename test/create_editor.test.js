import { describe } from 'mocha';
import { createEditor } from '../dist/index.js';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

const testData = {
  name: 'bob',
  age: 42,
  isCool: true,
  address: {
    number: 211,
    street: 'hamburger ln',
    state: 'TX',
  },
  children: [
    {
      name: 'john',
      age: 17,
    },
    {
      name: 'juniper',
      age: 12,
    },
  ],
  blank: null,
};

const jsdom = new JSDOM(`<!DOCTYPE html><html lang="en"><body></body></html>`);
globalThis.document = jsdom.window.document;

describe('createEditor()', function () {
  it('should have correct number of object containers in tree', function () {
    const rootNode = createEditor(testData);
    expect(rootNode.querySelectorAll('.object').length).to.equal(3);
  });

  it('should have correct number of inputs in tree', function () {
    const rootNode = createEditor(testData);
    expect(rootNode.querySelectorAll('input').length).to.equal(10);
  });

  it('should have correct number of text inputs in tree', function () {
    const rootNode = createEditor(testData);
    expect(rootNode.querySelectorAll('input[type="text"]').length).to.equal(5);
  });

  it('should have correct number of number inputs in tree', function () {
    const rootNode = createEditor(testData);
    expect(rootNode.querySelectorAll('input[type="number"]').length).to.equal(4);
  });

  it('should have correct number of checkbox inputs in tree', function () {
    const rootNode = createEditor(testData);
    expect(rootNode.querySelectorAll('input[type="checkbox"]').length).to.equal(1);
  });

  it('should have correct number of null span', function () {
    const rootNode = createEditor(testData);
    document.body.appendChild(rootNode);
    const span = rootNode.querySelector('span');
    expect(span).to.not.be.null;
    expect(span?.textContent).to.equal('null');
  });
});
