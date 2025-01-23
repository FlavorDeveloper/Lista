// Variables: Seleccionamos los elementos del DOM que vamos a utilizar.
const textArea = document.querySelector('#texto'); // Área de texto para ingresar tareas.
const addBtn = document.querySelector('#add-Btn'); // Botón para agregar tareas.
const resetBtn = document.querySelector('#reset-Btn'); // Botón para resetear/limpiar la lista.
const textAgregado = document.querySelector('#txt-add'); // Contenedor donde se mostrarán las tareas.
const body = document.querySelector('body'); // Body

// Event Listeners: Asignamos eventos a los elementos del DOM.
addBtn.addEventListener('click', agregarTarea); // Al hacer clic en "Agregar", ejecuta la función agregarTarea.
textArea.addEventListener('keydown', teclaEnter); // Al presionar una tecla en el área de texto, verifica si es "Enter".
resetBtn.addEventListener('click', limpiarDOM); // Al hacer clic en "Reset", limpia la lista y el localStorage.

// DOMContentLoaded: Cuando el DOM esté completamente cargado, ejecuta esta función.
document.addEventListener('DOMContentLoaded', () => {
    // Cargamos las tareas guardadas en el localStorage.
    const tareasGuardadas = JSON.parse(localStorage.getItem('Tareas')) || [];
    // Por cada tarea guardada, creamos un elemento de lista y lo agregamos al DOM.
    tareasGuardadas.forEach(tarea => {
        const parrafo = crearElementoLista(tarea);
        textAgregado.appendChild(parrafo);
    });
    // Aplicamos una transición CSS al body para animar la opacidad.
    body.style.transition = 'opacity 1s ease'; // 1s es la duración de la transición.
    // Usamos setTimeout para cambiar la opacidad después de un breve retraso.
    setTimeout(() => {
        body.style.opacity = 1 // Cambiamos la opacidad a 1.
    }, 300); // Retraso de 1 segundo (1000 ms).
});

// Funciones:

// Función para agregar una tarea.
function agregarTarea() {
    // Obtenemos el valor del área de texto y eliminamos espacios innecesarios.
    const txtwrite = textArea.value.trim();

    // Validamos que el texto no esté vacío.
    if (!txtwrite) {
        mostrarError('No puede estar vacío'); // Mostramos un mensaje de error si está vacío.
        return; // Salimos de la función.
    }

    // Creamos un elemento de lista (li) con el texto ingresado.
    const parrafo = crearElementoLista(txtwrite);
    // Agregamos el elemento de lista al contenedor en el DOM.
    textAgregado.appendChild(parrafo);
    // Guardamos la tarea en el localStorage.
    agregarLocalStorage(txtwrite);
    // Limpiamos el área de texto para una nueva entrada.
    reiniciarArea();
}

// Función para crear un elemento de lista (li) con el texto proporcionado.
function crearElementoLista(texto) {
    // Creamos un elemento <li>.
    const parrafo = document.createElement('li');
    // Aplicamos estilos al elemento <li>.
    Object.assign(parrafo.style, {
        fontSize: '2rem',
        textAlign: 'center',
        padding: '1rem',
        fontFamily: '"Nunito", serif'
    });
    // Asignamos el texto al elemento <li>.
    parrafo.textContent = `${texto}`;

    // Creamos un botón para eliminar la tarea.
    const xTag = crearBotonEliminar(parrafo);
    // Agregamos el botón al elemento <li>.
    parrafo.appendChild(xTag);

    // Devolvemos el elemento <li> creado.
    return parrafo;
}

// Función para crear un botón de eliminar (✖︎) para cada tarea.
function crearBotonEliminar(parrafo) {
    // Creamos un elemento <button>.
    const xTag = document.createElement('button');
    // Asignamos el símbolo "✖︎" como texto del botón.
    xTag.textContent = '✖︎';
    // Aplicamos estilos al botón.
    Object.assign(xTag.style, {
        width: 'max-content',
        margin: '1rem auto',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '3rem',
        backgroundColor: 'transparent'
    });
    // Asignamos un evento para eliminar la tarea al hacer clic en el botón.
    xTag.addEventListener('click', () => parrafo.remove());

    // Devolvemos el botón creado.
    return xTag;
}

// Función para mostrar un mensaje de error.
function mostrarError(mensaje) {
    // Creamos un elemento <p> para el mensaje de error.
    const error = document.createElement('p');
    // Asignamos el mensaje de error al elemento.
    error.textContent = mensaje;
    // Aplicamos estilos al mensaje de error.
    Object.assign(error.style, {
        textAlign: 'center',
        backgroundColor: '#F25757',
        padding: '.5rem',
        color: 'white',
        fontWeight: 'bold',
        width: '50%',
        margin: '0 auto',
        borderRadius: '.5rem'
    });
    // Insertamos el mensaje de error después del área de texto.
    textArea.insertAdjacentElement('afterend', error);
    // Eliminamos el mensaje de error después de 2 segundos.
    setTimeout(() => error.remove(), 2000);
}

// Función para limpiar el área de texto.
function reiniciarArea() {
    textArea.value = ''; // Establecemos el valor del área de texto como vacío.
}

// Función para manejar la tecla "Enter" en el área de texto.
function teclaEnter(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Evitamos el comportamiento por defecto (salto de línea).
        agregarTarea(); // Ejecutamos la función para agregar la tarea.
    }
}

// Función para guardar una tarea en el localStorage.
function agregarLocalStorage(txt) {
    // Obtenemos las tareas guardadas o inicializamos un array vacío.
    let tareas = JSON.parse(localStorage.getItem('Tareas')) || [];
    // Agregamos la nueva tarea al array.
    tareas.push(txt);
    // Guardamos el array actualizado en el localStorage.
    localStorage.setItem('Tareas', JSON.stringify(tareas));
}

// Función para limpiar el localStorage.
function clearLocalStorage() {
    localStorage.clear(); // Eliminamos todos los datos del localStorage.
}

// Función para limpiar el DOM y el localStorage.
function limpiarDOM() {
    textAgregado.innerHTML = ''; // Eliminamos todos los elementos del contenedor de tareas.
    reiniciarArea(); // Limpiamos el área de texto.
    clearLocalStorage(); // Limpiamos el localStorage.
}