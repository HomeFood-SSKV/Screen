var myApp = angular.module('myApp', []);


  myApp.controller('WatchListNext50Controller', [ '$scope','$interval','$rootScope', '$http',
  function ($scope,$interval,$rootScope,$http) {
    $scope.callInterval= 180000 ; // 180000 is 3 mins call
    $scope.TenMinscallInterval= 300000 ; // 300000 is 5 mins call  
    var cors_api_url = 'http://pasivaraj.0fees.net/nse/nifty50.php';
    $scope.theTime = new Date().toLocaleTimeString();
   var objHeader ={ url: cors_api_url ,
    method: "GET",
    params: {urlpath: "https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/juniorNiftyStockWatch.json"}}
    // 6 mins init 
    $scope.init=function(){
        $http(objHeader).then(function (response) {
        $scope.store(response.data);
		});
		}
     if($rootScope.Niftystorage===undefined){
      $scope.init();
    }
     $interval(function () { 
         $scope.init();
     }, $scope.callInterval);

     // 10 mins init
     $scope.TenMinsinit=function(){
      $http(objHeader).then(function (response) {
      $scope.TenMinsStore(response.data);
		});
	}
   if($rootScope.TenMinsNiftystorage===undefined){
    $scope.TenMinsinit();
  }
   $interval(function () { 
       $scope.TenMinsinit();
   }, $scope.TenMinscallInterval);

   $scope.removeComma=function(data){
	    $scope.commaRemovedData=data;
	   angular.forEach(data, function(value, key) {
		   data[key].ltP=value.ltP.replace(',','');
	   }); 
	    $scope.commaRemovedData=data;
   }
     // 6 mins storage
    $scope.store=function(nsedata){
       $scope.theTime = new Date().toLocaleTimeString()+'(6 Mins Starts)';
       $scope.advances=nsedata.advances;
       $scope.declines=nsedata.declines;
       if($rootScope.Niftystorage===undefined){
        console.log('3 mins First Time');  
		$scope.removeComma(nsedata.data);
        $rootScope.Niftystorage=$scope.commaRemovedData; 
        $scope.nseData =$scope.commaRemovedData;
        $scope.history_List=$scope.commaRemovedData;

       } else if($rootScope.Niftystorage!==null 
        && $rootScope.Niftystorage!=="" 
        && $rootScope.Niftystorage!==undefined){

        $scope.history_List=$rootScope.Niftystorage;
         $scope.nseData =nsedata.data;
         angular.forEach($scope.history_List, function(value1, key1) {
          angular.forEach($scope.nseData, function(value2, key2) {
            if(value1.symbol===value2.symbol)
            { 
             var val=value2.ltP.replace(',','');
             var result = parseFloat(val) 
              $scope.history_List[key1].ltP=$scope.history_List[key1].ltP+','+(result.toFixed(2));
              $scope.history_List[key1]['recom1']='NO Data';
              $scope.history_List[key1]['recom2']='NO Data';
              $scope.history_List[key1]['recom3']='NO Data';
              $scope.history_List[key1]['recom4']='NO Data';
              $scope.history_List[key1]['recom5']='NO Data';
              $scope.history_List[key1]['recom6']='NO Data';
              $scope.history_List[key1]['recom1_buycount']=0;
              $scope.history_List[key1]['recom2_buycount']=0;
              $scope.history_List[key1]['recom3_buycount']=0;
              $scope.history_List[key1]['recom4_buycount']=0;
              $scope.history_List[key1]['recom5_buycount']=0;
              $scope.history_List[key1]['recom6_buycount']=0;
              $scope.history_List[key1]['recom1_sellcount']=0;
              $scope.history_List[key1]['recom2_sellcount']=0;
              $scope.history_List[key1]['recom3_sellcount']=0;
              $scope.history_List[key1]['recom4_sellcount']=0;
              $scope.history_List[key1]['recom5_sellcount']=0;
              $scope.history_List[key1]['recom6_sellcount']=0;
              $scope.history_List[key1]['recom_bigMove']='NO Data';
              $scope.history_List[key1]['recom_bigMovePer']=''; 
			  $scope.history_List[key1]['recom_OHL']='';
              // test code start
              // var str = $scope.history_List[key1].ltP;
              // var res = str.split(",");
              // var occurenceLength=res.length;
              // if(occurenceLength===4 || occurenceLength===5 )
              // {
              //   $scope.history_List[key1]['recom1']='SELLSIGNAL';
              //   $scope.history_List[key1]['recom2']='SELL';
              //   $scope.history_List[key1]['recom3']='STRONGSELL';
              //   $scope.history_List[key1]['recom1_sellcount']=$scope.history_List[key1]['recom1_buycount']+1;
              //   $scope.history_List[key1]['recom2_sellcount']=$scope.history_List[key1]['recom1_buycount']+1;
              //   $scope.history_List[key1]['recom3_sellcount']=$scope.history_List[key1]['recom1_buycount']+1;
              //   }
              // if(occurenceLength===6 || occurenceLength===7 )
              // {
              //   $scope.history_List[key1]['recom1']='SELLSIGNAL';
              //   $scope.history_List[key1]['recom2']='SELL';
              //   $scope.history_List[key1]['recom3']='STRONGSELL';
              //   $scope.history_List[key1]['recom1_sellcount']=$scope.history_List[key1]['recom1_buycount']+1;
              //   $scope.history_List[key1]['recom2_sellcount']=$scope.history_List[key1]['recom1_buycount']+1;
              //   $scope.history_List[key1]['recom3_sellcount']=$scope.history_List[key1]['recom1_buycount']+1;
              //   }
              // if(occurenceLength===8 || occurenceLength===9 )
              // {
              //   $scope.history_List[key1]['recom1']='BUYSIGNAL';
              //   $scope.history_List[key1]['recom2']='BUY';
              //   $scope.history_List[key1]['recom3']='STRONGBUY';
              //   $scope.history_List[key1]['recom1_buycount']=$scope.history_List[key1]['recom1_buycount']+1;
              //   $scope.history_List[key1]['recom2_buycount']=$scope.history_List[key1]['recom1_buycount']+1;
              //   $scope.history_List[key1]['recom3_buycount']=$scope.history_List[key1]['recom1_buycount']+1;
              //   }
              //   // test code end
              var buy_sell=$scope.calculateBuySellRecommented($scope.history_List[key1]);
              $scope.history_List[key1]=buy_sell;
            }
          });
        });
        if($rootScope.Niftystorage!==undefined 
          && $rootScope.Niftystorage!==null 
          && $rootScope.Niftystorage!==null){
          $rootScope.Niftystorage=$scope.history_List;
        }
        console.log('After 3 mins historical data', $scope.history_List);
       }
    }

     // 10 mins Storage
    $scope.TenMinsStore=function(nsedata){
      $scope.theTenMinsTime = new Date().toLocaleTimeString()+'(10 Mins Starts)';
      $scope.advances=nsedata.advances;
      $scope.declines=nsedata.declines;
      if($rootScope.TenMinsNiftystorage===undefined){

       console.log('Ten mins First Time');  
       $rootScope.TenMinsNiftystorage=nsedata.data; 
       $scope.TenMinsnseData =nsedata.data;
       $scope.TenMinshistory_List=nsedata.data;

      } else if($rootScope.TenMinsNiftystorage!==null 
       && $rootScope.TenMinsNiftystorage!=="" 
       && $rootScope.TenMinsNiftystorage!==undefined){

       $scope.TenMinshistory_List=$rootScope.TenMinsNiftystorage;
        $scope.TenMinsnseData =nsedata.data;
        angular.forEach($scope.TenMinshistory_List, function(value1, key1) {
         angular.forEach($scope.TenMinsnseData, function(value2, key2) {
           if(value1.symbol===value2.symbol)
           { 
            var val=value2.ltP.replace(',','');
            var result = parseFloat(val) 
             $scope.TenMinshistory_List[key1].ltP=$scope.TenMinshistory_List[key1].ltP+','+(result.toFixed(2));
            
             $scope.TenMinshistory_List[key1]['recom4']='NO Data';
             $scope.TenMinshistory_List[key1]['recom5']='NO Data';
             $scope.TenMinshistory_List[key1]['recom6']='NO Data';
             
             $scope.TenMinshistory_List[key1]['recom4_buycount']=0;
             $scope.TenMinshistory_List[key1]['recom5_buycount']=0;
             $scope.TenMinshistory_List[key1]['recom6_buycount']=0;
            
             $scope.TenMinshistory_List[key1]['recom4_sellcount']=0;
             $scope.TenMinshistory_List[key1]['recom5_sellcount']=0;
             $scope.TenMinshistory_List[key1]['recom6_sellcount']=0;
             // test code start
            //  var str = $scope.TenMinshistory_List[key1].ltP;
            //  var res = str.split(",");
            //  var occurenceLength=res.length;
            //  console.log('tens occurenceLength',occurenceLength);
            //  if(occurenceLength===4 || occurenceLength===5 )
            //  {
            //    $scope.TenMinshistory_List[key1]['recom4']='SELLSIGNAL';
            //    $scope.TenMinshistory_List[key1]['recom5']='SELL';
            //    $scope.TenMinshistory_List[key1]['recom6']='STRONGSELL';
            //    $scope.TenMinshistory_List[key1]['recom4_sellcount']=$scope.TenMinshistory_List[key1]['recom1_buycount']+1;
            //    $scope.TenMinshistory_List[key1]['recom5_sellcount']=$scope.TenMinshistory_List[key1]['recom1_buycount']+1;
            //    $scope.TenMinshistory_List[key1]['recom6_sellcount']=$scope.TenMinshistory_List[key1]['recom1_buycount']+1;
            //    }
            //  if(occurenceLength===6 || occurenceLength===7 )
            //  {
            //    $scope.TenMinshistory_List[key1]['recom4']='SELLSIGNAL';
            //    $scope.TenMinshistory_List[key1]['recom5']='SELL';
            //    $scope.TenMinshistory_List[key1]['recom6']='STRONGSELL';
            //    $scope.TenMinshistory_List[key1]['recom4_sellcount']=$scope.TenMinshistory_List[key1]['recom1_buycount']+1;
            //    $scope.TenMinshistory_List[key1]['recom5_sellcount']=$scope.TenMinshistory_List[key1]['recom1_buycount']+1;
            //    $scope.TenMinshistory_List[key1]['recom6_sellcount']=$scope.TenMinshistory_List[key1]['recom1_buycount']+1;
            //    }
            //  if(occurenceLength===8 || occurenceLength===9 )
            //  {
            //    $scope.TenMinshistory_List[key1]['recom4']='BUYSIGNAL';
            //    $scope.TenMinshistory_List[key1]['recom5']='BUY';
            //    $scope.TenMinshistory_List[key1]['recom6']='STRONGBUY';
            //    $scope.TenMinshistory_List[key1]['recom4_buycount']=$scope.TenMinshistory_List[key1]['recom1_buycount']+1;
            //    $scope.TenMinshistory_List[key1]['recom5_buycount']=$scope.TenMinshistory_List[key1]['recom1_buycount']+1;
            //    $scope.TenMinshistory_List[key1]['recom6_buycount']=$scope.TenMinshistory_List[key1]['recom1_buycount']+1;
            //    }
            //    // test code end
             var buy_sell=$scope.TenMinsCalculateBuySellRecommented($scope.TenMinshistory_List[key1]);
             $scope.TenMinshistory_List[key1]=buy_sell;
           }
         });
       });
       if($rootScope.TenMinsNiftystorage!==undefined 
         && $rootScope.TenMinsNiftystorage!==null 
         && $rootScope.TenMinsNiftystorage!==null){
         $rootScope.TenMinsNiftystorage=$scope.TenMinshistory_List;
         // merge list
         $scope.mergeList();
         
       }
       console.log('After 10 mins historical ', $scope.TenMinshistory_List);
      }
   }
   $scope.mergeList=function()
   {
    angular.forEach($scope.history_List, function(value1, key1) {
      angular.forEach($scope.TenMinshistory_List, function(value2, key2) {
        if(value1.symbol===value2.symbol)
        { 
          $scope.history_List[key1]['recom4']=$scope.TenMinshistory_List[key2]['recom4'];
          $scope.history_List[key1]['recom5']=$scope.TenMinshistory_List[key2]['recom5'];
          $scope.history_List[key1]['recom6']=$scope.TenMinshistory_List[key2]['recom6'];
          ;
          $scope.history_List[key1]['recom4_buycount']=$scope.TenMinshistory_List[key2]['recom4_buycount'];
          $scope.history_List[key1]['recom5_buycount']=$scope.TenMinshistory_List[key2]['recom5_buycount'];
          $scope.history_List[key1]['recom6_buycount']=$scope.TenMinshistory_List[key2]['recom6_buycount'];

          $scope.history_List[key1]['recom4_sellcount']=$scope.TenMinshistory_List[key2]['recom4_sellcount'];
          $scope.history_List[key1]['recom5_sellcount']=$scope.TenMinshistory_List[key2]['recom5_sellcount'];
          $scope.history_List[key1]['recom6_sellcount']=$scope.TenMinshistory_List[key2]['recom6_sellcount'];
        }
      });
    });
   }
    $scope.calculateBuySellRecommented=function(value)
    {
      var str = value.ltP;
      var res = str.split(",");
      var occurenceLength=res.length;
      console.log('occurenceLength',occurenceLength);
      if((res[0]===value.open || res[0]>value.open) && occurenceLength>=3
      && res[occurenceLength-1]> res[occurenceLength-2] 
      && res[occurenceLength-2]> res[occurenceLength-3])
      {
        value['recom1']='BUYSIGNAL';
        value['recom1_buycount']= value['recom1_buycount']+1;
      }
      if((res[0]===value.open || res[0]>value.open) && occurenceLength>=4
      && res[occurenceLength-1]> res[occurenceLength-2] 
      && res[occurenceLength-2]> res[occurenceLength-3] 
      && res[occurenceLength-3]> res[occurenceLength-4])
      {
        value['recom2']='BUY';
        value['recom2_buycount']= value['recom2_buycount']+1;
      }
      if((res[0]===value.open || res[0]>value.open) && occurenceLength>=5
       && res[occurenceLength-1]> res[occurenceLength-2]
       && res[occurenceLength-2]> res[occurenceLength-3] 
       && res[occurenceLength-3]> res[occurenceLength-4] 
       && res[occurenceLength-4]> res[occurenceLength-5])
      {
        value['recom3']='STRONGBUY';
        value['recom3_buycount']= value['recom3_buycount']+1;
      }
      if((res[0]<value.open) && occurenceLength>=3
      && res[occurenceLength-1]< res[occurenceLength-2] 
      && res[occurenceLength-2]< res[occurenceLength-3])
      {
        value['recom1']='SELLSIGNAL';
        value['recom1_sellcount']=value['recom1_sellcount']+1;
      }
      if(( res[0]<value.open) && occurenceLength>=4
      && res[occurenceLength-1]< res[occurenceLength-2] 
      && res[occurenceLength-2]< res[occurenceLength-3] 
      && res[occurenceLength-3]< res[occurenceLength-4])
      {
        value['recom2']='SELL';
        value['recom2_sellcount']=value['recom2_sellcount']+1;
        
      }
      if((res[0]<value.open) && occurenceLength>=5
       && res[occurenceLength-1]< res[occurenceLength-2]
       && res[occurenceLength-2]< res[occurenceLength-3] 
       && res[occurenceLength-3]< res[occurenceLength-4] 
       && res[occurenceLength-4]< res[occurenceLength-5])
      {
        value['recom3']='STRONGSELL';
        value['recom3_sellcount']=value['recom3_sellcount']+1;
      }
	  var occurenceLength=res.length;
	   if(occurenceLength>=2)
		{
		var percentage=(((res[occurenceLength-1]-res[occurenceLength-2])/res[occurenceLength-2])*100).toFixed(1);
		if(percentage>0.5)
		{
         value['recom_bigMove']='BUY';
		 value['recom_bigMovePer']=percentage;
		}
		else if(percentage<-0.5)
		{
        value['recom_bigMove']='SELL';
		value['recom_bigMovePer']=percentage;
		}
      }
	  if(value.open==value.high && value.open!=value.low)
      {
        value['recom_OHL']='SELL';
      }
	  if(value.open==value.low && value.open!=value.high)
      {
        value['recom_OHL']='BUY';
      }
      return value;
    }

    $scope.TenMinsCalculateBuySellRecommented=function(value)
    {
      var str = value.ltP;
      var res = str.split(",");
      var occurenceLength=res.length;
      console.log('Ten mins occurenceLength',occurenceLength);
      if((res[0]===value.open || res[0]>value.open) && occurenceLength>=3
      && res[occurenceLength-1]> res[occurenceLength-2] 
      && res[occurenceLength-2]> res[occurenceLength-3])
      {
        value['recom4']='BUYSIGNAL';
        value['recom4_buycount']= value['recom4_buycount']+1;
      }
      if((res[0]===value.open || res[0]>value.open) && occurenceLength>=4
      && res[occurenceLength-1]> res[occurenceLength-2] 
      && res[occurenceLength-2]> res[occurenceLength-3] 
      && res[occurenceLength-3]> res[occurenceLength-4])
      {
        value['recom5']='BUY';
        value['recom5_buycount']= value['recom5_buycount']+1;
      }
      if((res[0]===value.open || res[0]>value.open) && occurenceLength>=5
       && res[occurenceLength-1]> res[occurenceLength-2]
       && res[occurenceLength-2]> res[occurenceLength-3] 
       && res[occurenceLength-3]> res[occurenceLength-4] 
       && res[occurenceLength-4]> res[occurenceLength-5])
      {
        value['recom6']='STRONGBUY';
        value['recom6_buycount']= value['recom6_buycount']+1;
      }
      if((res[0]<value.open) && occurenceLength>=3
      && res[occurenceLength-1]< res[occurenceLength-2] 
      && res[occurenceLength-2]< res[occurenceLength-3])
      {
        value['recom4']='SELLSIGNAL';
        value['recom4_sellcount']=value['recom4_sellcount']+1;
      }
      if(( res[0]<value.open) && occurenceLength>=4
      && res[occurenceLength-1]< res[occurenceLength-2] 
      && res[occurenceLength-2]< res[occurenceLength-3] 
      && res[occurenceLength-3]< res[occurenceLength-4])
      {
        value['recom5']='SELL';
        value['recom5_sellcount']=value['recom5_sellcount']+1;
        
      }
      if((res[0]<value.open) && occurenceLength>=5
       && res[occurenceLength-1]< res[occurenceLength-2]
       && res[occurenceLength-2]< res[occurenceLength-3] 
       && res[occurenceLength-3]< res[occurenceLength-4] 
       && res[occurenceLength-4]< res[occurenceLength-5])
      {
        value['recom6']='STRONGSELL';
        value['recom6_sellcount']=value['recom6_sellcount']+1;
      }
      return value;
    }

    }]);