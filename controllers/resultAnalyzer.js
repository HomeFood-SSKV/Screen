var myApp = angular.module('myApp', []);


  myApp.controller('resultController', [ '$scope','$interval','$rootScope', '$http',
  function ($scope,$interval,$rootScope,$http) {
    $scope.result=[];
     $scope.MockData={"INFY":[{"Date":"04-Jan-2019","Symbol":"INFY","Series":"EQ","Open Price":"671.75","High Price":"673.90","Low Price":"651.00","Last Traded Price":"660.25","Close Price":"661.05","Total Traded Quantity":"78,89,310","Turnover (in Lakhs)":"52,083.05"},{"Date":"03-Jan-2019","Symbol":"INFY","Series":"EQ","Open Price":"672.00","High Price":"677.00","Low Price":"663.10","Last Traded Price":"668.00","Close Price":"669.15","Total Traded Quantity":"68,27,249","Turnover (in Lakhs)":"45,719.29"},{"Date":"02-Jan-2019","Symbol":"INFY","Series":"EQ","Open Price":"666.00","High Price":"674.00","Low Price":"662.05","Last Traded Price":"668.00","Close Price":"669.05","Total Traded Quantity":"74,16,655","Turnover (in Lakhs)":"49,689.63"},{"Date":"01-Jan-2019","Symbol":"INFY","Series":"EQ","Open Price":"660.95","High Price":"666.30","Low Price":"654.15","Last Traded Price":"665.95","Close Price":"665.05","Total Traded Quantity":"29,43,390","Turnover (in Lakhs)":"19,445.79"},{"Date":"31-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"660.00","High Price":"662.00","Low Price":"655.80","Last Traded Price":"659.60","Close Price":"658.95","Total Traded Quantity":"33,73,319","Turnover (in Lakhs)":"22,239.20"},{"Date":"28-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"663.35","High Price":"663.50","Low Price":"653.30","Last Traded Price":"656.10","Close Price":"656.95","Total Traded Quantity":"47,36,598","Turnover (in Lakhs)":"31,180.77"},{"Date":"27-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"652.75","High Price":"663.25","Low Price":"649.00","Last Traded Price":"656.35","Close Price":"656.80","Total Traded Quantity":"1,53,33,902","Turnover (in Lakhs)":"1,00,921.27"},{"Date":"26-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"647.00","High Price":"647.00","Low Price":"637.35","Last Traded Price":"643.90","Close Price":"644.05","Total Traded Quantity":"61,78,552","Turnover (in Lakhs)":"39,651.61"},{"Date":"24-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"657.00","High Price":"658.80","Low Price":"647.60","Last Traded Price":"648.50","Close Price":"649.00","Total Traded Quantity":"83,79,825","Turnover (in Lakhs)":"54,685.63"},{"Date":"21-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"659.50","High Price":"659.50","Low Price":"643.45","Last Traded Price":"646.55","Close Price":"646.20","Total Traded Quantity":"1,28,02,132","Turnover (in Lakhs)":"83,354.94"},{"Date":"20-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"660.00","High Price":"671.55","Low Price":"656.40","Last Traded Price":"666.90","Close Price":"667.05","Total Traded Quantity":"1,17,05,260","Turnover (in Lakhs)":"77,762.39"},{"Date":"19-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"671.55","High Price":"671.55","Low Price":"661.10","Last Traded Price":"664.60","Close Price":"664.85","Total Traded Quantity":"82,95,459","Turnover (in Lakhs)":"55,170.47"},{"Date":"18-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"686.50","High Price":"686.50","Low Price":"674.55","Last Traded Price":"677.00","Close Price":"676.60","Total Traded Quantity":"80,21,298","Turnover (in Lakhs)":"54,516.87"},{"Date":"17-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"711.85","High Price":"711.85","Low Price":"692.75","Last Traded Price":"692.75","Close Price":"694.40","Total Traded Quantity":"47,78,465","Turnover (in Lakhs)":"33,343.77"},{"Date":"14-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"697.45","High Price":"713.70","Low Price":"694.40","Last Traded Price":"706.15","Close Price":"706.05","Total Traded Quantity":"95,60,576","Turnover (in Lakhs)":"67,491.01"},{"Date":"13-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"682.00","High Price":"700.00","Low Price":"680.00","Last Traded Price":"695.35","Close Price":"697.75","Total Traded Quantity":"75,21,474","Turnover (in Lakhs)":"51,918.54"},{"Date":"12-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"677.10","High Price":"680.65","Low Price":"670.60","Last Traded Price":"678.10","Close Price":"678.50","Total Traded Quantity":"69,26,183","Turnover (in Lakhs)":"46,759.86"},{"Date":"11-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"669.20","High Price":"681.90","Low Price":"660.60","Last Traded Price":"673.25","Close Price":"674.50","Total Traded Quantity":"71,20,933","Turnover (in Lakhs)":"47,871.62"},{"Date":"10-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"669.90","High Price":"683.80","Low Price":"665.20","Last Traded Price":"670.30","Close Price":"669.20","Total Traded Quantity":"51,21,196","Turnover (in Lakhs)":"34,387.18"},{"Date":"07-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"672.00","High Price":"685.75","Low Price":"665.60","Last Traded Price":"681.00","Close Price":"682.80","Total Traded Quantity":"55,53,948","Turnover (in Lakhs)":"37,715.09"},{"Date":"06-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"676.10","High Price":"685.45","Low Price":"664.55","Last Traded Price":"669.70","Close Price":"668.50","Total Traded Quantity":"80,39,771","Turnover (in Lakhs)":"54,036.60"},{"Date":"05-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"683.00","High Price":"683.65","Low Price":"672.50","Last Traded Price":"682.05","Close Price":"681.40","Total Traded Quantity":"51,77,288","Turnover (in Lakhs)":"35,152.07"}],"TCS":[{"Date":"04-Jan-2019","Symbol":"TCS","Series":"EQ","Open Price":"1,900.00","High Price":"1,901.20","Low Price":"1,841.00","Last Traded Price":"1882.00","Close Price":"1,876.85","Total Traded Quantity":"42,80,862","Turnover (in Lakhs)":"80,017.42"},{"Date":"03-Jan-2019","Symbol":"TCS","Series":"EQ","Open Price":"1,919.00","High Price":"1,944.95","Low Price":"1,893.10","Last Traded Price":"1901.00","Close Price":"1,899.95","Total Traded Quantity":"26,11,668","Turnover (in Lakhs)":"50,061.78"},{"Date":"02-Jan-2019","Symbol":"TCS","Series":"EQ","Open Price":"1,905.00","High Price":"1,934.45","Low Price":"1,900.00","Last Traded Price":"1919.00","Close Price":"1,923.30","Total Traded Quantity":"21,00,463","Turnover (in Lakhs)":"40,389.86"},{"Date":"01-Jan-2019","Symbol":"TCS","Series":"EQ","Open Price":"1,896.00","High Price":"1,910.00","Low Price":"1,885.00","Last Traded Price":"1905.90","Close Price":"1,902.80","Total Traded Quantity":"10,94,883","Turnover (in Lakhs)":"20,800.34"},{"Date":"31-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,908.00","High Price":"1,909.00","Low Price":"1,886.15","Last Traded Price":"1894.75","Close Price":"1,893.05","Total Traded Quantity":"18,79,740","Turnover (in Lakhs)":"35,647.72"},{"Date":"28-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,915.00","High Price":"1,920.00","Low Price":"1,893.00","Last Traded Price":"1897.00","Close Price":"1,896.05","Total Traded Quantity":"22,39,130","Turnover (in Lakhs)":"42,708.38"},{"Date":"27-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,909.00","High Price":"1,941.70","Low Price":"1,872.10","Last Traded Price":"1909.10","Close Price":"1,908.95","Total Traded Quantity":"49,68,201","Turnover (in Lakhs)":"95,411.46"},{"Date":"26-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,921.80","High Price":"1,921.80","Low Price":"1,870.25","Last Traded Price":"1892.00","Close Price":"1,889.20","Total Traded Quantity":"24,46,614","Turnover (in Lakhs)":"46,112.98"},{"Date":"24-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,905.80","High Price":"1,938.90","Low Price":"1,905.00","Last Traded Price":"1922.00","Close Price":"1,918.50","Total Traded Quantity":"18,64,116","Turnover (in Lakhs)":"35,878.57"},{"Date":"21-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,948.00","High Price":"1,950.00","Low Price":"1,886.55","Last Traded Price":"1905.00","Close Price":"1,895.80","Total Traded Quantity":"37,29,956","Turnover (in Lakhs)":"71,360.52"},{"Date":"20-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,953.80","High Price":"1,974.90","Low Price":"1,946.00","Last Traded Price":"1955.00","Close Price":"1,954.05","Total Traded Quantity":"19,40,277","Turnover (in Lakhs)":"37,945.10"},{"Date":"19-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,984.80","High Price":"1,984.80","Low Price":"1,960.05","Last Traded Price":"1970.80","Close Price":"1,968.45","Total Traded Quantity":"24,98,833","Turnover (in Lakhs)":"49,198.05"},{"Date":"18-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,991.90","High Price":"2,002.00","Low Price":"1,976.40","Last Traded Price":"1987.90","Close Price":"1,987.85","Total Traded Quantity":"17,68,742","Turnover (in Lakhs)":"35,137.11"},{"Date":"17-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,999.00","High Price":"2,004.90","Low Price":"1,985.00","Last Traded Price":"1992.90","Close Price":"1,994.30","Total Traded Quantity":"12,27,921","Turnover (in Lakhs)":"24,482.95"},{"Date":"14-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,983.00","High Price":"1,998.95","Low Price":"1,975.25","Last Traded Price":"1989.00","Close Price":"1,989.75","Total Traded Quantity":"24,73,761","Turnover (in Lakhs)":"49,094.42"},{"Date":"13-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"2,024.00","High Price":"2,029.70","Low Price":"1,974.50","Last Traded Price":"1981.95","Close Price":"1,982.60","Total Traded Quantity":"37,48,429","Turnover (in Lakhs)":"74,802.38"},{"Date":"12-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"2,001.10","High Price":"2,022.00","Low Price":"1,984.95","Last Traded Price":"2016.50","Close Price":"2,016.80","Total Traded Quantity":"22,19,993","Turnover (in Lakhs)":"44,663.42"},{"Date":"11-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,970.00","High Price":"2,010.00","Low Price":"1,961.00","Last Traded Price":"1997.05","Close Price":"2,000.00","Total Traded Quantity":"29,42,014","Turnover (in Lakhs)":"58,636.26"},{"Date":"10-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,975.00","High Price":"2,011.00","Low Price":"1,960.00","Last Traded Price":"1961.00","Close Price":"1,975.80",
     "Total Traded Quantity":"20,10,786","Turnover (in Lakhs)":"39,990.73"},{"Date":"07-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,985.05","High Price":"2,003.90","Low Price":"1,973.00","Last Traded Price":"1999.85","Close Price":"1,995.20","Total Traded Quantity":"16,80,420","Turnover (in Lakhs)":"33,463.26"},{"Date":"06-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,998.00","High Price":"2,017.00","Low Price":"1,979.60","Last Traded Price":"1990.00","Close Price":"1,992.70","Total Traded Quantity":"23,21,216","Turnover (in Lakhs)":"46,373.71"},{"Date":"05-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"2,006.00","High Price":"2,018.00","Low Price":"1,985.00","Last Traded Price":"2003.90","Close Price":"2,006.75","Total Traded Quantity":"25,01,539","Turnover (in Lakhs)":"50,131.23"}],"HDFC":[{"Date":"04-Jan-2019","Symbol":"HDFC","Series":"EQ","Open Price":"1,948.00","High Price":"1,976.00","Low Price":"1,942.00","Last Traded Price":"1973.00","Close Price":"1,972.60","Total Traded Quantity":"21,09,614","Turnover (in Lakhs)":"41,298.67"},{"Date":"03-Jan-2019","Symbol":"HDFC","Series":"EQ","Open Price":"1,984.05","High Price":"1,987.10","Low Price":"1,931.85","Last Traded Price":"1937.00","Close Price":"1,936.85","Total Traded Quantity":"37,32,193","Turnover (in Lakhs)":"72,787.76"},{"Date":"02-Jan-2019","Symbol":"HDFC","Series":"EQ","Open Price":"2,004.70","High Price":"2,009.00","Low Price":"1,961.00","Last Traded Price":"1983.00","Close Price":"1,980.65","Total Traded Quantity":"20,01,170","Turnover (in Lakhs)":"39,704.83"},{"Date":"01-Jan-2019","Symbol":"HDFC","Series":"EQ","Open Price":"1,968.00","High Price":"2,014.70","Low Price":"1,954.50","Last Traded Price":"2010.00","Close Price":"2,009.00","Total Traded Quantity":"13,05,443","Turnover (in Lakhs)":"25,985.79"},{"Date":"31-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,988.00","High Price":"1,989.75","Low Price":"1,961.55","Last Traded Price":"1965.00","Close Price":"1,968.35","Total Traded Quantity":"22,89,993","Turnover (in Lakhs)":"45,137.44"},{"Date":"28-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,959.00","High Price":"1,990.00","Low Price":"1,952.00","Last Traded Price":"1978.15","Close Price":"1,979.95","Total Traded Quantity":"23,84,400","Turnover (in Lakhs)":"47,251.01"},{"Date":"27-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,948.45","High Price":"1,955.00","Low Price":"1,930.00","Last Traded Price":"1946.30","Close Price":"1,948.85","Total Traded Quantity":"16,45,443","Turnover (in Lakhs)":"31,985.18"},{"Date":"26-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,896.00","High Price":"1,944.70","Low Price":"1,883.20","Last Traded Price":"1938.00","Close Price":"1,933.35","Total Traded Quantity":"15,36,116","Turnover (in Lakhs)":"29,345.93"},{"Date":"24-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,955.00","High Price":"1,955.00","Low Price":"1,898.00","Last Traded Price":"1906.75","Close Price":"1,902.15","Total Traded Quantity":"22,07,727","Turnover (in Lakhs)":"42,514.61"},{"Date":"21-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,974.80","High Price":"1,979.60","Low Price":"1,930.00","Last Traded Price":"1943.45","Close Price":"1,948.60","Total Traded Quantity":"40,16,548","Turnover (in Lakhs)":"78,363.87"},{"Date":"20-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,970.00","High Price":"1,982.00","Low Price":"1,943.05","Last Traded Price":"1977.00","Close Price":"1,974.70","Total Traded Quantity":"18,29,220","Turnover (in Lakhs)":"35,853.26"},{"Date":"19-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,954.00","High Price":"1,985.50","Low Price":"1,948.55","Last Traded Price":"1979.80","Close Price":"1,981.70","Total Traded Quantity":"25,60,551","Turnover (in Lakhs)":"50,539.20"},{"Date":"18-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,955.00","High Price":"1,957.90","Low Price":"1,932.50","Last Traded Price":"1949.05","Close Price":"1,952.00","Total Traded Quantity":"21,21,103","Turnover (in Lakhs)":"41,232.51"},{"Date":"17-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,915.00","High Price":"1,963.40","Low Price":"1,913.70","Last Traded Price":"1963.00","Close Price":"1,960.35","Total Traded Quantity":"20,30,693","Turnover (in Lakhs)":"39,454.41"},{"Date":"14-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,945.00","High Price":"1,955.00","Low Price":"1,898.05","Last Traded Price":"1909.60","Close Price":"1,904.10","Total Traded Quantity":"34,59,751","Turnover (in Lakhs)":"66,189.39"},{"Date":"13-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,945.00","High Price":"1,961.90","Low Price":"1,927.90","Last Traded Price":"1941.45","Close Price":"1,942.05","Total Traded Quantity":"27,78,618","Turnover (in Lakhs)":"54,014.36"},{"Date":"12-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,912.00","High Price":"1,946.80","Low Price":"1,904.25","Last Traded Price":"1937.00","Close Price":"1,940.20","Total Traded Quantity":"22,28,690","Turnover (in Lakhs)":"42,877.26"},{"Date":"11-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,878.00","High Price":"1,912.65","Low Price":"1,855.25","Last Traded Price":"1904.00","Close Price":"1,905.25","Total Traded Quantity":"35,47,051","Turnover (in Lakhs)":"66,866.87"},{"Date":"10-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,924.35","High Price":"1,939.90","Low Price":"1,901.25","Last Traded Price":"1905.00","Close Price":"1,906.50","Total Traded Quantity":"21,82,278","Turnover (in Lakhs)":"41,838.10"},{"Date":"07-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,946.90","High Price":"1,961.30","Low Price":"1,929.10","Last Traded Price":"1957.95","Close Price":"1,951.35","Total Traded Quantity":"24,42,617","Turnover (in Lakhs)":"47,479.86"},{"Date":"06-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,955.05","High Price":"1,969.80","Low Price":"1,938.00","Last Traded Price":"1941.00","Close Price":"1,945.80","Total Traded Quantity":"42,78,616","Turnover (in Lakhs)":"83,866.49"},{"Date":"05-Dec-2018","Symbol":"HDFC","Series":"EQ","Open Price":"1,927.00","High Price":"1,979.80","Low Price":"1,920.60","Last Traded Price":"1970.50","Close Price":"1,973.30","Total Traded Quantity":"31,47,110","Turnover (in Lakhs)":"61,446.71"}]};
  $scope.sampleData=[];//$scope.MockData;
  $scope.corporateResult=[
    {
        Symbol: "TCS",
        CompanyName: "Tata Consultancy Services Limited",
        ISIN: "INE467B01029",
        Ind: "-",
        Purpose: "Financial Results/Dividend",
        BoardMeetingDate: "10-Jan-2019",
        DisplayDate: "31-Dec-2018",
        seqId: "103191378",
        Details: "To consider and approve the financial results for the period ended December 31, 2018 and dividend"
      },
      {
        Symbol: "SUNPHARMA",
        CompanyName: "SUNPHARMA Limited",
        ISIN: "INE009A01021",
        Ind: "-",
        Purpose: "Financial Results",
        BoardMeetingDate: "15-Jan-2019",
        DisplayDate: "14-Dec-2018",
        seqId: "103150734",
        Details: "To consider and approve the financial results for the period ended September 30, 2018"
      }
  ];
  $scope.isNormalBar=true;
  $scope.searchSymbol = '';
  $scope.fromDate='';
  $scope.toDate='';
  var cors_api_url = '/nse/corporate.php';
  var cors_resultapi_url = '/nse/results.php';
  var lastOneWeekURL="https://www.nseindia.com/corporates/corpInfo/equities/getResultCalendar.jsp?Symbol=&Industry=&Period=Last%201%20Week&Purpose=Results&symbol=&industry=&period=Last%201%20Week&purpose=Results";
  var todayResultURL="https://www.nseindia.com/corporates/corpInfo/equities/getResultCalendar.jsp?Symbol=&Industry=&Period=Today&Purpose=Results&symbol=&industry=&period=Today&purpose=Results";
  var nextWeekResultURL="https://www.nseindia.com/corporates/corpInfo/equities/getResultCalendar.jsp?Symbol=&Industry=&Period=Next%201%20Week&Purpose=Results&symbol=&industry=&period=Next%201%20Week&purpose=Results";
  $scope.corporateResultURL="NA";
  $scope.selectedIndexName="NAA";
  $scope.resultPeriod = {
    Select : "NA",
    LastOneWeek : lastOneWeekURL,
    Today:todayResultURL,
    NextOneWeek : nextWeekResultURL
};
$scope.indexList={
    Select : "NAA",
    Nifty50 : ["INFRATEL","TITAN","HCLTECH","ASIANPAINT",
    "BAJAJ-AUTO","BHARTIARTL","BAJAJFINSV","HINDUNILVR","GAIL",
    "INFY","YESBANK","WIPRO","CIPLA","KOTAKBANK","ITC","ICICIBANK",
    "COALINDIA","HDFCBANK","BAJFINANCE","SBIN","POWERGRID","MARUTI",
    "DRREDDY","ADANIPORTS","HEROMOTOCO","TCS","SUNPHARMA","INDUSINDBK",
    "UPL","RELIANCE","TATAMOTORS","BPCL","AXISBANK","LT","NTPC","GRASIM",
    "ZEEL","JSWSTEEL","HDFC","VEDL","TATASTEEL","HINDALCO","TECHM","MAHINDRA",
    "ULTRACEMCO","IOC","IBULHSGFIN","ONGC","HINDPETRO","EICHERMOT"], 
    NiftyNext50 : ["INFY","TCS","HDFC"],
    NiftyMidCap50: ["INFY","TCS","HDFC"],
    NiftyBank : ["INFY","TCS","HDFC"],
    NiftyAuto : ["INFY","TCS","HDFC"],
    NiftyFinance : ["INFY","TCS","HDFC"],
    NiftyFMCG:["INFY","TCS","HDFC"],
    NiftyIT : ["INFY","TCS","HDFC"],
    NiftyMedia : ["INFY","TCS","HDFC"],
    NiftyMetal : ["INFY","TCS","HDFC"],
    NiftyPharma:["INFY","TCS","HDFC"],
    NiftyPSUBank : ["INFY","TCS","HDFC"],
    NiftyPvtBank:["INFY","TCS","HDFC"],
    NiftyRealty: ["INFY","TCS","HDFC"]
};
 $scope.changeBar=function(){
     if($scope.isNormalBar===true){
        $scope.isNormalBar=false;
     } else if($scope.isNormalBar===false){   
         $scope.isNormalBar=true;
    }
 } 
  $scope.init=function(context){
    $scope.result=[];
    $scope.symbolCollection=[];
    var corporateResultHeader ={ url: cors_api_url ,
    method: "GET",
    params: {urlpath:  $scope.corporateResultURL}};
    if(context=== 'result' && $scope.corporateResultURL!=='NA'){
        $scope.searchSymbol ="";
        $scope.selectedIndexName="NAA";
         $http(corporateResultHeader).then(function (corporateResponse) {
        console.log("corporateResponse",corporateResponse.data);
        $scope.corporateResult=corporateResponse.data;
        angular.forEach($scope.corporateResult, function(value, key) {
            $scope.symbolCollection.push(value.Symbol);
        });
         $scope.callHistoryData($scope.symbolCollection.join());
     	});
   
    } else if(context=== 'plain' &&  $scope.searchSymbol !='') {
    $scope.corporateResultURL="NA";
    $scope.selectedIndexName="NAA";
    var symbols=$scope.searchSymbol.split(',');
    $scope.symbolCollection=symbols;
    $scope.callHistoryData(symbols.join());
    } 
    else if(context=== 'sector' &&  $scope.selectedIndexName !='NAA') {
        $scope.corporateResultURL="NA";
        $scope.searchSymbol ="";
        var symbols=$scope.selectedIndexName;
        $scope.symbolCollection=symbols;
        $scope.callHistoryData(symbols.join());
        } 
  }
  $scope.callHistoryData=function(symbols){
    var historyURL=symbols; // url for history 
    console.log("historyURL",historyURL);
    var historyHeader ={ url: cors_resultapi_url ,
        method: "GET",
        params: {symbol:  historyURL}}; 
         $http(historyHeader).then(function (historyResponse) {
                console.log("historyResponse",historyResponse);
                 $scope.sampleData=historyResponse.data;
                $scope.removeComma($scope.sampleData);
     	});
  }
  $scope.removeComma=function(historyData){
  $scope.hightlow = [];
  angular.forEach(historyData, function(data, key_symbol) {
  angular.forEach(data, function(value, key) {
   data[key]["Open Price"]=value["Open Price"].replace(',','');
   data[key]["High Price"]=value["High Price"].replace(',','');
   data[key]["Low Price"]=value["Low Price"].replace(',','');
   data[key]["Last Traded Price"]=value["Last Traded Price"].replace(',','');
   data[key]["Close Price"]=value["Close Price"].replace(',','');
 }); 
}); 
 for(var l=0; l<$scope.symbolCollection.length; l++)
 {
     var filteredData=[];
    angular.forEach(historyData, function(data, key_symbol) {
      angular.forEach(data, function(value, key) {
        if($scope.symbolCollection[l].toLowerCase()===value["Symbol"].toLowerCase()){
            filteredData.push(value)
            }
      });
    });
      if(filteredData.length>0) {
      $scope.calculateIndicator(filteredData);
    }
    filteredData=[];
    } 
    $scope.includeResultDate();
  }
  $scope.includeResultDate=function(){
    for(var x=0; x<$scope.result.length; x++)
    {
       angular.forEach($scope.corporateResult, function(value, key) {
           if($scope.result[x].symbol.toLowerCase()===value.Symbol.toLowerCase()){
            $scope.result[x].resultDate=value.BoardMeetingDate;
               }
         });
       }
  }
  $scope.calculateIndicator=function(data){
   var difference=[];
    var total=0;
    var gainloss=0;
    var fluctuation=0;
    var symbol='';
    var ltp=0;
    var recentTrend='';
    angular.forEach(data, function(value, key) {
    var dataObj={
      "open":data[key]["Open Price"],
      "close":data[key]["Close Price"],
      "high":data[key]["High Price"],
      "low":data[key]["Low Price"],
      "difference":data[key]["Close Price"]-data[key]["Open Price"],
      "percentageDifference":Math.round(Math.abs(data[key]["Close Price"]-data[key]["Open Price"]))+"%",
      "roundPrice":Math.round(data[key]["Close Price"]-data[key]["Open Price"])
    };
    $scope.hightlow.push(parseFloat(data[key]["Low Price"]));
    $scope.hightlow.push(parseFloat(data[key]["High Price"]));
    if(ltp===0){
        ltp=data[key]["Last Traded Price"];
        var diff=Math.round(data[key]["Close Price"]-data[key]["Open Price"]);
        if(diff<0){
            recentTrend="DOWN";
        } else  if(diff>0){
            recentTrend="UP";
        }else  if(diff===0){
            recentTrend="FLAT";
        }
    }
    total=total+Math.abs(data[key]["Close Price"]-data[key]["Open Price"]);
    gainloss=gainloss+(data[key]["Close Price"]-data[key]["Open Price"]);
    fluctuation=Math.max.apply(Math, $scope.hightlow)-Math.min.apply(Math, $scope.hightlow);
    symbol=data[key]["Symbol"];
    difference.push(dataObj);
  }); 
  var resultObj={
    "symbol":symbol,
    "total":total,
    "percentageTotal":Math.round(Math.abs(total))+"%",
    "weekhigh":Math.max.apply(Math, $scope.hightlow),
    "weeklow":Math.min.apply(Math, $scope.hightlow),
    "gainloss":Math.round(gainloss),
    "fluctuation":Math.round(fluctuation),
    "ltp":ltp,
    "recentTrend":recentTrend,
    "resultDate":'',
    "data":difference
  }

  $scope.result.push(resultObj);
  $scope.hightlow=[];
  console.log("result",$scope.result);
  console.log("total",total);
    }
    }]);