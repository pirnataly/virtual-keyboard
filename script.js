document.body.classList.add('body');

//creating and inserting heading

let h1 = document.createElement('h1');
h1.className='heading';
h1.textContent='Virtual-keyboard in JS';
document.body.append(h1);

//creating and inserting textarea

let textarea=document.createElement('textarea');
textarea.className='textarea';
textarea.setAttribute('cols','100');
textarea.setAttribute('rows','10');
document.body.append(textarea);

