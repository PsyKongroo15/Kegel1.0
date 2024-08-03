const div_showContent = document.querySelector(".showContent"); 
const div_seccion1 = document.querySelector(".seccion1");
const div_seccion2 = document.querySelector(".seccion2");
let mensaje_inhala = 'Relaja / Inhala';
let mensaje_exhala = 'Contrae / Exhala';
let mensaje_final = 'Ejercicio finalizado';
let interval;
let working = false;
let counterRapidas = 0;
let counterLentas = 0;
let timeOut5S;
let timeOut3S;

function handleButton(button){
    const tipo = button.getAttribute('data-tipo');
    const accion = button.getAttribute('data-accion');
    let countdown;
    let toggle = true; // Variable para alternar entre mensajes en el intervalo. Cambia de estado
    
    console.log(`Boton de tipo: ${tipo}, accion: ${accion}.`)

    switch(tipo){
        case 'rapidas': 
            if (accion =='iniciar'){
                console.log('Se inicia el cronometro');
                countdown = 2;

                if (working) {
                    EndExercise();
                } else {
                    working = true;
            // Altenar el toggle en cada intervalo (segundo) 
            // La seccion activa cambia el color de fondo
                    div_seccion1.style.backgroundColor = "rgb(35, 199, 191)";
                 // Contracciones rapidas
                    function ContraccionesRapidas(){
                        if (countdown > 0) {
                            if (toggle) {
                                div_showContent.innerHTML = 
                                "<h1>" +mensaje_exhala + "</h1>" 
                                + "<h2> Repiticiones restantes: " + countdown + "</h2>";

                                div_showContent.style.backgroundColor = "#cc0000";
                            } else {
                                div_showContent.innerHTML = 
                                "<h1>" +mensaje_inhala + "</h1>"
                                + "<h2> Repiticiones restantes: " + countdown + "</h2>";

                                div_showContent.style.backgroundColor = "green";
                                countdown--;
                            } 
                            toggle = !toggle;
            
                        } else {
                            counterRapidas++;
                            EndExercise();
                        }
                    }
                    ContraccionesRapidas(); // Llamada directa a la funcion, evitamos el delay al iniciar
                    interval = setInterval(ContraccionesRapidas, 1000);
                }

            } else if (accion == 'parar') {
                console.log('Se para el cronometro');
                             EndExercise();
            }
            break;





        case 'lentas':
            if (accion == 'iniciar'){
                console.log('Se inicia el cronometro');
                countdown = 1;

                if (working){
                    EndExercise();
                } else {
                    working = true;
                    // Contracciones lentas
                    // Vamos a necesitar usar setTimeout() para lograr que se muestren 5 y 3 segundos
    
                    // La seccion activa cambia el color de fondo
                    div_seccion2.style.backgroundColor = "rgb(35, 199, 191)";
               
                     // Funcion anonima flecha que lleva a cabo el bucle
                        function ContraccionesLentas(){ 
                                if (countdown > 0) {
                                    if (toggle) {
                                        div_showContent.innerHTML = 
                                        "<h1>" +mensaje_exhala + "</h1>" 
                                        + "<h2> Repiticiones restantes: " + countdown + "</h2>";
                                        // Color fondo
                                        div_showContent.style.backgroundColor = "#cc0000";
                                        // Continua despues de 5 segundos
                                        timeOut5S = setTimeout(ContraccionesLentas, 5000);
                                    } else {
                                        div_showContent.innerHTML = 
                                        "<h1>" +mensaje_inhala + "</h1>"
                                        + "<h2> Repiticiones restantes: " + countdown + "</h2>";
        
                                        div_showContent.style.backgroundColor = "green";
                                        countdown--;
                                       
                                       timeOut3S = setTimeout(ContraccionesLentas, 3000);
                                    } 
                                    toggle = !toggle;
                    
                                } else {
                                    counterLentas++;
                                    EndExercise();
                                    console.log(counterRapidas, counterLentas);
                                }
                        }
                        ContraccionesLentas(); // Iniciar el ciclo
                }
            } else if (accion == 'parar') {
                EndExercise();
                console.log('Se para el cronometro');
            }
            break;



        // Logica para finalizar el ejercicio independientemente de donde se intente finalizar.
            function EndExercise(){
                working = false;
                // Limpia el intervalo que hace el bucle de las rapidas
                if (interval){
                    clearInterval(interval);
                    endContent();
                } 
                // Limpia los timeouts que hacen el bucle de las lentas
                if (timeOut5S){
                    clearTimeout(timeOut5S);
                    endContent();
                }

                if (timeOut3S){
                    clearTimeout(timeOut3S);
                }

                // Muestra el contenido de ejercicio finalizado
                function endContent(){
                    div_showContent.innerHTML = 
                    "  <h1>Exhala | Inhala </h1>" +
                    " <h1>Lo hiciste bien</h1>"
                    div_showContent.style.backgroundColor = "";

                    // Limpio los fondos de la seccion activada
                    div_seccion1.style.backgroundColor = "";
                    div_seccion2.style.backgroundColor = "";
                }

                actualDate = new Date();
                Completados(counterRapidas, counterLentas, actualDate);
            }
    } // Fin del switch
}


const h1Rapidas = document.querySelector(".RapidasCompletas");
const h1Lentas = document.querySelector(".LentasCompletas");
const h1Fecha = document.querySelector(".Fecha");


function Completados(counterRapidas, counterLentas, actualDate){
    console.log(counterRapidas, counterLentas, actualDate);
    localStorage.setItem("RapidasCompletadas", counterRapidas);
    localStorage.setItem("LentasCompletadas", counterLentas );
    localStorage.setItem("Fecha", actualDate);

}

window.addEventListener("load", showHistory());

function showHistory(){
    h1Rapidas.textContent = `Series Rapidas: ` .;
    h1Lentas.textContent = 'Series lentas: ' .;
    h1Fecha.textContent = 'Fecha: ' .;
}