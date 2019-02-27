<?php 

$obj = new class {};

$location = $_GET['location'];

// $location = "+2.982734, +33.12312";

$coordinatePatern = '/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/';

if(isset($location) && preg_match($coordinatePatern, $location)){
// if(isset($location)){
    
    $pero = preg_match('/([\+\-0-9.]*)\s*,*\s*([\+\-0-9.]*)/', $location, $matches);

    $lat = floatval($matches[1]);
    $lng = floatval($matches[2]);

    if (!(($lat >= -90 && $lat <= 90) && ($lng >= -180 && $lng <= 180))) {
        $obj->error = "Not possible to get the result from this query. Try again.";
        $json = json_encode($obj);
        echo $json;
        exit;
    }

} 
else {
    $api = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    $key = "&key=AIzaSyAUOKrGwzKHwfx-KsMR33SU8Vdw-Rjnzd8";
    $query_result = file_get_contents($api.$location.$key,'r');
    $obj = json_decode($query_result);

    // echo "<br><br><br><br><br>";
    if ($obj->status == "OK"){
        $lat = $obj->results[0]->geometry->location->lat;
        $lng = $obj->results[0]->geometry->location->lng;
    }
    else {
        $obj->error = "Not possible to get the result from this query. Try again.";
        $json = json_encode($obj);
        echo $json;
        exit;
    }

    // $lat = $obj->results[0]->geometry->location->lat;
    // $lng = $obj->results[0]->geometry->location->lng;
}

if (isset($lat) && isset($lng)) {
    $API = "http://api.met.no/weatherapi/locationforecast/1.9/?lat=".$lat.";lon=".$lng."";
    
    $url = file_get_contents($API, 'r');
  
    $simpleXml = simplexml_load_string($url) or die("Error: Cannot open the file.");
    // $simpleXml = simplexml_load_file('data.xml') or die("Error: Cannot open the file.");
    // $json = json_encode($simpleXml);
    // echo $json;
    $result = $simpleXml->product->time[0]->location;
    $result->error = "";
    $json =json_encode($result);
    echo $json;
}
else {
    $obj->error = "Not possible to get latitude and longitude, try different entry.";
    $json = json_encode($obj);
    echo $json;
    exit;
}
