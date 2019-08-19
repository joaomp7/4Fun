var novaCompra = null;
var fecharCompra = null;
var totalCompra = null;
var fecharPdv = null;

var codigoMercadoria = null;
var qtdeMercadoria = null;
var adicionaMercadoria = null;
var cancelaMercadoria = null;
var exibirLista = null;
var top10 = null;

var textArea = null;
var carrinho = new Array();

var lista;
var compra;
var opcaoPgto;

window.onload = function()
{
    novaCompra   = document.getElementById("nova-compra");
    fecharCompra = document.getElementById("fechar-compra");
    totalCompra  = document.getElementById('exibir-total-compra');
    fecharPdv    = document.getElementById("fechar-pdv");

    codigoMercadoria   = document.getElementById("cod-mercadoria");
    qtdeMercadoria     = document.getElementById("qtde-mercadoria");
    adicionaMercadoria = document.getElementById("adicionar-mercadoria");
    cancelaMercadoria  = document.getElementById("cancelar-mercadoria");
    exibirLista        = document.getElementById("exibir-mercadoria");
    top10              = document.getElementById("top10");

    textArea  = document.getElementById("texto");
    compra    = null;
    opcaoPgto = null;
}

function iniciarCompra()
{
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() 
    {
        if(this.readyState == 4 && this.status == 200)
        {
            if(this.responseText != null ||
                this.responseText != "")
            {
                compra = this.responseText;
                novaCompra.disabled = true;
                habilitarBotoes(true);
                textArea.value = cabecalho();
            }
        }
    };
    xmlhttp.open("GET", "PontoDeVenda.php?inicio=okay", true);
    xmlhttp.send();
}

function cancelarCompra()
{
    habilitarBotoes(false);
}

function tipoPagamento() // Provavelmente irei apagar depois.
{
    let formaPgto = parseInt(prompt("Selecione a forma de pagamento\n"
                                   +"1 - Dinheiro\n"
                                   +"2 - Cartão\n"
                                   +"3 - Cancelar"));   
    if(formaPgto == 1)
        opcaoPgto = "cartao";
    if(formaPgto == 2)
        opcaoPgto = "dinheiro";
}

function fecharCompra()
{
    let opcaoPgto = tipoPagamento();

    if(opcaoPgto == 'dinheiro')
    {
        let valorMonetario = parseFloat(prompt("Digite o valor em dinheiro"));

        alert("Troco: " + (valorMonetario - totalCompra.value));
    }

    if(opcaoPgto == 'cartao')
    {
        verificarCartao();
    }
}

// Right side functions
function adicionarMercadoria()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            if(this.responseText != "null")
                formataMercadoria(this.responseText)
        }
    };
    xmlhttp.open("GET", "PontoDeVenda.php?lista=lista", true);
    if(compra != null)
    {
        xmlhttp.send();
    }
}

function cancelarMercadoria()
{
    let escolha = parseInt(prompt("1 -> Remover mercadoria.\n"
                                 +"2 -> Remover unidade(s) de alguma mercadoria.\n"
                                 +"3 -> Cancelar."));

    switch(escolha)
    {
        case 1:
            removerMercadoria(); 
            textArea.value = cabecalho()+corpo();
            break;
        case 2:
            removerUnidadeMercadoria();
            textArea.value = cabecalho()+corpo();
            break;
        case 3:
            break;
        default:
            escolha= parseInt(prompt("1 -> Remover mercadoria.\n"
            +"2 -> Remover unidade(s) de alguma mercadoria.\n"
            +"3 -> Cancelar."));
    }
}

function exibirMercadorias()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
            if(this.responseText != "null")
                formatarLista(this.responseText);
    };
    
    xmlhttp.open("GET", "PontoDeVenda.php?lista=lista", true);
    xmlhttp.send();
}

function exibirTop10()
{
    let rankingJSON = exibirTop10JSON();
    let ranking = null;

    if(rankingJSON != null)
    {
        ranking = JSON.parse(rankingJSON);
        let lista = null;

        for(position in ranking)
            lista += ranking[position].cod+"===>"+
                     ranking[position].descricao+"===>"+
                     ranking[position].qtde+"\n";

        alert(lista);
    }
}

function habilitarBotoes(decision)
{
    cancelarCompra.disabled = !decision;
    fecharCompra.disabled = !decision;
    fecharPdv.disabled = !decision;

    adicionaMercadoria.disabled = !decision;
    cancelaMercadoria.disabled = !decision;
    exibirLista.disabled = !decision;
    top10.disabled = !decision;
}

function formataMercadoria(listaGeral)
{
    var listaJSON = listaGeral;
    var listaDeMercadorias = null;
    let itemCarrinho = new Object();

    if(listaJSON != null)
    {
        listaDeMercadorias = JSON.parse(listaJSON);
        if(codigoMercadoria != null || codigoMercadoria !== "" 
        && qtdeMercadoria != null || qtdeMercadoria !== "")
        {
            for(var i = 0; i < listaDeMercadorias.folha.length; i++)
            {
                if(listaDeMercadorias.folha[i].id == codigoMercadoria.value)
                {
                    itemCarrinho.id = listaDeMercadorias.folha[i].id;
                    itemCarrinho.descricao = listaDeMercadorias.folha[i].descricao;
                    itemCarrinho.quantidade = qtdeMercadoria.value;
                    itemCarrinho.preco = 
                        listaDeMercadorias.folha[i].preco * qtdeMercadoria.value;
                    adicionarAoCarrinho(itemCarrinho);
                    break;
                }
            }

            textArea.value = cabecalho()+corpo();
        }
    }
    else
        alert("Não será possível adicionar itens para compra.");
}

function formatarLista(JSONtxt)
{
    let exibir = "ID === DESCRIÇÃO === PREÇO\n";
    let listaProdutos = JSON.parse(JSONtxt);
    
    for(var i = 0; i < listaProdutos.folha.length; i++)
    {
        exibir += listaProdutos.folha[i].id+"---"+
                  listaProdutos.folha[i].descricao+"---"+
                  listaProdutos.folha[i].preco+"\n";
                  
    }
    alert(exibir);
}

function exibirTop10JSON()
{
    var rank = null;
    var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if (this.readyState == 4)
            {
                if(this.status == 200)
                {
                    if(this.responseText != "null")
                    {
                        rank = this.responseText;
                    }
                }
            }
        };
        xmlhttp.open("GET", "PontoDeVenda.php?top10=ranking", true);
        xmlhttp.send(null);

    return rank;
}

function adicionarAoCarrinho(item)
{
    if(carrinho.length == 0)
        carrinho.push(item);
    else
    {
        let indice = -1;

        for(var i = 0; i < carrinho.length; i++)
            if(item.id == carrinho[i].id)
                indice = i;

        if(indice != -1)
        {
            carrinho[indice].quantidade = 
                parseInt(carrinho[indice].quantidade) + parseInt(item.quantidade);
            carrinho[indice].preco = 
                parseFloat(carrinho[indice].preco) + parseFloat(item.preco);
        }
        else
            carrinho.push(item);
    }
}

function removerMercadoria()
{
    let idMercadoria = parseInt(prompt("Digite o id da mercadoria a ser removida"));

    for(var i = 0; i < carrinho.length; i++)
    {
        if(carrinho[i].id == idMercadoria)
        {
            carrinho.splice(i, 1);
            break;
        }
    }
}

function removerUnidadeMercadoria()
{
    let idMercadoria = parseInt(prompt("Digite o id da mercadoria."));

    if((typeof idMercadoria) == "number")
    {
        for(item in carrinho)
        {
            if(carrinho[item].id == idMercadoria)
            {
                let qtdeItens = parseInt(prompt("Digite a quantidade a ser retirada."));
                if((typeof qtdeItens) == "number"
                    && qtdeItens > 0)
                {
                    let precoOriginal = 
                        carrinho[item].preco / carrinho[item].quantidade;

                    carrinho[item].quantidade = 
                        carrinho[item].quantidade - qtdeItens;
                    carrinho[item].preco = 
                        carrinho[item].quantidade * precoOriginal;
                }
            }
        }
        textArea.value = cabecalho()+corpo();
    }
    else
        alert("Digite apenas números por favor.");
}

function verificarCartao()
{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            if(this.responseText == "true")
            {
                alert("TRANSAÇÃO AUTORIZADA");
                enviarCompra();
            }
            else
                alert("TRANSAÇÃO NÃO AUTORIZADA");
        }
    };
    xmlhttp.open("GET", "PontoDeVenda.php?cartao=cartao", true);
    xmlhttp.send();
}

function enviarCompra()
{
    console.log('enviarCompra();');
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200)
        {
            if(this.responseText != "null")
            {
                alert("Compra efetuada com sucesso !");
                cancelarCompra();
            }               
        }
    };
    
    xmlhttp.open("GET", "PontoDeVenda.php?final="+JSON.stringify(carrinho), true);
    xmlhttp.send();
}

function cabecalho()
{
    return  "Nova compra iniciada    "
            +new Date().toLocaleString()+"\n"
            +"---------------------------------------------\n";
}

function corpo()
{
    let carrinhoRender = "\n";

    for(var i = 0; i < carrinho.length; i++)
    {
        carrinhoRender += carrinho[i].id+"---"+carrinho[i].descricao+"---"+
                          carrinho[i].quantidade+"---"+carrinho[i].preco+"\n";
    }

    return carrinhoRender;
}
