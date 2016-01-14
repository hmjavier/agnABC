/*!
 * File:       cnocConnector.js
 * Version:     1.0
 * Author:      cnocdev
 *  
 * Copyright 2013-2015 cnocdev, all rights reserved.
 */

var cnocConnector = {
		invokeMashup : function(invokeUrl, params, callback,divelements, divcontainer) {
            
			//$( "#container").mask("Waiting...");
            try {
                    $.ajax({
                            type : 'GET',
                            dataType : 'jsonp',
                            url : invokeUrl,
                            data : params,
                            error : function(jqXHR, textStatus, errorThrown) {
                                    console.log(jqXHR);
                                    console.log(textStatus);
                                    console.log(errorThrown);
                            },
                            async: true,
                            success : function(response) {
                                    try {
                                            var ce = response.PrestoResponse.PrestoError.ErrorDetails.code;
                                            if (ce == 401) {
                                                    alert("Insuficientes Prvilegios");
                                                    window.location = "/dashboardTest/";
                                            }
                                    } catch (err) {
                                            callback(response, divelements, divcontainer);
                                            //$( "#container").unmask("Waiting...");
                                            
                                    };
                            }
                    });
            } catch (error) {
                    alert(error);
                    //$( "#container").unmask("Waiting...");
            };
    }
	/*,
     invokeMashup : function(invokeUrl, params, callback, divcontainer, divelements) {
               $( "#" + divcontainer ).mask("Waiting...");
               try {
                       $.ajax({
                               type : 'GET',
                               dataType : 'json',
                               url : invokeUrl,
                               data : params,
                               statusCode : {
                                       401 : function() {
                                               alert('Session Time Out');
                                               window.location = "/dashboard/index.html";
                                       }
                               },
                               error : function(jqXHR, textStatus, errorThrown) {
                                       console.log(jqXHR);
                                       console.log(textStatus);
                                       console.log(errorThrown);
                               },
                               success : function(response) {
                                       try {
                                               var ce = response.PrestoResponse.PrestoError.ErrorDetails.code;
                                               if (ce == 401) {
                                                       alert("Insuficientes Prvilegios");
                                                       window.location = "/dashboard/index.html";
                                               }
                                       } catch (err) {
                                               callback(response, divcontainer,divelements);
                                               $( "#" + divcontainer ).unmask();
                                       }
                               }
                       });
               } catch(error) {
                       alert(error);
                       $( "#" + divcontainer ).unmask();
               }
       },*/    
};