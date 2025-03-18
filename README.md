# JSON Editor

This project is a work-in-progress. All APIs are subject to change. This editor expects to be run in a browser environment, but you can use headless DOM implementations like JSDOM. See the test folder in the Github repo for an example.

## Install

```sh
npm i json-editor
```

## Usage

```js
import { createEditor } from 'json-editor';
// OR
const { createEditor } = require('json-editor');

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

const rootNode = createEditor(testData);
document.body.appendChild(rootNode);
```
