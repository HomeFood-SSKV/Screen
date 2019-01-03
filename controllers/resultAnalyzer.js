var myApp = angular.module('myApp', []);


  myApp.controller('resultController', [ '$scope','$interval','$rootScope', '$http',
  function ($scope,$interval,$rootScope,$http) {
    $scope.symbolCollection=['TCS','SUNPHARMA'];
    $scope.result=[];
     $scope.sampleData=[
      {
          "date": "02-Jan-2019",
          "symbol": "TCS",
          "series": "EQ",
          "openprice": "1,905.00",
          "highprice": "1,934.45",
          "lowprice": "1,900.00",
          "lasttradedprice": "1919.00",
          "closeprice": "1,923.30",
          "totaltradedquantity": "2100463",
          "turnover(inlakhs)": "40389.86"
      },
      {
          "date": "01-Jan-2019",
          "symbol": "TCS",
          "series": "EQ",
          "openprice": "1,896.00",
          "highprice": "1,910.00",
          "lowprice": "1,885.00",
          "lasttradedprice": "1905.90",
          "closeprice": "1,902.80",
          "totaltradedquantity": "1094883",
          "turnover(inlakhs)": "20800.34"
      },
      {
          "date": "31-Dec-2018",
          "symbol": "TCS",
          "series": "EQ",
          "openprice": "1908.00",
          "highprice": "1909.00",
          "lowprice": "1886.15",
          "lasttradedprice": "1894.75",
          "closeprice": "1893.05",
          "totaltradedquantity": "1879740",
          "turnover(inlakhs)": "35647.72"
      },
      {
          "date": "28-Dec-2018",
          "symbol": "TCS",
          "series": "EQ",
          "openprice": "1915.00",
          "highprice": "1920.00",
          "lowprice": "1893.00",
          "lasttradedprice": "1897.00",
          "closeprice": "1896.05",
          "totaltradedquantity": "2239130",
          "turnover(inlakhs)": "42708.38"
      },
      {
          "date": "27-Dec-2018",
          "symbol": "TCS",
          "series": "EQ",
          "openprice": "1909.00",
          "highprice": "1941.70",
          "lowprice": "1872.10",
          "lasttradedprice": "1909.10",
          "closeprice": "1908.95",
          "totaltradedquantity": "4968201",
          "turnover(inlakhs)": "95411.46"
      },
      {
        "date": "03-Jan-2019",
        "symbol": "SUNPHARMA",
        "series": "EQ",
        "openprice": "442.05",
        "highprice": "443.60",
        "lowprice": "434.00",
        "lasttradedprice": "434.90",
        "closeprice": "436.10",
        "totaltradedquantity": "94",
        "turnover(inlakhs)": "79"
    },
    {
        "date": "02-Jan-2019",
        "symbol": "SUNPHARMA",
        "series": "EQ",
        "openprice": "430.50",
        "highprice": "441.20",
        "lowprice": "429.25",
        "lasttradedprice": "439.95",
        "closeprice": "440.05",
        "totaltradedquantity": "96",
        "turnover(inlakhs)": "56"
    },
    {
        "date": "01-Jan-2019",
        "symbol": "SUNPHARMA",
        "series": "EQ",
        "openprice": "432.50",
        "highprice": "438.80",
        "lowprice": "429.65",
        "lasttradedprice": "432.70",
        "closeprice": "433.55",
        "totaltradedquantity": "84",
        "turnover(inlakhs)": "87"
    },
    {
        "date": "31-Dec-2018",
        "symbol": "SUNPHARMA",
        "series": "EQ",
        "openprice": "428.10",
        "highprice": "432.30",
        "lowprice": "425.50",
        "lasttradedprice": "430.15",
        "closeprice": "430.50",
        "totaltradedquantity": "63",
        "turnover(inlakhs)": "68"
    },
    {
        "date": "28-Dec-2018",
        "symbol": "SUNPHARMA",
        "series": "EQ",
        "openprice": "415.00",
        "highprice": "428.70",
        "lowprice": "413.50",
        "lasttradedprice": "425.00",
        "closeprice": "425.20",
        "totaltradedquantity": "1",
        "turnover(inlakhs)": "28"
    } 
  ];
 
  $scope.init=function(){
  $scope.removeComma($scope.sampleData);
  }
  $scope.removeComma=function(data){
  $scope.hightlow = [];
  angular.forEach(data, function(value, key) {
   data[key].openprice=value.openprice.replace(',','');
   data[key].highprice=value.highprice.replace(',','');
   data[key].lowprice=value.lowprice.replace(',','');
   data[key].lasttradedprice=value.lasttradedprice.replace(',','');
   data[key].closeprice=value.closeprice.replace(',','');
 }); 
 for(var l=0; l<$scope.symbolCollection.length; l++)
 {
     var filteredData=[];
    angular.forEach(data, function(value, key) {
        if($scope.symbolCollection[l]===value.symbol){
            filteredData.push(value)
            }
      });
      if(filteredData.length>0) {
      $scope.calculateIndicator(filteredData);
    }
    filteredData=[];
    }
  }
  $scope.calculateIndicator=function(data){
   var difference=[];
    var total=0;
    var gainloss=0;
    var fluctuation=0;
    var symbol='';
    var ltp=0;
    angular.forEach(data, function(value, key) {
    var dataObj={
      "open":data[key].openprice,
      "close":data[key].closeprice,
      "high":data[key].highprice,
      "low":data[key].lowprice,
      "difference":data[key].closeprice-data[key].openprice,
      "percentageDifference":Math.round(Math.abs(data[key].closeprice-data[key].openprice))+"%",
      "roundPrice":Math.round(data[key].closeprice-data[key].openprice)
    };
    $scope.hightlow.push(parseFloat(data[key].lowprice));
    $scope.hightlow.push(parseFloat(data[key].highprice));
    if(ltp===0){
        ltp=data[key].lasttradedprice;
    }
    total=total+Math.abs(data[key].closeprice-data[key].openprice);
    gainloss=gainloss+(data[key].closeprice-data[key].openprice);
    fluctuation=Math.max.apply(Math, $scope.hightlow)-Math.min.apply(Math, $scope.hightlow);
    symbol=data[key].symbol;
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
    "data":difference
  }

  $scope.result.push(resultObj);
  $scope.hightlow=[];
  console.log("result",$scope.result);
  console.log("total",total);
    }
  $scope.init();
    }]);