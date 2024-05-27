<?php
header('Content-Type: application/json; charset=UTF-8');

$file_path = 'transacoes.json';

if (file_exists($file_path)) {
    readfile($file_path);
} else {
    echo json_encode(['error' => 'Arquivo JSON não encontrado'], JSON_UNESCAPED_UNICODE);
}
?>