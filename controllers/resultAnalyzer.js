var myApp = angular.module('myApp', []);


  myApp.controller('resultController', [ '$scope','$interval','$rootScope', '$http',
  function ($scope,$interval,$rootScope,$http) {
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
   $scope.hightlow.push(parseFloat(data[key].lowprice));
   $scope.hightlow.push(parseFloat(data[key].highprice));
 }); 
 $scope.calculateIndicator(data);
   console.log(data);
   console.log($scope.hightlow); 
   console.log(Math.min.apply(Math, $scope.hightlow)); 
   console.log(Math.max.apply(Math, $scope.hightlow)); 
  }
  $scope.calculateIndicator=function(data){
   var difference=[];
    var total=0;
    var symbol='';
    angular.forEach(data, function(value, key) {
    var dataObj={
      "open":data[key].openprice,
      "close":data[key].closeprice,
      "high":data[key].highprice,
      "low":data[key].lowprice,
      "difference":data[key].closeprice-data[key].openprice
    };
    total=total+Math.abs(data[key].closeprice-data[key].openprice);
    symbol=data[key].symbol;
    difference.push(dataObj);
  }); 
  var resultObj={
    "symbol":symbol,
    "total":total,
    "weekhigh":Math.max.apply(Math, $scope.hightlow),
    "weeklow":Math.min.apply(Math, $scope.hightlow),
    "data":difference
  }
  $scope.result=resultObj;
  console.log("result",$scope.result);
  console.log("total",total);
    }
  $scope.init();
    }]);