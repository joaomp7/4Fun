<?php

class PagamentoDinheiro extends Pagamento
{

    public function calcularTroco($valor_compra)
    {
        $troco = getValor() - $valor_compra;

        return $troco;
    }

}

?>