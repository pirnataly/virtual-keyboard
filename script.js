document.body.classList.add('body');

// creating and inserting heading

const h1 = document.createElement('h1');
h1.className = 'heading';
h1.textContent = 'Virtual-keyboard in JS';
document.body.prepend(h1);

// creating and inserting textarea

const textarea = document.createElement('textarea');
textarea.className = 'textarea use-keyboard-input';
textarea.setAttribute('cols', '100');
textarea.setAttribute('rows', '10');
h1.after(textarea);

const description = document.createElement('p');
description.className = 'description';
description.textContent = 'Клавиатура создана в операционной системе Windows.';
textarea.after(description);

const language = document.createElement('p');
language.className = 'language';
language.textContent = 'Для переключения языка комбинация: left ctrl + left alt. ';
description.after(language);

const startWorking = document.createElement('p');
startWorking.className = 'language';
startWorking.textContent = 'Для начала работы щелкните в текстовое поле.';
language.after(startWorking);

function getCursor() {
  if (textarea.selectionStart === textarea.selectionEnd) {
    return textarea.selectionStart;
  }
  return undefined;
}

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventsHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capslock: false,
    lang: 'eng',
  },

  init() {
    // create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard_hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.append(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // add to DOM
    this.elements.main.append(this.elements.keysContainer);
    textarea.after(this.elements.main);

    // automatic using keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      const text = element;
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          text.value = currentValue;
        });
      });
    });
  },

  createKeys() {
    function getLocalStorage() {
      if (localStorage.getItem('lang')) {
        Keyboard.properties.lang = localStorage.getItem('lang');
      }
    }

    getLocalStorage();

    const { lang } = this.properties;
    let shift = false;
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      { eng: '`', rus: 'ё', code: 'Backquote' },
      {
        eng: '1', rus: '1', code: 'Digit1', shifted: '!',
      },
      {
        eng: '2', rus: '2', code: 'Digit2', shifted: '"',
      },
      {
        eng: '3', rus: '3', code: 'Digit3', shifted: '№',
      },
      {
        eng: '4', rus: '4', code: 'Digit4', shifted: ';',
      },
      {
        eng: '5', rus: '5', code: 'Digit5', shifted: '%',
      },
      {
        eng: '6', rus: '6', code: 'Digit6', shifted: ':',
      },
      {
        eng: '7', rus: '7', code: 'Digit7', shifted: '?',
      },
      {
        eng: '8', rus: '8', code: 'Digit8', shifted: '*',
      },
      {
        eng: '9', rus: '9', code: 'Digit9', shifted: '(',
      },
      {
        eng: '0', rus: '0', code: 'Digit0', shifted: ')',
      },
      {
        eng: '-', rus: '-', code: 'Minus', shifted: '_',
      },
      {
        eng: '=', rus: '=', code: 'Equal', shifted: '+',
      },
      {
        eng: 'Backspace', rus: 'Backspace', code: 'Backspace', type: 'special',
      },
      {
        eng: 'Tab', rus: 'Tab', code: 'Tab', type: 'special',
      },
      { eng: 'q', rus: 'й', code: 'KeyQ' },
      { eng: 'w', rus: 'ц', code: 'KeyW' },
      { eng: 'e', rus: 'у', code: 'KeyE' },
      { eng: 'r', rus: 'к', code: 'KeyR' },
      { eng: 't', rus: 'е', code: 'KeyT' },
      { eng: 'y', rus: 'н', code: 'KeyY' },
      { eng: 'u', rus: 'г', code: 'KeyU' },
      { eng: 'i', rus: 'ш', code: 'KeyI' },
      { eng: 'o', rus: 'щ', code: 'KeyO' },
      { eng: 'p', rus: 'з', code: 'KeyP' },
      { eng: '[', rus: 'х', code: 'BracketLeft' },
      { eng: ']', rus: 'ъ', code: 'BracketRight' },
      {
        eng: 'Delete', rus: 'Delete', code: 'Delete', type: 'special',
      },
      {
        eng: 'CapsLock', rus: 'CapsLock', code: 'CapsLock', type: 'special',
      },
      { eng: 'a', rus: 'ф', code: 'KeyA' },
      { eng: 's', rus: 'ы', code: 'KeyS' },
      { eng: 'd', rus: 'в', code: 'KeyD' },
      { eng: 'f', rus: 'а', code: 'KeyF' },
      { eng: 'g', rus: 'п', code: 'KeyG' },
      { eng: 'h', rus: 'р', code: 'KeyH' },
      { eng: 'j', rus: 'о', code: 'KeyJ' },
      { eng: 'k', rus: 'л', code: 'KeyK' },
      { eng: 'l', rus: 'д', code: 'KeyL' },
      { eng: ';', rus: 'ж', code: 'Semicolon' },
      { eng: "''", rus: 'э', code: 'Quote' },
      {
        eng: 'Enter', rus: 'Enter', code: 'Enter', type: 'special',
      },

      {
        eng: 'Shift', rus: 'Shift', code: 'ShiftLeft', type: 'special',
      },
      { eng: 'z', rus: 'я', code: 'KeyZ' },
      { eng: 'x', rus: 'ч', code: 'KeyX' },
      { eng: 'c', rus: 'с', code: 'KeyC' },
      { eng: 'v', rus: 'м', code: 'KeyV' },
      { eng: 'b', rus: 'и', code: 'KeyB' },
      { eng: 'n', rus: 'т', code: 'KeyN' },
      { eng: 'm', rus: 'ь', code: 'KeyM' },
      { eng: ',', rus: 'б', code: 'Comma' },
      {
        eng: '.', rus: 'ю', code: 'Period', shifted: ',',
      },
      {
        eng: '/', rus: '.', code: 'Slash', shifted: '\\',
      },
      { eng: '↑', rus: '↑', code: 'ArrowUp' },
      {
        eng: 'Shift', rus: 'Shift', code: 'ShiftRight', type: 'special',
      },

      {
        eng: 'ctrl', rus: 'ctrl', code: 'ControlLeft', type: 'special',
      },
      {
        eng: 'win', rus: 'win', code: 'MetaLeft', type: 'special',
      },
      {
        eng: 'Alt', rus: 'Alt', code: 'AltLeft', type: 'special',
      },
      { eng: ' ', rus: ' ', code: 'Space' },
      {
        eng: 'Alt', rus: 'Alt', code: 'AltRight', type: 'special',
      },
      { eng: '←', rus: '←', code: 'ArrowLeft' },
      { eng: '↓', rus: '↓', code: 'ArrowDown' },
      { eng: '→', rus: '→', code: 'ArrowRight' },
      {
        eng: 'ctrl', rus: 'ctrl', code: 'ControlRight', type: 'special',
      },

    ];

    function changeCaseShiftOn() {
      for (let i = 0; i < Keyboard.elements.keys.length; i += 1) {
        if (!Keyboard.elements.keys[i].classList.contains('modifier')) {
          if (keyLayout[i].shifted) {
            Keyboard.elements.keys[i].textContent = keyLayout[i].shifted;
          } else {
            Keyboard.elements.keys[i].textContent = Keyboard.properties.capslock
              ? keyLayout[i][Keyboard.properties.lang].toLowerCase()
              : keyLayout[i][Keyboard.properties.lang].toUpperCase();
          }
        }
      }
    }

    function changeCaseShiftOff() {
      for (let i = 0; i < Keyboard.elements.keys.length; i += 1) {
        if (!Keyboard.elements.keys[i].classList.contains('modifier')) {
          Keyboard.elements.keys[i].textContent = Keyboard.properties.capslock
            ? keyLayout[i][Keyboard.properties.lang].toUpperCase()
            : keyLayout[i][Keyboard.properties.lang].toLowerCase();
        }
      }
    }
    function setLocalStorage() {
      localStorage.setItem('lang', Keyboard.properties.lang);
    }
    function isModifier(i) {
      return Keyboard.elements.keys[i].classList.contains('modifier');
    }

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const lineBreak = ['Backspace', 'Delete', 'Enter', 'ShiftRight', 'ControlRight'].indexOf(key.code) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key', `${key.code}`);
      const arr = [];

      switch (key.code) {
        case 'Tab':
          keyElement.classList.add('modifier');
          keyElement.textContent = key[lang].toLowerCase();
          keyElement.addEventListener('click', () => {
            textarea.setRangeText('    ', textarea.selectionStart, textarea.selectionEnd, 'end');
            textarea.focus();
          });
          break;

        case 'Backspace':
          keyElement.classList.add('keyboard__key_size-l', 'modifier');
          keyElement.textContent = key[lang].toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value = this.properties.value
              .substring(0, this.properties.value.length - 1);
            this.triggerEvent('oninput');
          });
          break;

        case 'CapsLock':
          keyElement.classList.add('keyboard__key_size-l', 'modifier');
          keyElement.textContent = key.code;
          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key_active');
          });
          break;

        case 'Delete':
          keyElement.classList.add('keyboard__key_size-m', 'modifier');
          keyElement.textContent = key[lang].toLowerCase();

          keyElement.addEventListener('click', () => {
            if (getCursor()) {
              arr.push(getCursor());
            }

            if (getCursor() !== 0) {
              this.properties.value = this.properties.value
                .slice(0, (getCursor() || arr[arr.length - 1]))
                  + this.properties.value.slice((getCursor() || arr[arr.length - 1]) + 1);
              this.triggerEvent('oninput');
            } else {
              this.properties.value = this.properties.value
                .slice((getCursor() || arr[arr.length - 1]) + 1);
            }
          });
          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key_size-l', 'modifier');
          keyElement.textContent = key[lang].toLowerCase();
          keyElement.addEventListener('click', () => {
            this.properties.value += '\n';
            this.triggerEvent('oninput');
          });
          break;

        case 'Space':
          keyElement.classList.add('keyboard__key_size-xl');
          keyElement.textContent = key[lang].toLowerCase();
          keyElement.addEventListener('click', () => {
            textarea.setRangeText('  ', textarea.selectionStart, textarea.selectionEnd, 'end');
            textarea.focus();
            // this._triggerEvent("oninput");
          });
          break;

        case 'AltRight':
        case 'AltLeft':
          keyElement.classList.add('modifier');
          keyElement.textContent = key[lang].toLowerCase();
          break;

        case 'ControlRight':
        case 'ControlLeft':
        case 'MetaLeft':
          keyElement.classList.add('modifier');
          keyElement.textContent = key[lang].toLowerCase();
          break;

        case 'ShiftRight':
        case 'ShiftLeft':
          keyElement.classList.add('keyboard__key_size-l', 'modifier');
          keyElement.textContent = key[lang].toLowerCase();
          keyElement.addEventListener('mousedown', changeCaseShiftOn);
          keyElement.addEventListener('mouseup', changeCaseShiftOff);
          keyElement.addEventListener('mousedown', () => {
            shift = true;
          });
          keyElement.addEventListener('mouseup', () => {
            shift = false;
          });
          break;

        default:
          keyElement.textContent = key[lang].toLowerCase();
          keyElement.addEventListener('click', (event) => {
            if (!event.shiftKey) {
              this.properties.value += this.properties.capslock
                ? key[this.properties.lang].toUpperCase() : key[this.properties.lang].toLowerCase();
              this.triggerEvent('oninput');
            } else {
              if (key.shifted) {
                this.properties.value += key.shifted;
              } else {
                this.properties.value += this.properties.capslock
                  ? key[this.properties.lang].toLowerCase()
                  : key[this.properties.lang].toUpperCase();
              }
              this.triggerEvent('oninput');
            }
          });
          break;
      }

      fragment.appendChild(keyElement);
      if (lineBreak) {
        fragment.appendChild(document.createElement('br'));
      }

      textarea.onclick = getCursor;

      document.addEventListener('keydown', (event) => {
        // Смена раскладки при Shift
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          changeCaseShiftOn();
        }

        // При капслок подсвечивание клавиши
        if ((event.code.toLowerCase() === key.code.toLowerCase()) && (event.code.toLowerCase() === 'capslock')) {
          keyElement.classList.toggle('keyboard__key_active');
          this.toggleCapsLock();
        }

        // Короткая подсветка клавиш кроме капслок при нажатии клавиатуры
        if ((event.code.toLowerCase() === key.code.toLowerCase()) && (event.code.toLowerCase() !== ('capslock' || 'backspace' || 'delete' || 'enter'))) {
          keyElement.classList.add('keyboard__key_active');
        }

        // Ввод с клавиатуры для обычных клавиш
        if (event.code.toLowerCase() === key.code.toLowerCase() && key.type !== 'special') {
          event.preventDefault();
          if (event.shiftKey || (shift === true)) {
            if (key.shifted) {
              this.properties.value += key.shifted;
            } else {
              this.properties.value += this.properties.capslock
                ? key[this.properties.lang].toLowerCase()
                : key[this.properties.lang].toUpperCase();
            }
            this.triggerEvent('oninput');
          } else {
            this.properties.value += this.properties.capslock
              ? key[this.properties.lang].toUpperCase()
              : key[this.properties.lang].toLowerCase();
            this.triggerEvent('oninput');
          }
        }

        // Backspace с клавиатуры
        if (event.code.toLowerCase() === key.code.toLowerCase()
            && key.code.toLowerCase() === 'backspace') {
          this.properties.value = this.properties.value
            .substring(0, this.properties.value.length - 1);
        }

        // Enter  с клавиатуры
        if (event.code.toLowerCase() === key.code.toLowerCase() && key.code.toLowerCase() === 'enter') {
          event.preventDefault();
          this.properties.value += '\n';
          this.triggerEvent('oninput');
        }
      });

      // Снятие подсветки  с капслок
      document.addEventListener('keyup', (event) => {
        if (event.code.toLowerCase() === key.code.toLowerCase() && (event.code.toLowerCase() !== 'capslock')) {
          keyElement.classList.remove('keyboard__key_active');
        }
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          changeCaseShiftOff();
        }
      });
    });

    function runOnKeys(func, ...codes) {
      const pressed = new Set();

      document.addEventListener('keydown', (event) => {
        pressed.add(event.code);

        for (let i = 0; i < codes.length; i += 1) { // все ли клавиши из набора нажаты?
          if (!pressed.has(codes[i])) {
            return;
          }
        }

        pressed.clear();

        func();
      });

      document.addEventListener('keyup', (event) => {
        pressed.delete(event.code);
      });
    }

    runOnKeys(
      () => {
        Keyboard.properties.lang = (Keyboard.properties.lang === 'eng') ? 'rus' : 'eng';
        setLocalStorage();
        for (let i = 0; i < Keyboard.elements.keys.length; i += 1) {
          if (!isModifier(i)) {
            Keyboard.elements.keys[i].textContent = Keyboard.properties.capslock
              ? keyLayout[i][Keyboard.properties.lang].toUpperCase()
              : keyLayout[i][Keyboard.properties.lang].toLowerCase();
          }
        }
      },
      'ControlLeft',
      'AltLeft',
    );

    return fragment;
  },

  triggerEvent(handlerName) {
    if (typeof this.eventsHandlers[handlerName] === 'function') {
      this.eventsHandlers[handlerName](this.properties.value);
    }
  },

  toggleCapsLock() {
    this.properties.capslock = !this.properties.capslock;
    this.elements.keys.forEach((key) => {
      if (!(key.classList.contains('keyboard__key_size-m')
                || key.classList.contains('keyboard__key_size-l')
                || key.classList.contains('keyboard__key_size-xl')
                || (key.classList.contains('Tab'))
                || (key.classList.contains('ControlLeft'))
                || (key.classList.contains('ControlRight'))
                || (key.classList.contains('MetaLeft'))
                || (key.classList.contains('AltLeft'))
                || (key.classList.contains('AltRight'))
      )) {
        const newKey = key;
        newKey.textContent = this.properties.capslock
          ? newKey.textContent.toUpperCase() : newKey.textContent.toLowerCase();
      }
    });
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventsHandlers.oninput = oninput;
    this.eventsHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard_hidden');
  },

};

document.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});
