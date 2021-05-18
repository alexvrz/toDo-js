const formulario = document.querySelector('#formulario')
const input= document.querySelector('#input')
const listaTarea = document.querySelector('#lista-tareas')
const template = document.querySelector('#template').content
const fragment = document.createDocumentFragment()
let tareas = {}// usamos let porque se sobreescribe el objeto, tiene que cambiar, con una constante no se pude, si fuera array no importa, existe el push 
document.addEventListener('DOMContentLoaded', () => {
    pintarTareas()
})
listaTarea.addEventListener("click", e => {
    btnAction(e)
})

formulario.addEventListener('submit', e => {
    e.preventDefault()
    //console.log('proceso');
    //console.log(e.target[0].value);
    //console.log(e.target.querySelector("input").value);
    //console.log(input.value);//cualquiera de las tres formas esta bien, cada uno accede al valor del input, input value es el texto

    setTarea(e)
})
const setTarea = e => {
    if (input.value.trim() === '') {//validacion, trim elimina espacios vacios
        console.log("esta vacio")
        return //si no se pone el return el codigo sigue corriendo
    }
    //console.log("diste click");
    const tarea = {
        id:Date.now(),//genera un numero de la fecha y hora con decimales, por lo tanto siempre es distinto he ideal para un id
        texto:input.value,
        estado: false
    }
    tareas[tarea.id] = tarea// tareas es el objeto y le indicamos que va a tener tarea.id, es decir el id del texto que se escribe, el igual a tarea es el objeto tarea
    //console.log(tareas);
    formulario.reset()//reinicia el formulario, lo deja en blanco
    input.focus()//permite que el autofocus en el html al dar click en el boton el input sigue seleccionado
    pintarTareas()
}

const pintarTareas = () => {
    listaTarea.innerHTML="" //esto para que no se repita las tareas ya agreagadas, parte de uno en blanco
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)//primero va el clone del template,para modificar ese clone, no como en el carro, corregir
        clone.querySelector('p').textContent = tarea.texto
        if (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('p').style.textDecoration='line-through'
        }
        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)//el tema del reflow se recomienda hacer el fragment en los foreach para no sobrecargar la pagina de mucchos elementos
    })//para recorrer objetos
    listaTarea.appendChild(fragment)
}
const btnAction = e => {
    //console.log(e.target.classList.contains('fa-check-circle'));
    if (e.target.classList.contains('fa-check-circle')) {
        //console.log(e.target.dataset.id);
        tareas[e.target.dataset.id].estado = true//con esto cambio el estado de la tarea
        pintarTareas()
    }
    if (e.target.classList.contains('fa-minus-circle')) {
        delete tareas[e.target.dataset.id]
        pintarTareas()
    }
    if (e.target.classList.contains('fa-undo-alt')) {
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }
    e.stopPropagation()// si hubieran otro addeventlistener en otro lado se activarian si no tuviera stop propagation
}