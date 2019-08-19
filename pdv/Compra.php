<?php

class Compra
{
    private $id;
    private $data;
  
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

    public function novaCompra($data)
    {
        $connection = openConnection();

        if($connection !== "error")
        {
            $query = "insert into compra(data) values(".$data.");select last_insert_id();";

            return customQueryResult($connection, $query);
        }

        return null;
    }
}

?>