<?php

require "autoload.php";

function iniciarCompra()
{
    $compra = new Compra();
    return $compra->novaCompra(date("Y-m-d"));
}

function listaDeMercadoriasJSON()
{
    $mercadoria = new Mercadoria();
    $listaJSON = null;
    
    if($mercadoria->listaDeMercadorias() != null)
    {
        foreach($mercadoria->listaDeMercadorias() as $produto)
            $listaJSON .= json_encode($produto).",";
            
        return '{"folha":['.substr($listaJSON,0 , -1).']}';
    }
    else
        return null;
}

function rankingJSON()
{
    $itemcompra = new ItemCompra();
    $ranking = $itemcompra->exibirTop10();
    $participante = null;

    if($ranking != null)
    {
        foreach($ranking as $posicao)
            $participante .= json_encode($posicao);
        return '['.$participante.']';
    }
    else
        return null;
}

function validadeCartao()
{
    $pag_cartao = new PagamentoCartao();

    $numero_cartao
        = $pag_cartao->gerarNumeroDoCartao();
    $val_cartao 
        = $pag_cartao->verificarValidade($pag_cartao->gerarDataDeValidade());

    if($val_cartao == false)
        return 'false';
    else
    {
        $valor = rand(0, 10);
        if($valor < 4)
            return 'false';
        else
            return 'true';
    }
}

/*$inicio = $_REQUEST["inicio"]; 
$lista  = $_REQUEST["lista"];
$top10  = $_REQUEST["top10"];
$cartao = $_REQUEST["cartao"];
$final  = $_REQUEST["final"];*/

$valor = $_REQUEST["shot"];

switch($valor)
{
    case "okay":
        $respid = iniciarCompra();
        if($respid != null)
            echo "{'id':".$respid."}";
        else
            echo null;
        break;
    
    case "lista":
        echo listaDeMercadoriasJSON();
        break;

    case "ranking":
        echo rankingJSON();
        break;

    case "cartao":
        echo validadeCartao();
        break;
}

/*if($inicio === "okay")
{
    $respid = iniciarCompra();
    if($respid != null)
        echo "{'id':".$respid."}";
    else
        echo null;
}

if($lista === "lista")
    echo listaDeMercadoriasJSON();

if($top10 === "ranking")
    echo rankingJSON();

if($cartao == "cartao")
{
    echo validadeCartao();
}

if($final != "null")
{
    $carrinho = json_decode($final);
}*/

?>
