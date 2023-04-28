document.body.classList.add('body');

//creating and inserting heading

let h1 = document.createElement('h1');
h1.className='heading';
h1.textContent='Virtual-keyboard in JS';
document.body.prepend(h1);

//creating and inserting textarea

let textarea=document.createElement('textarea');
textarea.className='textarea use-keyboard-input';
textarea.setAttribute('cols','100');
textarea.setAttribute('rows','10');
h1.after(textarea);

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
        value: "",
        capslock: false,
   },

    init() {
        //create main elements
        this.elements.main=document.createElement('div');
        this.elements.keysContainer=document.createElement('div');


        //setup main elements
        this.elements.main.classList.add('keyboard', 'keyboard_hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.append(this._createKeys());
        this.elements.keys=this.elements.keysContainer.querySelectorAll('.keyboard__key');


        //add to DOM
        this.elements.main.append(this.elements.keysContainer);
       textarea.after(this.elements.main);

       //automatic using keyboard for elements with .use-keyboard-input
        document.querySelectorAll('.use-keyboard-input').forEach(element=>{
            element.addEventListener("focus",()=>{
                this.open(element.value, currentValue=>{
                    element.value=currentValue;
                })
            })
        });

    },

    _createKeys() {
        const lang='rus';
        const fragment=document.createDocumentFragment();
        const keyLayout=[
        {"eng":"`", "rus":"ё","code":"Backquote",},
            {"eng":"1","rus":"1","code":"Digit1",},
            {"eng":"2","rus":"2","code":"Digit2",},
            {"eng":"3","rus":"3","code":"Digit3",},
            {"eng":"4","rus":"4","code":"Digit4",},
            {"eng":"5","rus":"5","code":"Digit5",},
            {"eng":"6","rus":"6","code":"Digit6",},
            {"eng":"7","rus":"7","code":"Digit7",},
            {"eng":"8","rus":"8","code":"Digit8",},
            {"eng":"9","rus":"9","code":"Digit9",},
            {"eng":"0","rus":"0","code":"Digit0",},
            {"eng":"-","rus":"-","code":"Minus",},
            {"eng":"=","rus":"=","code":"Equal",},
            {"eng":"Backspace","rus":"Backspace","code":"Backspace",},
            {"eng":"Tab","rus":"Tab","code":"Tab",},
            {"eng":"q","rus":"й","code":"KeyQ",},
            {"eng":"w","rus":"ц","code":"KeyW",},
            {"eng":"e","rus":"у","code":"KeyE",},
            {"eng":"r","rus":"к","code":"KeyR",},
            {"eng":"t","rus":"е","code":"KeyT",},
            {"eng":"y","rus":"н","code":"KeyY",},
            {"eng":"u","rus":"г","code":"KeyU",},
            {"eng":"i","rus":"ш","code":"KeyI",},
            {"eng":"o","rus":"щ","code":"KeyO",},
            {"eng":"p","rus":"з","code":"KeyP",},
            {"eng":"[","rus":"х","code":"BracketLeft",},
            {"eng":"]","rus":"ъ","code":"BracketRight",},
            {"eng":"Delete","rus":"Delete","code":"Delete",},
            {"eng":"CapsLock","rus":"CapsLock","code":"CapsLock",},
            {"eng":"a","rus":"ф","code":"KeyA",},
            {"eng":"s","rus":"ы","code":"KeyS",},
            {"eng":"d","rus":"в","code":"KeyD",},
            {"eng":"f","rus":"а","code":"KeyF",},
            {"eng":"g","rus":"п","code":"KeyG",},
            {"eng":"h","rus":"р","code":"KeyH",},
            {"eng":"j","rus":"о","code":"KeyJ",},
            {"eng":"k","rus":"л","code":"KeyK",},
            {"eng":"l","rus":"д","code":"KeyL",},
            {"eng":";","rus":"ж","code":"Semicolon",},
            {"eng":"''","rus":"э","code":"Quote",},
            {"eng":"Enter","rus":"Enter","code":"Enter",},

            {"eng":"Shift","rus":"Shift","code":"ShiftLeft",},
            {"eng":"z","rus":"я","code":"KeyZ",},
            {"eng":"x","rus":"ч","code":"KeyX",},
            {"eng":"c","rus":"с","code":"KeyC",},
            {"eng":"v","rus":"м","code":"KeyV",},
            {"eng":"b","rus":"и","code":"KeyB",},
            {"eng":"n","rus":"т","code":"KeyN",},
            {"eng":"m","rus":"ь","code":"KeyM",},
            {"eng":",","rus":"б","code":"Comma",},
            {"eng":".","rus":"ю","code":"Period",},
            {"eng":"/","rus":".","code":"Slash",},
            {"eng":"↑","rus":"↑","code":"ArrowUp",},
            {"eng":"Shift","rus":"Shift","code":"ShiftRight",},

            {"eng":"ctrl","rus":"ctrl","code":"ControlLeft",},
            {"eng":"win","rus":"win","code":"MetaLeft",},
            {"eng":"Alt","rus":"Alt","code":"AltLeft",},
            {"eng":" ","rus":" ","code":"Space",},
            {"eng":"Alt","rus":"я","code":"AltRight",},
            {"eng":"←","rus":"←","code":"ArrowLeft",},
            {"eng":"↓","rus":"↓","code":"ArrowDown",},
            {"eng":"→","rus":"→","code":"ArrowRight",},
            {"eng":"ctrl","rus":"ctrl","code":"ControlRight",},

        ];

        keyLayout.forEach(key=>{
            const keyElement=document.createElement('button');
            const lineBreak=["Backspace","Delete","Enter","ShiftRight","ControlRight"].indexOf(key.code)!==-1;

            keyElement.setAttribute("type","button");
            keyElement.classList.add('keyboard__key',`'${key.code}'`);

         switch(key.code) {
                case "Backspace":
                    keyElement.classList.add("keyboard__key_size-l");
                    keyElement.textContent=key[lang].toLowerCase();
                    keyElement.addEventListener("click",()=>{
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length-1);
                        this._triggerEvent("oninput");
                    })
                    break;

                case "CapsLock":
                    keyElement.classList.add("keyboard__key_size-l");
                    keyElement.textContent=key.code;
                    keyElement.addEventListener("click",()=>{
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard__key_active');
                     })
                    break;

                case "Delete":
                    keyElement.classList.add("keyboard__key_size-m");
                    keyElement.textContent=key[lang].toLowerCase();
                    keyElement.addEventListener("click",()=>{
                        console.log("del clicked");
                        keyElement.classList.toggle('keyboard__key_active');
                    })
                    break;

                case "Enter":
                    keyElement.classList.add("keyboard__key_size-l");
                    keyElement.textContent=key[lang].toLowerCase();
                    keyElement.addEventListener("click",()=>{
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    })
                    break;

                case "Space":
                    keyElement.classList.add("keyboard__key_size-xl");
                    keyElement.textContent=key[lang].toLowerCase();
                    keyElement.addEventListener("click",()=>{
                        this.properties.value += " ";
                        this._triggerEvent("oninput");

                    })
                    break;

                case "AltRight":
                case "AltLeft":
                    keyElement.textContent=key[lang].toLowerCase();
                  keyElement.addEventListener("click",()=> {
                        this.close();
                        this._triggerEvent("onclose");
                    })
                    break;

                case "ShiftRight":
                case "ShiftLeft":
                    keyElement.classList.add("keyboard__key_size-l");
                    keyElement.textContent=key[lang].toLowerCase();
                    keyElement.addEventListener("click",()=> {

                    })
                    break;



                default:
                    keyElement.textContent=key[lang].toLowerCase();
                    keyElement.addEventListener("click",()=> {
                    this.properties.value += this.properties.capslock?key[lang].toUpperCase():key[lang].toLowerCase();
                    this._triggerEvent("oninput");
                    })
                    break;
            }

            fragment.appendChild(keyElement);
            if(lineBreak) {
                fragment.appendChild(document.createElement("br"));
            }

            document.addEventListener('keydown',(event)=>{
                if((event.code.toLowerCase()===key.code.toLowerCase()) && (event.code.toLowerCase()==='capslock')) {
                keyElement.classList.toggle('keyboard__key_active');
                    this._toggleCapsLock();
            }


                if((event.code.toLowerCase()===key.code.toLowerCase()) &&(event.code.toLowerCase()!==('capslock'||'backspace'||'delete'||'enter')))  {
                  keyElement.classList.add('keyboard__key_active');
                  console.log(keyElement);

                }

            });

            document.addEventListener('keyup',(event)=> {
                if (event.code.toLowerCase() === key.code.toLowerCase() &&(event.code.toLowerCase()!=='capslock')) {
                     keyElement.classList.remove('keyboard__key_active');
                }

            }
            )

        })


    return fragment;
    },

    _triggerEvent(handlerName){
        if (typeof this.eventsHandlers[handlerName] =="function"){
            this.eventsHandlers[handlerName](this.properties.value)
        }
    },

    _toggleCapsLock() {
        console.log('Capslock toggled');
        this.properties.capslock=!this.properties.capslock;
        for(const key of this.elements.keys) {
            if (!(key.classList.contains("keyboard__key_size-m") ||key.classList.contains("keyboard__key_size-l") || key.classList.contains("keyboard__key_size-xl"))) {
                    key.textContent = this.properties.capslock? key.textContent.toUpperCase():key.textContent.toLowerCase();

            }
        }

    },

    open(initialValue, oninput,onclose) {
        this.properties.value=initialValue||"";
        this.eventsHandlers.oninput=oninput;
        this.eventsHandlers.onclose=onclose;
        this.elements.main.classList.remove("keyboard_hidden");
    },

    close() {
        this.properties.value="";
        this.eventsHandlers.oninput=oninput;
        this.eventsHandlers.onclose=onclose;
        this.elements.main.classList.add('keyboard_hidden');
    }

}

document.addEventListener("DOMContentLoaded", function() {
    Keyboard.init();
 })



































// const textarea = document.querySelector('.textarea');
// console.log(textarea);
// const KeyZ = document.querySelector('.KeyZ');
// console.log(KeyZ.textContent);
// textarea.addEventListener('input', (event) => {
//     let result = event;
//     console.log(result)
// });
//
// document.addEventListener('keydown', function (event) {
//         if (event.code === 'KeyZ' && (event.ctrlKey || event.metaKey)) {
//             KeyZ.textContent=KeyZ.textContent.toLowerCase();
//         }
//     }
// )
// document.addEventListener('keyup', function (event) {
//         if (!(event.code === 'KeyZ' && (event.ctrlKey || event.metaKey))) {
//             KeyZ.classList.remove('back');
//         }
//     }
// )