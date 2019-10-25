<?php

require "MysqlConnect.php";

class ItemCompra
{
    private $id;
    private $quantidade;
    private $idmercadoria;
    private $idcompra;

    public function getId()
    {
        return $this->id;
    }
 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    public function getQuantidade()
    {
        return $this->quantidade;
    }

    public function setQuantidade($quantidade)
    {
        $this->quantidade = $quantidade;

        return $this;
    }

    public function getIdmercadoria()
    {
        return $this->idmercadoria;
    }

    public function setIdmercadoria($idmercadoria)
    {
        $this->idmercadoria = $idmercadoria;

        return $this;
    }

    public function getIdcompra()
    {
        return $this->idcompra;
    }

    public function setIdcompra($idcompra)
    {
        $this->idcompra = $idcompra;

        return $this;
    }

    public function exibirTop10()
    {
        $connection = openConnection();
        
        $query = "select item_mercadoria.idmercadoria as cod, mercadoria.descricao, sum(item_mercadoria.quantidade) as qtde " . 
                 "from item_mercadoria " .
                 "inner join mercadoria on item_mercadoria.idmercadoria = mercadoria.id " .
                 "group by item_mercadoria.idmercadoria " .
                 "order by sum(item_mercadoria.quantidade) desc limit 10;";

        if($connection !== "error")
        {
            return customQueryResult($connection, $query);
        }
        else
        {
            return null;
        }
        //As colunas são: cod, descricao, qtde
    }
}

?>