<?php
 // create curl resource 
        $ch = curl_init(); 
        $url = $_GET['urlpath'];
        // set url 
        curl_setopt($ch, CURLOPT_URL, $url ); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        echo $output = curl_exec($ch); 
       //echo $response = json_decode($output , true);
        // close curl resource to free up system resources 
        curl_close($ch);     
?>		