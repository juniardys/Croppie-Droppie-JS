<?php
    // Required for function
    require 'image_64_decode.php';

    // Check File Post
    if(!($datafile = trim($_POST['file_to_upload']))){ 
    	echo json_encode(array('error' => 'File not found'));
		exit();
    }

    $result = array();
    $content = image_64_decode($datafile); // Decode Data File Base 64
    $newName = rand().time().'.png'; // Generate new name
	$location = realpath('../images/'); // Directory location

    // Check if location not exist
	if(!file_exists($location)){
        mkdir($location, 0755, true); // Create Directory if location not exist
    }

    // Check if location not writable
	if(!is_writable($location)){ 
		echo json_encode(array('error' => 'Path photo not writable')); // Send Error Message not wirtable
		exit();
	}

    // Save File into location directory
    file_put_contents($location.'\\'.$newName, $content);

    // Result name
    $result['name'] = $newName;

    // Print json result
	echo json_encode($result);
    exit();
?>
