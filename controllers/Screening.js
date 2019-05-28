var myApp = angular.module('myApp', []);


  myApp.controller('WatchListController', [ '$scope','$interval','$rootScope', '$http',
  function ($scope,$interval,$rootScope,$http) {
    $scope.callInterval= 180000; // 180000 is 3 mins call
    $scope.TenMinscallInterval= 300000; // 300000 is 5 mins call
    var cors_api_url = '/nse/nifty50.php';
    $scope.theTime = new Date().toLocaleTimeString();
    var objHeader ={ url: cors_api_url ,
    method: "GET",
    params: {urlpath: "https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/niftyStockWatch.json"}}
      
    $scope.majorStocks= ['ADANIPORTS','ASIANPAINT','HDFCBANK','RELIANCE','HDFC','INFY','ITC',
  'TCS','ICICIBANK','KOTAKBANK','LT','AXISBANK'];
  $scope.majorStocksOrder= ['A-ADANIPORTS','B-ASIANPAINT','C-HDFCBANK',
  'D-RELIANCE','E-HDFC','F-INFY','G-ITC',
  'H-TCS','I-ICICIBANK','J-KOTAKBANK','K-LT','L-AXISBANK'];
  $scope.majorUpCount=0;
  $scope.majorDownCount=0;
    // 6 mins init 
    $scope.init=function(){
        $http(objHeader).then(function (response) {
        $scope.store(response.data);
        $scope.advances=response.data.advances;
        $scope.declines=response.data.declines;
        $scope.noChange=response.data.unchanged;
        if($scope.advances>($scope.declines+$scope.noChange)) {
          $scope.descriptionCurrent='UP';
          
        }else if($scope.advances<($scope.declines+$scope.noChange)) {
          $scope.descriptionCurrent='DOWN';
        }
		});
    }
    $scope.preOpenMarket=function(){
      var objHeader1 ={ url: cors_api_url ,
        method: "GET",
        params: {urlpath: "https://www.nseindia.com/live_market/dynaContent/live_analysis/pre_open/nifty.json"}}
         
      
      $http(objHeader1).then(function (response) {
      $scope.preOpenAdvances=response.data.advances;
      $scope.preOpenDeclines=response.data.declines;
      $scope.preOpenNoChange=response.data.noChange;
      if($scope.preOpenAdvances>($scope.preOpenDeclines+$scope.preOpenNoChange)) {
        $scope.descriptionPre='UP';
      }else if($scope.preOpenAdvances<($scope.preOpenDeclines+$scope.preOpenNoChange)) {
        $scope.descriptionPre='DOWN';
      }
  });
  }
  $scope.liveIndexWatch=function(){
    $http(objHeader).then(function (response) {
      $scope.advances=response.data.advances;
      $scope.declines=response.data.declines;
      $scope.noChange=response.data.unchanged;
      if($scope.advances>($scope.declines+$scope.noChange)) {
        $scope.descriptionCurrent='UP';
        
      }else if($scope.advances<($scope.declines+$scope.noChange)) {
        $scope.descriptionCurrent='DOWN';
      }
  });
  var indexwatchUrl ={ url: cors_api_url ,
    method: "GET",
    params: {urlpath: "https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/liveIndexWatchData.json"}}
   
    $http(indexwatchUrl).then(function (response) {
      $scope.majorUpCount=0;
      $scope.majorDownCount=0;
    var indexWatchData=response.data.data;
    $scope.refreshTime = new Date().toLocaleTimeString();
    for (i = 0; i < indexWatchData.length; i++) { 
      if(indexWatchData[i].indexName==='NIFTY 50'){
        $scope.currentNiftyValues=indexWatchData[i];
        // patch nifty values
      }
      if(indexWatchData[i].indexName==='INDIA VIX'){
        $scope.currentIndiaVIXValues=indexWatchData[i];
      }
      if(indexWatchData[i].indexName==='NIFTY BANK'){
        
        $scope.currentNiftyBankValues=indexWatchData[i];
        // patch nifty bank values
        if($scope.currentNiftyBankValues.percChange>0){
            $scope.majorUpCount=$scope.majorUpCount+1;      
          } else if($scope.currentNiftyBankValues.percChange<0){
            $scope.majorDownCount=$scope.majorDownCount+1;     
          }
      }
      if(indexWatchData[i].indexName==='NIFTY PSU BANK'){
        $scope.currentPSUValues=indexWatchData[i];
        if($scope.currentPSUValues.percChange>0){
          $scope.majorUpCount=$scope.majorUpCount+1;      
        } else if($scope.currentPSUValues.percChange<0){
          $scope.majorDownCount=$scope.majorDownCount+1;     
        }
      }
      if(indexWatchData[i].indexName==='NIFTY FIN SERVICE'){
        $scope.currentFinServiceValues=indexWatchData[i];
        if($scope.currentFinServiceValues.percChange>0){
          $scope.majorUpCount=$scope.majorUpCount+1;      
        } else if($scope.currentFinServiceValues.percChange<0){
          $scope.majorDownCount=$scope.majorDownCount+1;     
        }
      }
      if(indexWatchData[i].indexName==='NIFTY IT'){
        $scope.currentITValues=indexWatchData[i];
        if($scope.currentITValues.percChange>0){
          $scope.majorUpCount=$scope.majorUpCount+1;      
        } else if($scope.currentITValues.percChange<0){
          $scope.majorDownCount=$scope.majorDownCount+1;     
        }
      }
      if(indexWatchData[i].indexName==='NIFTY FMCG'){
        $scope.currentAutoValues=indexWatchData[i];
        if($scope.currentAutoValues.percChange>0){
          $scope.majorUpCount=$scope.majorUpCount+1;      
        } else if($scope.currentAutoValues.percChange<0){
          $scope.majorDownCount=$scope.majorDownCount+1;     
        }
      } 
  }
  if($scope.currentNiftyValues.percChange>0 
    && $scope.currentIndiaVIXValues.percChange<-1){
      $scope.descriptionIndiaVix='UP';      
    } else if($scope.currentNiftyValues.percChange<0 
    && $scope.currentIndiaVIXValues.percChange>1){
      $scope.descriptionIndiaVix='DOWN'; 
    }else {
      $scope.descriptionIndiaVix='FLAT'; 
    }
});
}
  

     if($rootScope.Niftystorage===undefined){
       $scope.preOpenMarket();
       $scope.liveIndexWatch();
       $scope.init();
    }
     $interval(function () { 
         $scope.liveIndexWatch();
         $scope.init();
     }, $scope.callInterval);

     // 10 mins init
     $scope.TenMinsinit=function(){
      $http.get(cors_api_url).then(function (response) {
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
   $scope.removeComma_MapNifty=function(Niftydata,data,from, to){
    angular.forEach($scope.commaRemovedData, function(value, key) {
      if(from==='Nifty' && to ==='ADANIPORTS' && data[key].symbol==='ADANIPORTS'){
        data[key].ltP=Niftydata.last.replace(',','');
        data[key].open=Niftydata.open.replace(',','');
        data[key].high=Niftydata.high.replace(',','');
        data[key].low=Niftydata.low.replace(',','');
        data[key].per=Niftydata.percChange;
     }
    }); 
    $scope.commaRemovedData=data;
 }
 $scope.removeComma_MapBankNifty=function(NiftyBankdata,data,from, to){
  angular.forEach($scope.commaRemovedData, function(value, key) {
    if(from==='NiftyBank' && to ==='ASIANPAINT' && data[key].symbol==='ASIANPAINT'){
      data[key].ltP=NiftyBankdata.last.replace(',','');
      data[key].open=NiftyBankdata.open.replace(',','');
      data[key].high=NiftyBankdata.high.replace(',','');
      data[key].low=NiftyBankdata.low.replace(',','');
      data[key].per=NiftyBankdata.percChange;
   }
  }); 
  $scope.commaRemovedData=data;
}
   $scope.orderMajorStocks=function(data){
   angular.forEach(data, function(value, key) {
     if($scope.majorStocks.indexOf(value.symbol)>-1){
      data[key].modifiedSymbol=$scope.majorStocksOrder[$scope.majorStocks.indexOf(value.symbol)];;
     }
   }); 
   $scope.history_List=data;
 }
     // 6 mins storage
    $scope.store=function(nsedata){
       $scope.theTime = new Date().toLocaleTimeString();
       $scope.advances=nsedata.advances;
       $scope.declines=nsedata.declines;
       $scope.noChange=nsedata.unchanged;
       $scope.TopStockUpCount=0;
       $scope.TopStockDownCount=0;
       if($rootScope.Niftystorage===undefined){
        console.log('3 mins First Time');  
        $scope.removeComma(nsedata.data);
        $scope.removeComma_MapNifty($scope.currentNiftyValues,$scope.commaRemovedData,'Nifty','ADANIPORTS');
        $scope.removeComma_MapBankNifty($scope.currentNiftyBankValues,$scope.commaRemovedData,'NiftyBank','ASIANPAINT');
        $rootScope.Niftystorage=$scope.commaRemovedData; 
        $scope.nseData =$scope.commaRemovedData;
        $scope.topTen=[];
        for (i = 0; i < $scope.commaRemovedData.length; i++) { 
          if($scope.majorStocks.indexOf($scope.commaRemovedData[i].symbol)>-1)
          {
            $scope.topTen.push($scope.commaRemovedData[i]);
            $scope.history_List=$scope.topTen;
            
            if($scope.commaRemovedData[i].per>0 
              && $scope.commaRemovedData[i].symbol !=='ADANIPORTS' 
              && $scope.commaRemovedData[i].symbol !=='ASIANPAINT'){
              $scope.TopStockUpCount=$scope.TopStockUpCount+1;
            }else if($scope.commaRemovedData[i].per<0
              && $scope.commaRemovedData[i].symbol !=='ADANIPORTS' 
              && $scope.commaRemovedData[i].symbol !=='ASIANPAINT'){
              $scope.TopStockDownCount= $scope.TopStockDownCount+1;
            }
          }
       
        }
        $scope.orderMajorStocks($scope.history_List);
       } else if($rootScope.Niftystorage!==null 
        && $rootScope.Niftystorage!=="" 
        && $rootScope.Niftystorage!==undefined){
          $scope.topTenRefresh=[];
          for (i = 0; i < $rootScope.Niftystorage.length; i++) { 
            if($scope.majorStocks.indexOf($rootScope.Niftystorage[i].symbol)>-1)
            {
              $scope.topTenRefresh.push($rootScope.Niftystorage[i]);
              if($rootScope.Niftystorage[i].per>0
                && $scope.commaRemovedData[i].symbol !=='ADANIPORTS' 
                && $scope.commaRemovedData[i].symbol !=='ASIANPAINT'){
                $scope.TopStockUpCount=$scope.TopStockUpCount+1;
              }else if($rootScope.Niftystorage[i].per<0
                && $scope.commaRemovedData[i].symbol !=='ADANIPORTS' 
                && $scope.commaRemovedData[i].symbol !=='ASIANPAINT'){
                $scope.TopStockDownCount= $scope.TopStockDownCount+1;
              }
            }
         
          }
        $scope.history_List=$scope.topTenRefresh;
        $scope.orderMajorStocks($scope.history_List);
         $scope.nseData =nsedata.data;
         angular.forEach($scope.history_List, function(value1, key1) {
          angular.forEach($scope.nseData, function(value2, key2) {
            if(value1.symbol===value2.symbol && $scope.majorStocks.indexOf(value2.symbol)>-1)
            { 
             var val=value2.ltP.replace(',','');
             var result = parseFloat(val);
            //  console.log($scope.history_List[key1].ltP);
             
              if(value2.symbol==='ADANIPORTS'){
                var niftyval=$scope.currentNiftyValues.last.replace(',','');
                var Niftyresult = parseFloat(niftyval);
                $scope.history_List[key1].ltP=$scope.history_List[key1].ltP+','+(Niftyresult.toFixed(2));
             } else if(value2.symbol==='ASIANPAINT'){
              var bankniftyval=$scope.currentNiftyBankValues.last.replace(',','');
              var BankNiftyresult = parseFloat(bankniftyval);
              $scope.history_List[key1].ltP=$scope.history_List[key1].ltP+','+(BankNiftyresult.toFixed(2));
           } else {
              $scope.history_List[key1].ltP=$scope.history_List[key1].ltP+','+(result.toFixed(2));
             }
              $scope.history_List[key1]['recom1']='NO Data';
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
           if(value1.symbol===value2.symbol && $scope.majorStocks.indexOf(value2.symbol)>-1)
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
        if(value1.symbol===value2.symbol && $scope.majorStocks.indexOf(value2.symbol)>-1)
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