import { genSchema } from 'json-schema-create';

export function createEditor(sourceObject: { [key: string]: any }): HTMLElement {
  const schema = genSchema(sourceObject);
  let selected = sourceObject;

  const rootNode = (function walkSchema(schemaDef, propName) {
    let inputType: string | undefined;
    let elem: HTMLElement | undefined;

    switch (schemaDef.type) {
      case 'object':
        elem = createContainer(propName, 'object');
        Object.entries(schemaDef.properties).forEach(([key, value]) => {
          let remembered = selected;
          selected = selected[key];
          const newChild = walkSchema(value, key);
          if (newChild) {
            elem!.appendChild(newChild);
          }
          selected = remembered;
        });
        return elem;
      case 'array': {
        elem = createContainer(propName, 'array');
        let remembered = selected;
        selected.forEach((_: any, i: number) => {
          selected = selected[i];
          const newChild = walkSchema(schemaDef.items, `#${i}`);
          if (newChild) {
            elem!.appendChild(newChild);
          }
          selected = remembered;
        });
        return elem;
      }
      case 'number':
        inputType = 'number';
        break;
      case 'string':
        inputType = 'text';
        break;
      case 'boolean':
        inputType = 'checkbox';
        break;
      default: // null type
        return createNull();
    }

    if (inputType) {
      elem = createInput(propName, inputType, selected);
    }
    return elem;
  })(schema, '__root');

  return rootNode!;
}

function createContainerHeader(headerText: string, suffix: 'object' | 'array') {
  const header = document.createElement('p');
  header.textContent = `${headerText} ${suffix}`;
  return header;
}

function createContainer(fieldName: string, containerType: 'object' | 'array') {
  const containerElem = document.createElement('div');
  containerElem.className = containerType;
  containerElem.appendChild(createContainerHeader(fieldName, containerType));
  return containerElem;
}

function createInput(propName: string, inputType: string, defaultValue: any) {
  const inputElem = document.createElement('input');
  inputElem.setAttribute('type', inputType);
  if (inputType === 'checkbox' && defaultValue) {
    inputElem.setAttribute('checked', defaultValue);
  } else {
    inputElem.value = defaultValue;
  }
  const label = document.createElement('label');
  label.textContent = propName;
  label.appendChild(inputElem);
  return label;
}

function createNull() {
  const elem = document.createElement('span');
  elem.textContent = 'null';
  return elem;
}
