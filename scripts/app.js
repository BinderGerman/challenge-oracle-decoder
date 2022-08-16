// Capturamos los ID  de los elementos con los que vamos a trabajar
const canvas = document.getElementById('canvas');
const main = document.querySelector('main');
const textarea = document.getElementById('textarea'); 
const parrWarning = document.querySelector('.text-area p');
const encrypt = document.getElementById('encrypt');
const decrypt = document.getElementById('decrypt');
const h4 = document.querySelector('h4');
const p = document.querySelector('.result p');
const info = document.getElementById('info');
const copy = document.getElementById('copy');

//Expresión regular
const regex = /[A-ZÑÁáÉéÍíÓóÚúÜü]/;

//Variable con un array de objetos, donde se guardan las letras alcanzadas por la codificación y el código que las reemplaza.
let params = [
    {
        vocal: 'e',
        code: 'enter'

    },
    {
        vocal: 'i',
        code: 'imes'

    },
    {
        vocal: 'a',
        code: 'ai'

    },
    {
        vocal: 'o',
        code: 'ober'

    },
    {
        vocal: 'u',
        code: 'ufat'

    },
];

function environment(x) {
    h4.classList.add('hidden');
    p.classList.add('hidden'); 
    info.classList.remove('info');
    info.classList.add('last-info'); 
 
    
    info.innerHTML = `<p id="textToCopy">${x}</p>`;

    copy.classList.remove('hidden');

    textarea.value = '';
    textarea.focus();

}

function restoreEnvironment() {
    h4.classList.remove('hidden');
    p.classList.remove('hidden'); 
    info.classList.add('info');
    info.classList.remove('last-info');
    copy.classList.add('hidden');
}

//Función para encriptar
function encodeMessage() {
    
    restoreEnvironment();

    let message = textarea.value;

    let resultingCode = message
    .replaceAll(params[0].vocal, params[0].code)
    .replaceAll(params[1].vocal, params[1].code)
    .replaceAll(params[2].vocal, params[2].code)
    .replaceAll(params[3].vocal, params[3].code)
    .replaceAll(params[4].vocal, params[4].code);

    environment(resultingCode);

    textarea.focus();
}

//Función para desencriptar
function decodeMessage() {
    
    restoreEnvironment();

    let message = textarea.value;

    let resultingCode = message
    .replaceAll(params[0].code, params[0].vocal)
    .replaceAll(params[1].code, params[1].vocal)
    .replaceAll(params[2].code, params[2].vocal)
    .replaceAll(params[3].code, params[3].vocal)
    .replaceAll(params[4].code, params[4].vocal);

    environment(resultingCode);

    textarea.focus();
}

//Animción tipo matrix
function animation() {
    //al momento de iniciar la animación remuevo todo el main aplicando la clase hidden
    main.classList.add('hidden')
    //Remuevo la clase que oculta el canvas
    canvas.classList.remove('hidden'); 

    //Preparo el contexto
    const context = canvas.getContext('2d'); 

    canvas.width = document.body.offsetWidth; 
    canvas.height = document.body.offsetHeight;

    const w = canvas.width;
    const h = canvas.height;

    context.fillStyle = '#000'; 
    context.fillRect(0, 0, w, h); 

    const columnas = Math.floor(w / 20) + 1; 
    const posicion_y = Array(columnas).fill(0); 

    //Inicio la animación con un intervalo de 50ms.
    setInterval(() => {
        
        context.fillStyle = '#0001'; 
        context.fillRect(0, 0, w, h); 
        context.fillStyle = '#0f0'; 
        context.font = '15pt, monospace'; 
    
        posicion_y.forEach((y, ind) =>{
            const text = 
            String.fromCharCode(
                Math.random() * 128);
            const x = ind * 20; 
            context.fillText(text, x, y);
            if(y > 100 + Math.random() * 10000) {
                posicion_y[ind] = 0;
            }
            else {
               posicion_y[ind] = y + 20;  
            }
        })

    }, 50);
    
    //Corto la animación volviendo a agregar la clase que me oculta el canvas y volviendo a mostrar el main
    setTimeout(() => {
        canvas.classList.add('hidden');
        main.classList.remove('hidden');
        
    }, 2500);
}

encrypt.addEventListener('click', () => {
    
    if(regex.test(textarea.value.trim()) == true || textarea.value.trim() == '') {
        parrWarning.classList.add('warning');
    } else {
        parrWarning.classList.remove('warning');
        animation();
        encodeMessage();
    }
    

})

decrypt.addEventListener('click', (e) => {
    e.preventDefault();

    if(regex.test(textarea.value.trim()) == true || textarea.value.trim() == '') {
        parrWarning.classList.add('warning');
    } else {
        parrWarning.classList.remove('warning');
        animation();
        decodeMessage();
    }
})


copy.addEventListener('click', (e) => {
    e.preventDefault();

    let content = document.getElementById('textToCopy').innerText;

    navigator.clipboard.writeText(content)

    document.getElementById('textToCopy').innerText = '';

    textarea.focus();

})



    
    



