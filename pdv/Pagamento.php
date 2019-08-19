<?php

class Pagamento
{
    protected $id;
    protected $data;
    protected $valor;
    protected $idcompra;

    public function getId()
    {
        return $this->id;
    }
 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    public function getData()
    {
        return $this->data;
    }
 
    public function setData($data)
    {
        $this->data = $data;

        return $this;
    }
 
    public function getValor()
    {
        return $this->valor;
    }

    public function setValor($valor)
    {
        $this->valor = $valor;

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
}

?>