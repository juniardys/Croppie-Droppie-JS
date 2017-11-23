<?php

/**
 * @param string base_64 $data
 *
 * @return string
 */
function image_64_decode($data){
    list($type, $data) = explode(';', $data);
    list(, $data)      = explode(',', $data);
    $data = base64_decode($data);
    return $data;
}