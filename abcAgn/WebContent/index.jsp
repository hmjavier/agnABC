<?xml version="1.0" encoding="US-ASCII" ?>
<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	
    <title>AGN Data</title>
    <link rel="stylesheet" type="text/css" href="frameworks/bootstrap-3.3.5/css/bootstrap.css"/>
    <link rel="stylesheet" type="text/css" href="frameworks/jsgrid/css/demos.css"/>
	<link rel="stylesheet" type="text/css" href="frameworks/jsgrid/css/jsgrid.css"/>
	<link rel="stylesheet" type="text/css" href="frameworks/jsgrid/css/theme.css"/>
	
	<style type="text/css">
        .fixed-panel {
			height: 600px;	
			overflow-y: scroll;
        }
  	</style>
  
	</head>
<body>
	<div id="wrapper">
		<div class="panel panel-primary">
			<div class="panel-heading">Informaci&oacute;n del Servicio</div>
		  	<div class="panel-body">
		  	<div class="config-panel">
		        <label><input id="heading" type="checkbox" checked /> Heading</label>
		        <label><input id="filtering" type="checkbox" checked /> Filtering</label>
		        <label><input id="inserting" type="checkbox" /> Inserting</label>
		        <label><input id="editing" type="checkbox" checked /> Editing</label>
		        <label><input id="paging" type="checkbox" checked /> Paging</label>
		        <label><input id="sorting" type="checkbox" checked /> Sorting</label>
		        <label><input id="selecting" type="checkbox" checked /> Selecting</label>
		    </div>
		    	<div id="listAgnServiceG" class="fixed-panel">
		    	</div>
		  	</div>		  
		</div>	
	</div>
	
	
	
	
	<!-- jQuery Version 2.1.4 -->	
	<script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
	<!-- <script type="text/javascript" src="js/jquery-2.1.4.js"></script>-->
	<script type="text/javascript" src="js/cnocConnector.js"></script>
	<script type="text/javascript" src="js/drawElementsAgn.js"></script>
	
   
    <!-- JS GRID -->
	<script src="frameworks/jsgrid/dist/db.js"></script>
	<script src="frameworks/jsgrid/src/jsgrid.core.js"></script>
    <script src="frameworks/jsgrid/src/jsgrid.load-indicator.js"></script>
    <script src="frameworks/jsgrid/src/jsgrid.load-strategies.js"></script>
    <script src="frameworks/jsgrid/src/jsgrid.sort-strategies.js"></script>
    <script src="frameworks/jsgrid/src/jsgrid.field.js"></script>
    <script src="frameworks/jsgrid/src/jsgrid.field.text.js"></script>
    <script src="frameworks/jsgrid/src/jsgrid.field.number.js"></script>
    <script src="frameworks/jsgrid/src/jsgrid.field.select.js"></script>
    <script src="frameworks/jsgrid/src/jsgrid.field.checkbox.js"></script>
    <script src="frameworks/jsgrid/src/jsgrid.field.control.js"></script>
	
	
	<script type="text/javascript" src="frameworks/bootstrap-3.3.5/js/bootstrap.min.js"></script>
	
	<!-- EDITABLE --- SI FUNCIONA PERO NO TIENE PAGINACION -->
	<!--<script type="text/javascript" src="frameworks/editorT/mindmup-editabletable.js"></script>
	<script type="text/javascript" src="frameworks/editorT/numeric-input-example.js"></script>-->
	
	
	<!-- 
		
	<script type="text/javascript" src="frameworks/datatable-editor/js/jquery.dataTables.js"></script>
	<script type="text/javascript" src="frameworks/datatable-editor/js/dataTables.tableTools.min.js"></script>	
	<script type="text/javascript" src="frameworks/datatable-editor/js/dataTables.editor.min.js"></script>-->

	<!-- Properties 1.0.9 -->		
	<script type="text/javascript" src="js/jquery.i18n.properties-min-1.0.9.js"></script>
	
	<script>
		 $(document).ready(function(){
			jQuery.i18n.properties({
				name:'config', 
				path:'prop/', 
				mode:'both',
				callback: function() {
				    	
					cnocConnector.agnServiceList = agnServiceList;
					cnocConnector.agnLoadLocationSM = serviceCreateLocation;
					cnocConnector.agnLoadCircuitSM = serviceCreateCircuit;
					cnocConnector.agnLoadBSSM = serviceCreateBizservice;

				}
			});

			/*! Se llama funcion de inicio*/
			drawElementsMainAgn.init();			
		 });
	</script>
	
</body>
</html>