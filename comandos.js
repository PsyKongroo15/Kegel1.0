const div_showContent = document.querySelector(".showContent"); 
let mensaje_inhala = 'Relaja / Inhala';
let mensaje_exhala = 'Contrae / Exhala';
let mensaje_final = 'Ejercicio finalizado';
let interval;

function handleButton(button){
    const tipo = button.getAttribute('data-tipo');
    const accion = button.getAttribute('data-accion');
    let countdown;
    let toggle = true; // Variable para alternar entre mensajes en el intervalo. Cambia de estado
    
    console.log(`Boton de tipo: ${tipo}, accion: ${accion}.`)

    switch(tipo){
        case 'rapidas': 
            if (accion =='iniciar'){
             // Countdown para contar repeticiones restantes
             // Cuando muestra el mensaje 2 (inhhala/relaja) resta 1 al countdown
             // Altenar el toggle en cada intervalo (segundo) 
             
             // Contracciones rapidas
                countdown = 10;

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
                        EndExercise();
                    }
                }

                ContraccionesRapidas();
                interval = setInterval(ContraccionesRapidas, 1000);
   
                  /*  setTimeout(() => {
                        div_showContent.innerHTML = "<h1>Repeticiones restantes: " + exhala + "</h1>";
                    }, 1000);

                    */


                console.log('Se inicia el cronometro');
            } else if (accion == 'parar') {
                console.log('Se para el cronometro');
                             EndExercise();
            }
            break;





        case 'lentas':
            if (accion == 'iniciar'){
                console.log('Se inicia el cronometro');
                countdown = 10;
                
                // Contracciones lentas
                // Vamos a necesitar usar setTimeout() para lograr que se muestren 5 y 3 segundos
           
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
                                EndExercise();
                            }
                    }
                    ContraccionesLentas(); // Iniciar el ciclo
            } else if (accion == 'parar') {
                EndExercise();
                console.log('Se para el cronometro');
            }
            break;



        // Logica para finalizar el ejercicio independientemente de donde se intente finalizar.
            function EndExercise(){
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
                    div_showContent.style.backgroundColor = "pink";
                }
                

            }


    }

   /* if (tipo == 'rapidas' && accion=='iniciar'){
       //  console.log('La mama de la mama')
        for (i = 10; i > 0; i--){
            console.log(`Faltan ${i} repeticiones`);
        }
    }
    */




  

}