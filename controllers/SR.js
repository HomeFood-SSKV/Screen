var myApp = angular.module('myApp', []);


  myApp.controller('SRController', [ '$scope','$interval','$rootScope', '$http',
  function ($scope,$interval,$rootScope,$http) {
    $scope.asd="gfg:";
     
    $scope.dataset={ "results": [
      {
        "instrument_token": 41729,
        "timestamp": "2018-01-12 10:31:54",
        "last_price": 4005,
        "last_quantity": 8,
        "last_trade_time": "2018-01-12 10:31:54",
        "average_price": 279.04,
        "volume": 559981,
        "buy_quantity": 703982,
        "sell_quantity": 424423,
        "ohlc": {
          "open": 4009,
          "high": 4018,
          "low": 4009,
          "close": 4011
        } },
        {
          "instrument_token": 41729,
          "timestamp": "2018-01-12 10:31:54",
          "last_price": 278.75,
          "last_quantity": 8,
          "last_trade_time": "2018-01-12 10:45:54",
          "average_price": 279.04,
          "volume": 559981,
          "buy_quantity": 703982,
          "sell_quantity": 424423,
          "ohlc": {
            "open": 4019,
            "high": 4020,
            "low": 4011,
            "close": 4011
          } },
          {
            "instrument_token": 41729,
            "timestamp": "2018-01-12 10:31:54",
            "last_price": 278.75,
            "last_quantity": 8,
            "last_trade_time": "2018-01-12 11:00:54",
            "average_price": 279.04,
            "volume": 559981,
            "buy_quantity": 703982,
            "sell_quantity": 424423,
            "ohlc": {
              "open": 4022,
              "high": 4024,
              "low": 4008,
              "close": 4014
            } },
            {
              "instrument_token": 41729,
              "timestamp": "2018-01-12 10:31:54",
              "last_price": 278.75,
              "last_quantity": 8,
              "last_trade_time": "2018-01-12 11:15:54",
              "average_price": 279.04,
              "volume": 559981,
              "buy_quantity": 703982,
              "sell_quantity": 424423,
              "ohlc": {
                "open": 4019,
                "high": 4020,
                "low": 4009,
                "close": 4011
              } },{
                "instrument_token": 41729,
                "timestamp": "2018-01-12 10:31:54",
                "last_price": 278.75,
                "last_quantity": 8,
                "last_trade_time": "2018-01-12 11:31:54",
                "average_price": 279.04,
                "volume": 559981,
                "buy_quantity": 703982,
                "sell_quantity": 424423,
                "ohlc": {
                  "open": 4019,
                  "high": 4019,
                  "low": 4018,
                  "close": 4019
                }}
  ] };
  $scope.thresholdSupport;
  $scope.thresholdResistance;
  $scope.segmentCount=12;
  $scope.thresholdDividerCount=3;
  $scope.init=function(){
    $scope.minCollection=[];
    $scope.maxCollection=[];
    angular.forEach($scope.dataset, function(value, key) {
       console.log("key",key);
       console.log("value",value);
       angular.forEach(value, function(val, ky) {
        console.log("ky",ky);
        console.log("val",val);
        $scope.minCollection.push(val["ohlc"].low);
        $scope.maxCollection.push(val["ohlc"].high);
        
     });
    }); 
    console.log("minCollection",$scope.minCollection);
    console.log("maxCollection",$scope.maxCollection);
    $scope.getSupport($scope.minCollection);
    $scope.getResistance($scope.maxCollection);
    $scope.asd="done";
    //open(location, '_self').close();
  }
  $scope.getSupport=function(minVal){
    var minVal_Length=minVal.length;
    var counts = {};
    var sum=0;
    var support = {};
    var OtherSupport = {};
    var avgSupport;
    for (var i = 0; i < minVal.length; i++) {
      var num = minVal[i];
      sum=sum+minVal[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
      if(counts[num]>1){
      support[num] = counts[num];
    }
    }
    avgSupport=Math.round(sum/minVal_Length);
    OtherSupport[avgSupport]=1;
    points=minVal;
    points.sort(function(a, b){return a - b});
    var OtherSum=0;
    for (var j = 0; j < $scope.thresholdDividerCount; j++) {
      OtherSum=OtherSum+points[j];
    }
    var ThreshHoldSupport=Math.round(OtherSum/$scope.thresholdDividerCount);
    OtherSupport[ThreshHoldSupport]=1;
     
    console.log(support);
    console.log(OtherSupport);
  }
  $scope.getResistance=function(maxVal){
    var maxVal_Length=maxVal.length; 
    var counts = {};
    var sum=0;
    var resistance = {};
    var OtherResistance = {};
    var avgResistance;
    for (var i = 0; i < maxVal.length; i++) {
      var num = maxVal[i];
      sum=sum+maxVal[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
      if(counts[num]>1){
        resistance[num] = counts[num];
    }
    }
    avgResistance=Math.round(sum/maxVal_Length);
    OtherResistance[avgResistance]=1;
    points=maxVal;
    points.sort(function(a, b){return a - b});
    points.reverse();
    var OtherSum=0;
    for (var j = 0; j < $scope.thresholdDividerCount; j++) {
      OtherSum=OtherSum+points[j];
    }
    ThreshHoldResistance=Math.round(OtherSum/$scope.thresholdDividerCount);
    OtherResistance[ThreshHoldResistance]=1;
     
    console.log(resistance);
    console.log(OtherResistance);
  }
  $scope.init();

    }]);