<?php
function html_to_obj($html) {
    $dom = new DOMDocument();
    @$dom->loadHTML($html);
    return element_to_obj($dom->documentElement);
}

function element_to_obj($element) {

    $obj = array( "tag" => $element->tagName );
    foreach ($element->attributes as $attribute) {
        $obj[$attribute->name] = $attribute->value;
    }
    foreach ($element->childNodes as $subElement) {
        if ($subElement->nodeType == XML_TEXT_NODE) {
            $obj["html"] = $subElement->wholeText;
        }
        else {
            $obj["children"][] = element_to_obj($subElement);
        }
    }
    return $obj;
}

function buildHistoryData($data) {
    $keydata = array();
    foreach($data[0]["children"] as $ke=>$va) {
        $keydata[] = trim($va["html"]);
    }
    $fullData = array();
    foreach($data as $k=>$v) {
        if($k != 0) {
            $jsonData = array();
            foreach($data[$k]["children"] as $tagKey=>$tagVal) {
                $jsonData[$keydata[$tagKey]] = trim($tagVal["html"]);
            }
            $fullData[] = $jsonData;
        }
    }
    return $fullData;
}
 // create curl resource 
        $ch = curl_init(); 
        $symbol = explode(",", $_GET['symbol']);
        //$symbol = ["TCS", "INFY","RELIANCE"];
        foreach($symbol as $sval) {
		$url = "https://www.nseindia.com/live_market/dynaContent/live_watch/get_quote/getHistoricalData.jsp?symbol={$sval}&series=EQ&fromDate=undefined&toDate=undefined&datePeriod=1month";
        // set url 
        curl_setopt($ch, CURLOPT_URL, $url ); 

        //return the transfer as a string 
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

        // $output contains the output string 
        $output = curl_exec($ch); 
        $data = html_to_obj($output);
        $finalData[$sval] = buildHistoryData($data["children"][0]["children"][2]["children"][0]["children"]);
        }
        curl_close($ch); 
        header("Content-Type: application/json");
        //echo "<pre>";
        
        echo json_encode($finalData);
        // close curl resource to free up system resources 
        
        
        
?>		