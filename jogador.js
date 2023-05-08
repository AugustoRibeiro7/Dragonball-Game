class Sprite
{
    constructor({posicao, imgSrc, escala = 1, sprite_max = 1, deslocamento_sprite={x:0, y:0} })
    {
        this.posicao = posicao;
        this.img = new Image;
        this.img.src = imgSrc
        this.escala=escala;
        this.sprite_max = sprite_max;
        this.escolha_sprite = 0;
        this.tempo_sprite = 8;
        this.tempo_sprite_decorrido = 0;
        this.deslocamento_sprite = deslocamento_sprite;
    }

    desenhar()
    {
        ctx.drawImage(
            this.img,
            this.img.width / this.sprite_max * this.escolha_sprite,
            0,
            this.img.width / this.sprite_max,
            this.img.height,
            this.posicao.x - this.deslocamento_sprite.x, 
            this.posicao.y - this.deslocamento_sprite.y,
            (this.img.width / this.sprite_max) * this.escala,
            this.img.height * this.escala
        )
    }

    animacao_sprites()
    {
        this.tempo_sprite_decorrido++;
        if(this.tempo_sprite_decorrido % this.tempo_sprite == 0)
            if(this.escolha_sprite < this.sprite_max-1)
                this.escolha_sprite++;
            else
                this.escolha_sprite = 0;
    }

    atualizar()
    {
        this.desenhar();
        this.animacao_sprites();
    }
}

class jogador extends Sprite
{
    constructor({
        posicao,
        velocidadeY,
        imgSrc,
        escala = 1,
        sprite_max = 1,
        deslocamento_sprite={x:0, y:0},
        sprites
    })
    {
        super({
            posicao,
            imgSrc,
            escala,
            sprite_max,
            deslocamento_sprite
        })

        this.escolha_sprite = 0;
        this.tempo_sprite = 8;
        this.tempo_sprite_decorrido = 0;

        this.sprites=sprites;

        for(const sprite in this.sprites)
        {
            sprites[sprite].img = new Image()
            sprites[sprite].img.src = sprites[sprite].imgSrc
        }
      
        // JOGADOR
        this.velocidade = 6;
        this.gravidade = 1.5;
        this.velocidadeY=velocidadeY;

        //ATAQUE
        this.caixa_ataque = {
            posicao: {
                x: posicao.x,
                y: posicao.y
            },
            largura: 300,
            altura: 50
        }
        this.atacando
        this.ataque_cooldown = 1000
        this.ataque_cooldown_ativo

        //VERIFICADORES
        this.lastKeyPressed
        this.noChao
        
        //IMAGEM ALTURA
        this.altura_script = this.img.height;

        this.img.addEventListener("load",()=>{
            this.desenhar();
        })
    }

    // FUNÇÃO PARA CONTROLAR ANIMAÇÃO DE ANDAR DO PERSONAGEM

    gerenciar()
    {
        if(teclado.esquerda && ["ArrowLeft"].includes(player.lastKeyPressed) )  // SE FOR TRUE
        {
            if (this.posicao.x > 0 )
            {
                this.posicao.x -= this.velocidade;
                player.trocaSprites('correr_esquerda')
            }
        }
        else if(teclado.direita && ["ArrowRight"].includes(player.lastKeyPressed))  // SE FOR TRUE
        {
            if(this.posicao.x < canvas.width - (this.img.width / this.sprite_max))
            {
                this.posicao.x += this.velocidade;
                player.trocaSprites('correr_direita')
            }
        }
        else
        {
            player.trocaSprites('parado');
        }
        if(teclado.cima && !teclado.hold)  // SE FOR TRUE
        {
            player.pular();
            teclado.hold = true
        }

        if(teclado.espaco && !teclado.hold2)
        {
            player.ataque()
            teclado.hold2 = true;
        }
    }

    trocaSprites(sprite)
    {
        switch(sprite)
        {
            case 'parado':
                if(this.img !== this.sprites.parado.img)
                {
                    this.img = this.sprites.parado.img
                    this.sprite_max = this.sprites.parado.sprite_max
                    this.escolha_sprite = 0;
                }
                break;
            case 'correr_esquerda':
                if(this.img !== this.sprites.correr_esquerda.img)
                {
                    this.img = this.sprites.correr_esquerda.img
                    this.sprite_max = this.sprites.correr_esquerda.sprite_max
                    this.escolha_sprite = 0;
                }
                break;
            case 'correr_direita':
                if(this.img !== this.sprites.correr_direita.img)
                {
                    this.img = this.sprites.correr_direita.img
                    this.sprite_max = this.sprites.correr_direita.sprite_max
                    this.escolha_sprite = 0;
                }
                break;
        }
    }

    gravidade_funcao()
    {
        if(Math.ceil(this.posicao.y + this.altura_script + this.velocidadeY >= canvas.height - 120)) //MAth.ceil arredonda tudo para cima
            this.noChao = true;
        else
            this.noChao = false;

        if(this.posicao.y + this.altura_script + this.velocidadeY > canvas.height - 120)
        {
            this.velocidadeY = 0;
        }
        else
        {
            if(!this.noChao)
                this.velocidadeY += this.gravidade;
        } 

        this.posicao.y += this.velocidadeY;

        this.caixa_ataque.posicao.y = this.posicao.y;
        this.caixa_ataque.posicao.x = this.posicao.x;
    }

    // FUNÇÃO PARA CORRIGIR O PULO
    pular()
    {
        if(!this.noChao) return
        this.velocidadeY -= 30;
    }

    ataque()
    {
        if(this.ataque_cooldown_ativo) return

        this.atacando = true
        this.ataque_cooldown_ativo = true

        setTimeout(()=>{
            this.atacando = false
        },100)

        setTimeout(()=>{
            this.ataque_cooldown_ativo = false
        },this.ataque_cooldown)
    }

    atualizar()
    {
        this.desenhar();
        this.animacao_sprites();
    }
}

const player = new jogador({
    posicao:{
        x: 100,
        y: 0
    },
    velocidadeY: 0,
    imgSrc: './sprites/goku.png',
    sprite_max: 5,
    sprites:{
        parado:{
            imgSrc: './sprites/goku.png',
            sprite_max: 5,
            deslocamento_sprite:{
                x:0,
                y:0
            }
        },
        correr_esquerda:{
            imgSrc: './sprites/goku-esquerda.png',
            sprite_max: 8,
            deslocamento_sprite:{
                x:0,
                y:0
            }
        },
        correr_direita:{
            imgSrc: './sprites/goku-direita.png',
            sprite_max: 8,
            deslocamento_sprite:{
                x:0,
                y:0
            }
        }
    }
})

const background = new Sprite({
    posicao:{
        x: 0,
        y: 0
    },
    imgSrc: './sprites/fundo.png'
})