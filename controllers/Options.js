var myApp = angular.module('myApp', []);


  myApp.controller('OptionsController', [ '$scope','$interval','$rootScope', '$http',
  function ($scope,$interval,$rootScope,$http) {
    
    var cors_api_url = '/nse/nifty50.php';
    $scope.theTime = new Date().toLocaleTimeString();
    var objHeader ={ url: cors_api_url ,
    method: "GET",
    params: {urlpath: "https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/liveIndexWatchData.json"}}
      
        var api_url = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/liveIndexWatchData.json';
        $scope.niftyRangeLowerSD1="-";
        $scope.niftyRangeHigherSD1="-";
        $scope.niftyRangeLowerSD2="-";
        $scope.niftyRangeHigherSD2="-";
        $scope.days=1;
    // Mock
    $scope.init=function(){
      $http.get(objHeader).then(function (response) {
         
        $scope.niftyResponse=response.data;
        var indexWatchData=response.data.data;
        
        for (i = 0; i < indexWatchData.length; i++) { 
          if(indexWatchData[i].indexName==='NIFTY 50'){
            $scope.currentNiftyValues=indexWatchData[i]; 
            $scope.niftyLtp=$scope.currentNiftyValues.last.replace(',','');  
                  
          }
          if(indexWatchData[i].indexName==='INDIA VIX'){
            $scope.currentIndiaVIXValues=indexWatchData[i];
            $scope.indiaVix=$scope.currentIndiaVIXValues.percChange;
          }
          if(indexWatchData[i].indexName==='NIFTY BANK'){            
            $scope.currentNiftyBankValues=indexWatchData[i];            
          } 
      }
      $scope.sd=$scope.standardDeviation($scope.niftyLtp,$scope.indiaVix.replace("-",""),1, 30 );
      $scope.niftyRangeLowerSD1= Math.round(parseInt($scope.niftyLtp)-$scope.sd);
      $scope.niftyRangeHigherSD1=Math.round(parseInt($scope.niftyLtp)+$scope.sd);
      $scope.niftyRangeLowerSD2=Math.round(parseInt($scope.niftyLtp)-(2*$scope.sd));
      $scope.niftyRangeHigherSD2=Math.round(parseInt($scope.niftyLtp)+(2*$scope.sd));
    });
  }
  $scope.standardDeviation=function(underlying, vix, days, totalDay){
var sd=(underlying*vix*Math.sqrt(days/totalDay)/100);
return sd;
  }
  $scope.calculate=function(){
    $scope.calculated_sd=$scope.standardDeviation($scope.Uv, $scope.Iv, 1, 30);
    $scope.calculatedRangeLowerSD1= Math.round(parseInt($scope.Uv)-$scope.calculated_sd);
    $scope.calculatedRangeHigherSD1=Math.round(parseInt($scope.Uv)+$scope.calculated_sd);
    $scope.calculatedRangeLowerSD2=Math.round(parseInt($scope.Uv)-(2*$scope.calculated_sd))
    $scope.calculatedRangeHigherSD2=Math.round(parseInt($scope.Uv)+(2*$scope.calculated_sd))
  }
  // Original 
   /* $scope.init=function(){
        $http(objHeader).then(function (response) {
        $scope.store(response.data);
        $scope.advances=response.data.advances;
        $scope.declines=response.data.declines;
        $scope.noChange=response.data.unchanged;
        
		});
    }*/
    $scope.init();

    }]);