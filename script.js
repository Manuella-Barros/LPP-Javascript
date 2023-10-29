const button = document.getElementById("button");
const divResultado = document.getElementById("resultado");

const copas = "01c02c03c04c05c06c07c08c09c10c11c12c13c";
const espadas = "01e02e03e04e05e06e07e08e09e10e11e12e13e";
const ouros = "01u02u03u04u05u06u07u08u09u10u11u12u13u";
const paus = "01p02p03p04p05p06p07p08p09p10p11p12p13p";

button.addEventListener("click", (event) => {
    event.preventDefault();
    const cartas_inseridas = document.getElementById("cartas").value.toLowerCase(); // pega o input
    
    if(isCartasValidas(cartas_inseridas)){
        const vetor = [];
        const baralho = stringToVector(cartas_inseridas, vetor); // vetor com as cartas do input

        if(isVetorValido(baralho)){
            const qntCopas = retornaCartasFaltantes(baralho, copas, 'c');
            const qntEspadas = retornaCartasFaltantes(baralho, espadas, 'e');
            const qntOuros = retornaCartasFaltantes(baralho, ouros, 'u');
            const qntPaus = retornaCartasFaltantes(baralho, paus, 'p');
            divResultado.innerHTML = `Copas: ${qntCopas} <br>Espadas: ${qntEspadas} <br>Ouros: ${qntOuros} <br>Paus: ${qntPaus}`;

        } else{
            divResultado.innerHTML = "Porfavor insira as cartas no formato ddn (DigitoDigitoNaipe). <br>Sendo -> 1 <= digito  <= 13 && naipe = c, e, u ou p";
        }
    } else{
        divResultado.innerHTML = "Porfavor insira uma entrada de tamanho válido";
    }

});

function isCartasValidas(cartas){
    if(cartas != '' && cartas.length % 3 == 0){
        return true;
    }

    return false;
}

//transforma a string em vetor
function stringToVector(cartas, vetor){
    if(cartas.length == 0){
        return vetor;
    }

    const carta = cartas.substring(0, 3);
    vetor = [...vetor, carta];

    const proxCartas = cartas.substring(3);
    return stringToVector(proxCartas, vetor);
}

// retorna true se o formato das cartas são validas
function isVetorValido(vetor){
    let isValid = true;

    vetor.map(carta => {
        const num = Number(carta[0] + carta[1]);
        const naipe = carta[2];

        if(num < 1 || num > 13 || (naipe != 'c' && naipe != 'p' && naipe != 'u' && naipe != 'e')){
            isValid = false;
        }
    })

    return isValid;
}

// retorna true se for duplicado
function isCartasDuplicadas(baralho, naipe){// 01p 02p 03p
    let naipe_duplicado = ""; // string com naipes duplicados

    const baralho_Sem_duplicadas = baralho.reduce((acc, carta) => {
        if(acc.includes(carta)){
            naipe_duplicado += carta[2];
            return [acc];
        }

        return [...acc, carta];
    }, "0");

    if(naipe_duplicado.includes(naipe)){
        return true;
    } else{
        return false;
    }
}

function retornaCartasFaltantes(baralho_entrada, baralho_completo, naipe){
    let qntCartas = 0;

    if(isCartasDuplicadas(baralho_entrada, naipe)){
        return "erro";
    }

    baralho_entrada.map(carta => {
        if(baralho_completo.includes(carta)){
            qntCartas++;
        }
    })

    return 13 - qntCartas;
}