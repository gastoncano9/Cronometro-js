'use strict';

const botonPlay = document.getElementById("play");
const botonPausa = document.getElementById("pausa");
const botonRecargar = document.getElementById("recargar");
const segundos = document.getElementById("segundos");
const minutos = document.getElementById("minutos");
let banderaCargar = 0;
let banderaPlay = 0;

if(banderaCargar == 0)
{
    localStorage.clear();

    banderaCargar = 1;
}

const iniciar = ()=>
{
    let contadorMinutos;
    let contadorSegundos;
    banderaPlay = 1;

    if(banderaPlay == 1)
    {
        botonPlay.setAttribute("disabled", "true");
    }

    if(localStorage.length > 0)
    {
        contadorSegundos = localStorage.getItem("segundos");
        contadorMinutos = localStorage.getItem("minutos");
    }
    else
    {
        contadorSegundos = 0;
        contadorMinutos = 0;
    }

    const intervalo = setInterval(()=>
    {
        contadorSegundos++;
        segundos.innerHTML = `:${formato(contadorSegundos)}`;

        if(contadorSegundos == 60)
        {
            contadorSegundos = 0;
            segundos.innerHTML = `:${formato(contadorSegundos)}`;
            contadorMinutos++;
            minutos.innerHTML = `${formato(contadorMinutos)}`
        }

    },1000);

    const reiniciar = () =>
    {
        clearInterval(intervalo);
        minutos.innerHTML = "00"
        segundos.innerHTML = ":00"
        localStorage.clear();
        botonPlay.removeAttribute("disabled");
    }

    const pausar = () =>
    {
        botonPlay.removeAttribute("disabled");
        localStorage.setItem("segundos", contadorSegundos);
        localStorage.setItem("minutos", contadorMinutos);
        clearInterval(intervalo);
    }

    botonRecargar.addEventListener("click", reiniciar);
    botonPausa.addEventListener("click", pausar);

}


function formato(tiempo)
{

    if(tiempo < 10)
    {
        tiempo = "0" + tiempo;
    }

    return tiempo;
}   

botonPlay.addEventListener("click", iniciar);