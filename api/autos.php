<?php

require "debugging.php";

// DEFAULT ANSWER
$answer = array(
    "code" => 404,
    "result" => []
);


if (isset($_GET["autoid"]) && filter_var($_GET["autoid"], FILTER_VALIDATE_INT) !== false && $_GET["autoid"] > 0) {
    $id = $_GET["autoid"];

    $data = file_get_contents("../data/feuerwehrautos.json");
    $library = json_decode($data);

    if ($id <= count($library->autos)) {
        $answer["code"] = 200;
        array_push($answer["result"], $library->autos[$id - 1]);
    }

}

echo json_encode($answer);

?>