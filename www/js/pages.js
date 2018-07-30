// ---------------- Global URL Variables -----------------------------//

	// for application deployed on cloud
	var urlCloud = 'http://104.238.99.137:8080/TLC/';

	// For running application in Eclipse for testing
	var urlEclipse = '';

	//***************************************************************//
	//  Set up base URL according to where the app is going to be used.
		baseUrl = urlCloud;
	//	baseUrl = urlEclipse;
	//***************************************************************//

	
//=============================== FUNCTIONS ===============================//

	function w3_logout() {
		//document.getElementById("exitPopup").style.display="block";
	}

						
	function exitApp() {
			//document.getElementById("exitPopup").style.display = "none";
		   	if (navigator.app) {	 			
	                  navigator.app.exitApp();
		    } else if (navigator.device) {  navigator.device.exitApp(); }
				      else  { mobile.changePage("#Login"); }
	}
	
	function closeExitApp() {
		 document.getElementById("exitPopup").style.display = "none";
	}


	function DeleteAllRows(tableName) 
    {
        var tabData = document.getElementById(tableName); 
        var rowCount = tabData.rows.length;
        for (var i = rowCount - 1; i > 0; i--) 
        {
            tabData.deleteRow(i);
        }
   }


	var getCurDBDateTime = function(){

            var curDate = new Date();  
            var curMonth = curDate.getMonth() + 1;
            var curDateFrmt = appendLeadingZeroes(curDate.getDate()) +'/'+appendLeadingZeroes(curMonth)+'/'+curDate.getFullYear()+' '+
                              appendLeadingZeroes(curDate.getHours())+':'+appendLeadingZeroes(curDate.getMinutes()) ;
            return getDBDateTime(curDateFrmt);
    };
    
     var appendLeadingZeroes = function(val){
        var retVal="";
        if (val > 9)  retVal = val;   else   retVal = '0' + val ;        
        return retVal;
    };
    
    var getDBDateTime = function(orgDate){
                var DD  = orgDate.substring(0,2) ; 
                var MM  = orgDate.substring(3,5) ; 
                var YYYY  = orgDate.substring(6,10) ; 
                var HH  = orgDate.substring(11,13) ; 
                var MN  = orgDate.substring(14,16) ; 
                var DB_DATE = YYYY + "-" + MM + "-" + DD + " " + HH + ":" + MN;
                return DB_DATE;
    };


	function getDisplayDate(orgDate){
    
	    var m_names = new Array("Jan", "Feb", "Mar", 
		"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
		"Oct", "Nov", "Dec");

		var d = new Date(orgDate);
		
		if (validDate(d))
		{
			var curr_date = d.getDate();
			var curr_month = d.getMonth();
			var curr_year = d.getFullYear();
			var retDateStr = curr_date + "-" + m_names[curr_month]+ "-" + curr_year;
			return(retDateStr);
		}
		else
		{
			return "";
		}		
	}

	function validDate(d)
	{	
		if ( Object.prototype.toString.call(d) === "[object Date]" ) {
		  // it is a date
		  if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
		    // date is not valid
		    return false;
		  }
		  else {
		    // date is valid
    		    return true;
		  }
		}
		else {
		  // not a date
		    return false;		  
		}
	}
	
	
function convertToHMS(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    else
    	ret += "00:";

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
  
  
   var getCurDBDateTime = function(){

            var curDate = new Date();  
            var curMonth = curDate.getMonth() + 1;
            var curDateFrmt = appendLeadingZeroes(curDate.getDate()) +'/'+appendLeadingZeroes(curMonth)+'/'+curDate.getFullYear()+' '+
                              appendLeadingZeroes(curDate.getHours())+':'+appendLeadingZeroes(curDate.getMinutes()) ;
            return getDBDateTime(curDateFrmt);
    };
            
	

    function AddRowTab(tableName, DateTimeLocal, EV_NAME, DURATION) 
   {
        var tabData = document.getElementById(tableName); 
        var rowCount = tabData.rows.length;       
        var row = tabData.insertRow(rowCount);
        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.style="padding:4px 4px 4px 4px;";
		cell2.style="padding:4px 4px 4px 4px;";
		cell3.style="padding:4px 4px 4px 4px;";
        cell1.innerHTML = DateTimeLocal;
        cell2.innerHTML = EV_NAME;
        cell3.innerHTML = DURATION; 
   }
   
   	
	
	
//--------------------------------------------------------------------------------//	
//=============================== Page Init Events ===============================//
//--------------------------------------------------------------------------------//	

	
	$(document).on("pagebeforeshow", "#home", function(event)
	{
		
	 //--------------- Populate Dashboard Data -----------------//
	
	// alert(baseUrl);
	
      $.ajax({url:baseUrl+'MaintJsps/GetDashboardData.jsp',
               data: {},
               type: 'post',
               async: 'true',
               dataType: 'json',                      
               success: function (result) {
               			
               			$(".LastUpd").html("Last updated : "+getCurDBDateTime());               			
						
						$("#GridHrs").html(convertToHMS(result.GRID));
						$("#GenSetHrs").html(convertToHMS(result.DGSET));
						$("#AgitHrs").html(convertToHMS(result.AGITATOR));
			            $("#CompHrs").html(convertToHMS(result.COMPRESSOR));
			            $("#TANK_TEMP").html(result.TANK_TEMP);
			            $("#TANK_QTY").html(result.TANK_QTY + "  ltr");
  	            },		                            		 
          		error: function (request,error) 
          		{	
          			console.log('Error Get Dashboard Data-'+error);
      			}
	});     	

		
		
    });


 // -------------------------- MAG ---------------------------------

function getStatusText(status)
{

	if (status == '0') return "<font color='red'><b>Off</b></font>";
	if (status == '1') return "<font color='green'><b>On</b></font>";
	
	return status;
}

	$(document).on("pagebeforeshow", "#mag", function(event)
	{
	
	// alert(baseUrl);
	
      $.ajax({url:baseUrl+'MaintJsps/GetDashboardData.jsp',
               data: {},
               type: 'post',
               async: 'true',
               dataType: 'json',                      
               success: function (result) {
               			
               			$(".LastUpd").html("Last updated : "+getCurDBDateTime());               			
						$("#tGridHrs").html(convertToHMS(result.GRID));
						$("#tGenSetHrs").html(convertToHMS(result.DGSET));
						$("#tAgitHrs").html(convertToHMS(result.AGITATOR));
			            $("#tCompHrs").html(convertToHMS(result.COMPRESSOR));
			            $("#tTANK_TEMP").html(result.TANK_TEMP);
			            $("#tTANK_QTY").html(result.TANK_QTY + "  ltr");
						
						var aut = "";						
						if(result.MAN_AUTO == 1) 
							aut = 'AUTO' 
						else 
							aut = 'MANUAL';
						
						$("#tCOMP1_STS").html(getStatusText(result.COMP1_STS));
						$("#tCOMP2_STS").html(getStatusText(result.COMP2_STS));
						$("#tAGTR_STS").html(getStatusText(result.AGTR_STS));
						$("#tDG_STS").html(getStatusText(result.DG_STS));
						$("#tEBSUP_STS").html(getStatusText(result.EBSUP_STS));
						$("#tAGT_TRIP_STS").html(getStatusText(result.AGT_TRIP_STS));
						$("#tCOMP1_TRIP_STS").html(getStatusText(result.COMP1_TRIP_STS));
						$("#tCOMP2_TRIP_STS").html(getStatusText(result.COMP2_TRIP_STS));
						$("#tPUMP_TRIP_STS").html(getStatusText(result.PUMP_TRIP_STS));

  	            },		                            		 
          		error: function (request,error) 
          		{	
          			console.log('Error Get Dashboard Data-'+error);
      			}
		});     	

		
		
    });




 // -------------------------- Activity ---------------------------------

	$(document).on("pagebeforeshow", "#activity", function(event)
	{
	
	// alert(baseUrl);
	
	 
     $.ajax({url:baseUrl+'MaintJsps/GetDashboardData.jsp',
               data: {},
               type: 'post',
               async: 'true',
               dataType: 'json',                      
               success: function (result) {
               			
           			$(".LastUpd").html("Last updated : "+getCurDBDateTime());               			
					google.charts.setOnLoadCallback(drawChart);
					
					function drawChart() {
						 
						 console.log(result);
						 
						  var intGrid = parseInt(result.GRID);
						  var intDGSET =  parseInt(result.DGSET)
						  var intAGITATOR =  parseInt(result.AGITATOR)
						  var intCOMPRESSOR =   parseInt(result.COMPRESSOR)
						 
						  var data = google.visualization.arrayToDataTable([
							["Element", "Duration", { role: "style" } ],
							["Grid",intGrid, "#b87333"],
							["GenSet",intDGSET, "pink"],
							["Agitator", intAGITATOR, "gold"],
							["Compressor",intCOMPRESSOR, "color: lightgreen;"]
						  ]);
					
						  var options = {
							title: "Duration in Seconds",
							width: 340,
							height: 400,
							bar: {groupWidth: "50%"},
							legend: { position: "none" },
						  };
						  var chart = new google.visualization.ColumnChart(document.getElementById("barchart"));
						  chart.draw(data, options);						
					};
						/*
						$("#tGridHrs").html(convertToHMS(result.GRID));
						$("#tGenSetHrs").html(convertToHMS(result.DGSET));
						$("#tAgitHrs").html(convertToHMS(result.AGITATOR));
			            $("#tCompHrs").html(convertToHMS(result.COMPRESSOR));
			            $("#tTANK_TEMP").html(result.TANK_TEMP);
			            $("#tTANK_QTY").html(result.TANK_QTY + "  ltr");
						*/
  	            },		                            		 
          		error: function (request,error) 
          		{	
          			console.log('Error Get Dashboard Data-'+error);
      			}
		});     	
		
    });
	
	

 // -------------------------- Open Alarms ---------------------------------

	$(document).on("pagebeforeshow", "#bell", function(event)
	{
	
	// alert(baseUrl);
	
	 
     $.ajax({url:baseUrl+'MaintJsps/GetOpenAlarmsData.jsp',
               data: {},
               type: 'post',
               async: 'true',
               dataType: 'json',                      
               success: function (result) {               			
           			$(".LastUpd").html("Last updated : "+getCurDBDateTime());               			
					
					DeleteAllRows("OpenAlarmsTab");
					
					result.forEach(function(packet) 
					{		 
						AddRowTab("OpenAlarmsTabBody",
						packet.DateTimeLocal,		  						
						packet.EV_NAME,
						packet.DURATION);
					}); 					
					
  	            },		                            		 
          		error: function (request,error) 
          		{	
          			console.log('Error Get Dashboard Data-'+error);
      			}
		});     	
		
    });