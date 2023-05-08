const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


// CONTROLE DE MOVIMENTAÇÃ0
const teclado = {
    cima: false, 
    baixo: false,
    hold: false, 
    esquerda: false, 
    direita: false,
    espaco:false,
    hold2: false
}


// VERIFICANDO SE A TECLA ESTA PRESSIONADA

addEventListener("keydown", (event)=>{
    let key = event.key;
    if(event.key === "ArrowRight") // seta direita
    {
        teclado.direita = true;
        player.lastKeyPressed = key;
    }
    else if(event.key === "ArrowLeft") //seta esqueda
    {
        teclado.esquerda = true;
        player.lastKeyPressed = key;
    }
    else if(event.key === "ArrowUp") //seta cima
    {
        teclado.cima = true;
    }
    else if(event.key === "ArrowDown") // seta baixo
    {
        teclado.baixo = true;
    }
    else if(event.key === " ") // espaco
    {
        teclado.espaco = true
    }
})

// VERIFICANDO QUANDO A TECLA NAO ESTA PRESSIONADA

addEventListener("keyup", (event)=>{
    if(event.key === "ArrowRight")  // seta direita
    {
        teclado.direita = false;
    }
    else if(event.key === "ArrowLeft")  //seta esqueda
    {
        teclado.esquerda = false;
    }
    else if(event.key === "ArrowUp")  //seta cima
    {
        teclado.cima = false;
        teclado.hold = false;
    }
    else if(event.key === "ArrowDown")  // seta baixo
    {
        teclado.baixo = false;
    }
    else if(event.key === " ")  //espaço
    {
        teclado.espaco = false;
        teclado.hold2 = false;
    }
})

const jogo = ()=>{
    ctx.clearRect(0,0, canvas.width, canvas.height);

    background.atualizar();
    player.atualizar();
    player.gravidade_funcao();
    player.gerenciar();
    

    requestAnimationFrame(jogo);
}

requestAnimationFrame(jogo);
