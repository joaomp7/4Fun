<?php

include "MysqlConnect.php";

class Mercadoria
{
    private $id;
    private $descricao;
    private $preco;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    public function getDescricao()
    {
        return $this->descricao;
    }

    public function setDescricao($descricao)
    {
        $this->descricao = $descricao;

        return $this;
    }

    public function getPreco()
    {
        return $this->preco;
    }

    public function setPreco($preco)
    {
        $this->preco = $preco;

        return $this;
    }

    public function listaDeMercadorias()
    {
        $connection = openConnection();

        if($connection !== "error")
        {
            return readTable($connection, "mercadoria");
        }

        // Retirar esse erro
        return "Erro ao estabelecer uma lista de mercadorias. at Compra.novaCompra()";
    }
}

?>