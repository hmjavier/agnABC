/*!
 * File:       drawElementsAgn.js
 * Version:     1.0
 * Author:      cnocdev
 *  
 * Copyright 2013-2015 cnocdev, all rights reserved.
 */

var drawElementsMainAgn = {
		dataTable : null,		
		init : function() {
			
			cnocConnector.invokeMashup(
					cnocConnector.agnServiceList, 
					{}, 
					drawElementsMainAgn.getAgnServiceList, 
					"listAgnService", 
					"listAgnServiceG"
			);
			
		},getAgnServiceList: function(dataResponse, containerChild, containerFather){

			drawElementsMainAgn.dataTable = dataResponse.records.record;
			console.log(drawElementsMainAgn.dataTable);
					
   			$("#"+containerFather).empty();	
   			var tableData = '<table class="'+containerChild+'" id="'+containerChild+'"></table>';
   			$("#"+containerFather).append(tableData);
   			
   			/*  SI FUNCIONA PERO NO TIENE PAGINACION  */
   			//var oTable = $("#"+containerChild).editableTableWidget();
   			
   			
   			$("#"+containerChild).jsGrid({
                height: "98%",
                width: "100%",
                filtering: true,
                editing: true,
                sorting: true,
                paging: true,
                autoload: true,
                pageSize: 15,
                pageButtonCount: 5,
                controller: db,
                confirmDeleting: false,
                fields: [
                        {
                        	headerTemplate: function() {
                                return $("<button>").attr("type", "button").text("Cargar CMDB")
                                        .on("click", function () {
                                            //deleteSelectedItems();
                                        	addDataToCmdb();
                                        });
                            },
                            itemTemplate: function(_, item) {
                                return $("<input>").attr("type", "checkbox")
                                        .on("change", function () {
                                            $(this).is(":checked") ? selectItem(item) : unselectItem(item);
                                        });
                            },
                            align: "center",
                            width: 200
                         },
                         { name: "type_change", type: "text"},
                         { name: "bandwidth", type: "text"},
                         { name: "bw_unit", type: "text"},
                         { name: "city", type: "text"},
                         { name: "company", type: "text"},
                         { name: "country", type: "text"},
                         { name: "date_request", type: "text"},
                         { name: "ip_wan", type: "text"},
                         { name: "link_balancertype", type: "text"},
                         { name: "link_scheme", type: "text"},
                         { name: "location", type: "text"},
                         { name: "location_name", type: "text"},
                         { name: "manufacturer", type: "text"},
                         { name: "message_oper", type: "text"},
                         { name: "nsr", type: "text"},
                         { name: "outside_num", type: "text"},
                         { name: "service_type", type: "text"},
                         { name: "state", type: "text"},
                         { name: "street", type: "text"},                    
                         { name: "unique_identifier", type: "text"},
                         { name: "vendor", type: "text"},
                         { name: "zip", type: "text"},
                         { type: "control", modeSwitchButton: false, editButton: false }
                ]
            });

   			
   			var selectedItems = [];
   		 
   		    var selectItem = function(item) {
   		        selectedItems.push(item);
   		    };
   		 
   		    var unselectItem = function(item) {
   		        selectedItems = $.grep(selectedItems, function(i) {
   		            return i !== item;
   		        });
   		    };
   		 /*
   		    var deleteSelectedItems = function() {
   		        if(!selectedItems.length || !confirm("Are you sure?"))
   		            return;
   		 
   		        var $grid = $("#"+containerChild);
   		 
   		        $.each(selectedItems, function(_, item) {
   		            $grid.jsGrid("deleteItem", item);
   		        });
   		 
   		        selectedItems = [];
   		    };*/
   			
   		    
	   		 var addDataToCmdb = function(){
	   			 if(!selectedItems.length || !confirm("Are you sure?"))
	   		            return;
	   			 
	   			var $grid = $("#"+containerChild);
	   			
	   			$.each(selectedItems, function(_, item) {
   		            
	   				console.log("items");
	   				console.log(item);
	   				drawElementsMainAgn.locationSM(item);   				
	   					   				
	   				//$grid.jsGrid("deleteItem", item);
   		        });
	   			 
	   		 };
   		    
   			
            $(".config-panel input[type=checkbox]").on("click", function() {
                var $cb = $(this);
                $("#"+containerChild).jsGrid("option", $cb.attr("id"), $cb.is(":checked"));
            });
/********************************************************************************************************************************************/
/*    CREATE CI TO SM     */	
 		}//,locationSM:function(networkCode, company, typeChange, alertName){
		,locationSM:function(item){
			
			//$( "#container").mask("Waiting... Creating Location ");
        	/************************************************************************************/
        	
        	try {
        		
        		/*
   				 * NOTA
   				 * 
   				 * El campo site_category en SM esta como requerido, pero aun no lo ponen obligatorio en el WS.  --- 20-07-2015  -- Paez: Que se coloque el valor de country.
   				 * 
   				 * */
        		
        		var dataLocation = {
   						"locationCode": item.location,
                		"location":item.location_name,
                		"city":item.city,
                		"state":item.state,
                		"zip":item.zip,
                		"contact":"",
                		"phoneContact":"",
                		"country":item.country,
                		"mailContact":"",
                		"company":"ATT AGN",
                		"customerSiteAlias": item.location_name,
                		"nodeType": "BRANCH",
                		"outsideNum": item.outside_num,
                		"insideNum": "N/A",
                		"neighborhood": "N/A",
                		"district": "N/A",            		
                		"networkCode": "L100016",
                		"street": item.street
   				};
        		
        		
                $.ajax({
                        type : 'GET',
                        dataType : 'jsonp',
                        url : cnocConnector.agnLoadLocationSM,
                        data: dataLocation,                        
                        error : function(jqXHR, textStatus, errorThrown) {
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                        },
                        success : function(response) {
                        	console.log(response);
                        	$.each( response, function( key, val ){
            					$.each( val, function( key, val ){
            						$.each( val, function( key, val ){
            							console.log("varios");
            							try{
            								if(val.message === "Success"){
            									console.log("Se genera Circuit");
            									//drawElementsMainConfig.circuitSM(networkCode, company,  typeChange, alertName);
            								}else{
            									$.each( val.messages, function( key, val ){            										
            										if(val[2].content === "This record contains an invalid duplicate key."){
            											console.log("YA EXISTE EL LOCATION, SE CREA CIRCUIT ASOCIADO A ESTE");            											
            											
            											drawElementsMainAgn.circuitSM(item);
            											/*if(drawElementsMainConfig.flagAlertNameCircuit === false){
            												console.log("Se salta a Network componen por que no exite Circuit");
            												drawElementsMainConfig.networkComponentSM(networkCode, company, typeChange, alertName, istatusDC);
            											}else{
            												drawElementsMainConfig.circuitSM(networkCode, company, typeChange, alertName);
            											}*/
            											
            										}else{
            											console.log("ERROR AL CREAR LOCATION");
            										}
            									});
            								}
            							}catch(e){
            								console.log(e);
            							}
            						});
            					});
                        	});
                        }
                });
	        } catch (error) {
	                alert(error);
	        };			
		},circuitSM:function(item){
			
			//NOTA: Validar si los servicios de operacion local tendran direccionamiento : IP_WAN
			//NOTA: ASEGURAR QUE LO MANDE EL PAIS : SERVICE_TYPE
			//Alert name solo cuando existe NC, se tiene que hacer la validacion
			
			var dataCircuit = {            		
        			"vendor": item.vendor,
        			"location": item.location_name,            			
        			"type": "CIRCUIT",
        			"istatus":"IN USE",
            		"subtype":"COPPER",
            		"locationCode": item.location,
            		"problemPriority": "3",
            		"manufacturer": "",
        			"company":"ATT AGN",
        			"defaultImpact": "3",
        			"allowSubscription": "YES",            			
            		"networkCode": "L100016",
            		"ipWan": item.ip_wan, 
            		"alertName": "AGN001", //TEST PARA RELACIONAR 
            		"uniqueIdentifier": item.unique_identifier,            		
            		"nsr": "MAIN",
            		"linkScheme": "N/A",
            		"linkBalancertype": "",
            		"bandwidth": item.bandwidth,
            		"bwUnit": item.bw_unit,
            		"serviceType": "MPLS", 
            		"vendorNC": item.vendor,
            		"requiredPort": "NO",
            		"peName":"",
            		"interfaceName": "",
            		"interfaceType": "",
            		"ipPe": "",
            		"vrfVlan": "",
            		"serviceQuality": "",
            		"profile": "",
            		"q1": "",
            		"q2": "",
            		"q3": "",
            		"deviceSeverity": "N0",
            		"pendingChange": "NO"
   			};
			
			console.log("dataCircuit");
			console.log(dataCircuit);
			
			
			try {
        		console.log("entro para crear el circuit");
                $.ajax({
                        type : 'GET',
                        dataType : 'jsonp',
                        url : cnocConnector.agnLoadCircuitSM,
                        data : dataCircuit,
                        error : function(jqXHR, textStatus, errorThrown) {
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                        },
                        success : function(response) {
                        	
                        	console.log("response circuit");
                        	console.log(response);

                        	$.each( response, function( key, val ){
            					$.each( val, function( key, val ){
            						$.each( val, function( key, val ){
            							try{
            								if(val.message === "Success"){
            									
            									
            									drawElementsMainAgn.bizserviceSM(item);
            									/*if((count - 1) === parseInt(row)){
            										
            										drawElementsMainAgn.bizserviceSM(item);
            										if(drawElementsMainConfig.flagAlertNameNC === false){
            											console.log("Se genera BZ por que no lleva Network Component");
                    									drawElementsMainConfig.bizserviceSM(networkCode, company, typeChange, alertName, istatusDC);
            							        	}else{
            							        		drawElementsMainConfig.networkComponentSM(networkCode, company, typeChange, alertName, istatusDC);
            							        	}
            										                										
            									}*/
            									
            									//nextNC = true;                									
            								}else{
            									$.each( val.messages, function( key, val ){
            										console.log(val);
            										if(val[2].content === "This record contains an invalid duplicate key."){
            											
            										}else{
            											
            										}
            									});

            								}
            							}catch(e){
            								console.log(2);
            							}
            						});
            					});
                        	});
                        }
                });
	        } catch (error) {
	                alert(error);
	        };

		},bizserviceSM: function(item){
			
			
			console.log("creando el bizservice");
			var dataBS = {
        			
        			"location":item.location_name,
        			"type": "bizservice",
        			"istatus": "IN USE",
            		"subtype": "BUSINESS SERVICE",
            		"locationCode": item.location,
            		"problemPriority": "3",
            		"deviceSeverity": "N0",
            		"pendingChange": "NO",  
            		"allowSubscription": "YES",
            		"company": "ATT AGN",
            		"defaultImpact": "3",
            		"networkCode": "L100016",
            		"alertName": "AGN001", //TEST PARA RELACIONAR
            		"uniqueIdentifier": item.unique_identifier,
            		"serviceName": "MANAGED SERVICE",
            		"serviceScope": "ADMINISTRATION",
            		"function": "WAN SERVICE"
        	};
			
			
			try {
        		console.log("entro para crear el Biz Service");
                $.ajax({
                        type : 'GET',
                        dataType : 'jsonp',
                        url : cnocConnector.agnLoadBSSM,
                        data : dataBS,
                        error : function(jqXHR, textStatus, errorThrown) {
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                        },
                        success : function(response) {
                        	console.log(response);
                        	
                        	
                        	$.each( response, function( key, val ){
            					$.each( val, function( key, val ){
            						$.each( val, function( key, val ){
            							try{
            								if(val.message === "Success"){
            									//$( "#container").unmask();
            									//console.log("Se genera Peripheral");
            									//drawElementsMainConfig.peripheralSM(networkCode, company, unique_identifier, typeChange);
            								}else{
            									$.each( val.messages, function( key, val ){
            										console.log(val);
            										if(val[2].content === "This record contains an invalid duplicate key."){
            											
            										}else{
            											
            										}
            										//$( "#container").unmask();
            									});
            								}
            							}catch(e){
            								console.log(2);
            								//$( "#container").unmask();
            							}
            						});
            					});
                        	});
                        }
                });
	        } catch (error) {
	                alert(error);
	                //$( "#container").unmask();
	        };
			
			
		} 
};