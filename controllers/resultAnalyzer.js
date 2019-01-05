var myApp = angular.module('myApp', []);


  myApp.controller('resultController', [ '$scope','$interval','$rootScope', '$http',
  function ($scope,$interval,$rootScope,$http) {
    $scope.result=[];
     $scope.MockData={"INFY":[{"Date":"04-Jan-2019","Symbol":"INFY","Series":"EQ","Open Price":"671.75","High Price":"673.90","Low Price":"651.00","Last Traded Price":"660.25","Close Price":"661.05","Total Traded Quantity":"78,89,310","Turnover (in Lakhs)":"52,083.05"},{"Date":"03-Jan-2019","Symbol":"INFY","Series":"EQ","Open Price":"672.00","High Price":"677.00","Low Price":"663.10","Last Traded Price":"668.00","Close Price":"669.15","Total Traded Quantity":"68,27,249","Turnover (in Lakhs)":"45,719.29"},{"Date":"02-Jan-2019","Symbol":"INFY","Series":"EQ","Open Price":"666.00","High Price":"674.00","Low Price":"662.05","Last Traded Price":"668.00","Close Price":"669.05","Total Traded Quantity":"74,16,655","Turnover (in Lakhs)":"49,689.63"},{"Date":"01-Jan-2019","Symbol":"INFY","Series":"EQ","Open Price":"660.95","High Price":"666.30","Low Price":"654.15","Last Traded Price":"665.95","Close Price":"665.05","Total Traded Quantity":"29,43,390","Turnover (in Lakhs)":"19,445.79"},{"Date":"31-Dec-2018","Symbol":"INFY","Series":"EQ","Open Price":"660.00","High Price":"662.00","Low Price":"655.80","Last Traded Price":"659.60","Close Price":"658.95","Total Traded Quantity":"33,73,319","Turnover (in Lakhs)":"22,239.20"}],"TCS":[{"Date":"04-Jan-2019","Symbol":"TCS","Series":"EQ","Open Price":"1,900.00","High Price":"1,901.20","Low Price":"1,841.00","Last Traded Price":"1882.00","Close Price":"1,876.85","Total Traded Quantity":"42,80,862","Turnover (in Lakhs)":"80,017.42"},{"Date":"03-Jan-2019","Symbol":"TCS","Series":"EQ","Open Price":"1,919.00","High Price":"1,944.95","Low Price":"1,893.10","Last Traded Price":"1901.00","Close Price":"1,899.95","Total Traded Quantity":"26,11,668","Turnover (in Lakhs)":"50,061.78"},{"Date":"02-Jan-2019","Symbol":"TCS","Series":"EQ","Open Price":"1,905.00","High Price":"1,934.45","Low Price":"1,900.00","Last Traded Price":"1919.00","Close Price":"1,923.30","Total Traded Quantity":"21,00,463","Turnover (in Lakhs)":"40,389.86"},{"Date":"01-Jan-2019","Symbol":"TCS","Series":"EQ","Open Price":"1,896.00","High Price":"1,910.00","Low Price":"1,885.00","Last Traded Price":"1905.90","Close Price":"1,902.80","Total Traded Quantity":"10,94,883","Turnover (in Lakhs)":"20,800.34"},{"Date":"31-Dec-2018","Symbol":"TCS","Series":"EQ","Open Price":"1,908.00","High Price":"1,909.00","Low Price":"1,886.15","Last Traded Price":"1894.75","Close Price":"1,893.05","Total Traded Quantity":"18,79,740","Turnover (in Lakhs)":"35,647.72"}]};
      $scope.sampleData= [];//$scope.MockData;
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
      "openOnePercentage":data[key]["Open Price"]/100,
      "absDifference":Math.trunc(Math.abs(data[key]["Close Price"]-data[key]["Open Price"])),
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
    "onePercentage":total/100,
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