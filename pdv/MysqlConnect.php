<?php

define("LOCALHOST", "localhost");
define("USER", "black");
define("PASSWORD", "root");
define("DB_NAME", "mercado2015");

function openConnection()
{
    $connection = mysqli_connect(LOCALHOST, USER, PASSWORD, DB_NAME);

    if(mysqli_connect_errno())
        return "error";
    else
        return $connection;
}

function readTable($connection, $table)
{
    $query = sprintf("select * from %s;", $table);
    $result = $connection->query($query);
    
    return $result;
}

function updateTable($connection, $table, $clsarray)
{
    $query = sprintf("show columns from %s;", $table);
    $result = $connection->query($query);

    $strformated = "set "; 

    foreach($result as $columns)
    {
        $strformated += $columns['Field']."=".$clsarray[$columns['Field']].",";
    }
    
    $strformated = substr($strformated, strlen($strformated) - 2);

    $query = sprintf("update %s %s where id=%s", $table, $strformated, $clsarray['id']);
}

function deleteTable($connection, $table, $value)
{
    $query = sprintf("delete from %s where id=%s ;", $table, $value);
    $connection->query($query);
}

function customQueryResult($connection, $query)
{
    $result = $connection->query($query);

    return $result;
}

?>