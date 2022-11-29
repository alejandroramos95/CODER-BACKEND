process.on("message", (cantidad) =>{
    const numeros = [];
    const objetoNumeros = [];
    function generarNumeros()  {
        for(i=0; i<cantidad; i++){
            numeros.push(parseInt(Math.random() * cantidad + 1));
        }
        verificar();
    };
    function verificar() {
        let contador = 0;
        let indice;
        for (let j = 1; j <= cantidad;) {
            indice = numeros.indexOf(j);
            if(indice!=-1){
                contador++;
                numeros.splice(indice,1);
            }else{
                objetoNumeros.push({[j]: contador});
                contador = 0;
                j++;
            }
        }
    };
    console.log("Subproceso iniciado...");
    generarNumeros();
    console.log("Subproceso finalizado...");
    process.send({objetoNumeros});
});