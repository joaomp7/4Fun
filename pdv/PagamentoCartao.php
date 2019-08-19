<?php

class PagamentoCartao extends Pagamento
{
    // Métodos de simulação

    public function gerarNumeroDoCartao()
    {
        $numero_cartao = "";

        for ($i = 0; $i < 4; $i++) 
        { 
            if($i !== 3)
                $numero_cartao .= rand(1000, 9999) . "-";
            else
                $numero_cartao .= rand(1000, 9999);
        }

        return $numero_cartao;
    }

    public function gerarDataDeValidade()
    {
        $ano_validade = ((int) date("Y")) + rand(0, 32);
        $data_validade = date("d/m/") . $ano_validade;

        return $data_validade;
    }

    public function verificarValidade($data_validade)
    {
        if($data_validade[2] === "/" && $data_validade === "/")
            return null;
        
        $data_validade = explode("/", $data_validade);
        $data_atual = explode("/", date("d/m/Y"));

        $data_validade = array_reverse($data_validade);
        $data_atual = array_reverse($data_atual);

        $data_validade = strtotime(implode("-", $data_validade));
        $data_atual = strtotime(implode("-", $data_atual));

        if($data_validade >= $data_atual)
            return true;
        else    
            return false;
    }
}

?>