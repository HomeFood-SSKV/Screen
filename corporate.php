<?php
 // create curl resource 
        $ch = curl_init(); 
        $url = $_GET['urlpath'];
        //$url ="https://www.nseindia.com/corporates/corpInfo/equities/getResultCalendar.jsp?Symbol=&Industry=&Period=Last%201%20Week&Purpose=Results&symbol=&industry=&period=Last%201%20Week&purpose=Results";
        // set url 
        curl_setopt($ch, CURLOPT_URL, $url ); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 
        curl_close($ch);
       // header('Content-Type:application/json');
       // echo "<pre>";
        //$output = str_replace(' ', '', $output);
        $result = (trim($output));

        $res = explode("rows:",$result);
        $out = (rtrim($res[1], "}"));
        $out = str_replace('Symbol:','"Symbol":', $out);
        $out = str_replace('CompanyName','"CompanyName"', $out);
        $out = str_replace('ISIN','"ISIN"', $out);
        $out = str_replace('Ind:','"Ind":', $out);
        $out = str_replace('seqId:','"seqId":', $out);
        $out = str_replace('Purpose:','"Purpose":', $out);
        $out = str_replace('BoardMeetingDate','"BoardMeetingDate"', $out);
        $out = str_replace('Details:','"Details":', $out);
        echo $out = str_replace('DisplayDate','"DisplayDate"', $out);
       
             
?>		
