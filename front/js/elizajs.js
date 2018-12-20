
var cuenta=0;
var papa=0;
var idPadre;
var ultimoNombre;
var arrayNombres=[];
var arrayIds=[];
var nombreIndicador;

function cargarInicio(){

	cargaContenido('remp','front/views/home.html');
	cuenta=0;
	papa=0;
	document.getElementById("breadc").innerHTML='<li class="breadcrumb-item"><i class="material-icons">home</i></li>';
	document.getElementById("seccname").innerHTML='<h2 class="no-margin-bottom">Inicio</h2>';
	enviar("",'back/controller/usuario/UsuarioGetLogged.php',postgetLogged);//No me lo toque ( ¬.¬)
}

function preIndicadorListPadre(padre,nombre){
     //Solicite información del servidor
     formData={'padre':padre};
     cargaContenido('remp','front/views/indicadores.html');
		 document.getElementById("breadc").innerHTML='<li class="breadcrumb-item"><a href="javascript:cargarInicio()"><i class="material-icons">home</i></a></li>';
		 cargarMenus(padre,cuenta);
		 if(padre==0 || padre>papa || papa==10000){
			 document.getElementById("breadc").innerHTML+=("<li class='breadcrumb-item'>"+nombre+"</li>");
			 if(papa!=10000){
				 arrayNombres[cuenta]=nombre;
				 arrayIds[cuenta]=padre;
				 cuenta+=1;
		 	}
		 }
		 papa=padre;
 		var str='<h2 class="no-margin-bottom">'+nombre+'</h2>';
		nombreIndicador=nombre;
    document.getElementById("seccname").innerHTML=str;
		enviar(formData,'back/controller/indicador/IndicadorListPadre.php',postIndicadorListPadre);

}

function cargarMenus(padre,c){
	var nombres=[];
	var ids=[];
		for (var i = 0; i < c; i++) {
			nombre=arrayNombres[i];
			id=arrayIds[i];
			nombres.push(nombre);
			ids.push(id);
			if(id==padre){
				pintarMenus(nombres,ids);
				break;
			}
			document.getElementById("breadc").innerHTML+=('<li class="breadcrumb-item"><a href="javascript:preIndicadorListPadre('+id+',\''+nombre+'\')">'+nombre+'</a></li>');
		}
}

function pintarMenus(nombres,ids){
	cuenta=nombres.length-1;
	arrayNombres=[];
	arrayIds=[];
	for (var i = 0; i <= nombres.length; i++) {
		nombre=nombres[i];
		id=ids[i];
		arrayNombres[i]=nombre;
		arrayIds[i]=id;
	}
}

 function postIndicadorListPadre(result,state){
     //Maneje aquí la respuesta del servidor.
     if(state=="success"){
         var json=JSON.parse(result);
         if(json[0].msg=="exito"){
            for(var i=1; i < Object.keys(json).length; i++) {
                var Indicador = json[i];
                //----------------- Para una tabla -----------------------
                str='<div class="col-sm-6"><div class="card"><div class="card-bodyJ">';
                str+='<h4 class="card-title">'+Indicador.nombre+'</h4><div class="row "><div class="col-sm-6">';
								if(userLogged.tipo==1){
										str+='<a title="Ver más" href="javascript:preIndicadorListPadre(\''+Indicador.id+'\',\''+Indicador.nombre+'\')"><img class="card-img" src="'+Indicador.imagen+'" alt="Card image"></div><div class="col-sm-6"></a>';
								}else{
									if(Indicador.esPadre==1){
										str+='<a title="Ver más" href="javascript:preIndicadorListPadre(\''+Indicador.id+'\',\''+Indicador.nombre+'\')"><img class="card-img" src="'+Indicador.imagen+'" alt="Card image"></div><div class="col-sm-6"></a>';
									}else{
										str+='<img class="card-img" src="'+Indicador.imagen+'" alt="Card image"></div><div class="col-sm-6">';
									}
								}

                str+='<div class="containerJ">';
								str+='<a class="btn btn-primaryJ" data-toggle="tooltip" href="javascript:preCargarDetalles(\''+Indicador.id+'\')" data-placement="top" title="Detalles"><i class="material-icons">event_note</i></a>';
								str+='<a class="btn btn-primaryJ usuarioAdmin" data-toggle="tooltip" href="javascript:editarIndicador(\''+Indicador.id+'\')" data-placement="top" title="Editar"><i class="material-icons">create</i></a>';
								str+='<a class="btn btn-primaryJ " data-toggle="tooltip" href="javascript:graficar(\''+Indicador.id+'\')" data-placement="top" title="Graficar"><i class="material-icons">assessment</i></a>';
								str+='<a class="btn btn-primaryJ usuarioAdmin" data-toggle="tooltip" href="javascript:eliminarIndicador(\''+Indicador.id+'\')" data-placement="top" title="Eliminar"><i class="material-icons">delete</i></a>';

                document.getElementById("IndicadorList").innerHTML+=str;
                //-------- Para otras opciones ver htmlBuilder.js ---------
            }
						document.getElementById("agregarIndi").innerHTML='<a href="javascript:cargarFormIndicador(\''+papa+'\',\''+nombreIndicador+'\')"><img id="plus" src="front/public/icons-reference/plus.png" alt="Card image"></a>';
         }else{
            document.getElementById("agregarIndi").innerHTML='<a href="javascript:cargarFormIndicador(\''+papa+'\',\''+nombreIndicador+'\')"><img id="plus" src="front/public/icons-reference/plus.png" alt="Card image"></a>';
         }
     }else{
         alert("Hubo un errror interno ( u.u)\n"+result);
     }
     mostrarMergasOcultas();
}


function eliminarIndicador(id){
    swal({
  title: "¿Está seguro?",
  text: "se eliminará éste indicador",
  icon: "warning",
  buttons: true,
  dangerMode: true,
}).then((willDelete) => {
    formData={'id':id};
		enviar(formData,'back/controller/indicador/IndicadorDelete.php',exitoEliminarIndicador);
});
}

function exitoEliminarIndicador(result,status){
	if(state=="success"){
			swal("El indicador se ha eliminado con exito!!", {
				icon: "success",
			});
			preIndicadorListPadre(0,'Indicadores');//modificar luego, dependiendo de la rama en la que se este
 	}
  }

function cargarPersonalizar(){
	cargaContenido('remp','front/views/personalizar.html');
	var str='<li class="breadcrumb-item"><a href="javascript:cargarInicio()"><i class="material-icons">home</i></a></li>';
	str+='<li class="breadcrumb-item">Personalizar</li>';
	document.getElementById("breadc").innerHTML=str;
}


function preCargarDetalles(id){
	cargaContenido('remp','front/views/infoIndicador.html');
	document.getElementById("breadc").innerHTML='<li class="breadcrumb-item"><a href="javascript:cargarInicio()"><i class="material-icons">home</i></a></li>';
	formData={'id':id};
	enviar(formData,'back/controller/indicador/Indicadorselect.php',postCargarDetalles);
	enviar(formData,'back/controller/periodo/PeriodoFirst.php',buscarPeriodo);
}

function postCargarDetalles(result,state){
	if(state=="success"){
			var json=JSON.parse(result);
			if(json[0].msg=="exito"){
		 	 	var Indicador = json[1];
				var str = Indicador.descripcion.split("\n");
				agg="";
      	for (var i = 0; i < str.length; i++) {
					agg += "<p>" + str[i] + "</p>";
				}
				$("#descripcion").append(agg);
			}
			mostrarMergasOcultas();
 	}
}


function buscarPeriodo(result,state){
	if(state=="success"){
			var json=JSON.parse(result);
			if(json[0].msg=="exito"){
		 	 	var Periodo = json[1];
				document.getElementById('periodo').value=Periodo.id;
				formData={'periodo':Periodo.id};
				enviar(formData,'back/controller/archivo/ArchivoListByPeriodo.php',postCargarArchivos);
			}
 	}
}

function postCargarArchivos(result,state){
	if(state=="success"){
			var json=JSON.parse(result);
			if(json[0].msg=="exito"){
				var str="";
				var str2="";
				for(var i=1; i < Object.keys(json).length; i++) {
				var Archivo = json[i];
				if(Archivo.extension=='1'){
					str+='<a target="_blank" href="'+Archivo.url+'"><img width="60" height="60" src="front/public/img/pdf.png"></a>';
				}else{
					str2+='<a target="_blank" href="'+Archivo.url+'"><img width="60" height="60" src="front/public/img/imagen.png"></a>'
				}
			}
			document.getElementById("archivosPdf").innerHTML=str;
			document.getElementById("archivosPng").innerHTML=str2;
			}
 	}
}



function cargarFormIndicador(padre,nombre){
	cargaContenido('remp','front/views/formIndicador.html');
	document.getElementById("breadc").innerHTML+='<li class="breadcrumb-item">Agregar Indicador</li>';
}

function preIndicadorInsert(idForm, tipo){

		var rutaIndi;
		var rutaPer;
		if(tipo=='insert'){
			document.getElementById("idPadre").value=papa;
			rutaIndi='back/controller/indicador/IndicadorInsert.php';
			rutaPer='back/controller/periodo/PeriodoInsert.php';
		}else{
			rutaIndi='back/controller/indicador/IndicadorUpdate.php';
			rutaPer='back/controller/periodo/PeriodoUpdate.php';
		}
    //Haga aquí las validaciones necesarias antes de enviar el formulario.
   if(validarForm(idForm)){
		 var form = $("#"+idForm)[0];
		 var formData=new FormData(form);
		$.ajax({
                    type: "POST",
                    url: rutaIndi,
                    data: formData,
                    enctype: 'multipart/form-data',
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: function (data) {
											var json=JSON.parse(data);
                        if (json[0].msg== "exito") {
														 	 //insertar periodo
															 if(json[2].tipo=="insert")enviar(json[1],rutaPer,postIndicadorInsert);
															 else{
																 enviar(json[1],rutaPer,postIndicadorUpdate);
															 }
													}else{
														 alert("Hubo un errror en la inserción ( u.u)\n");
													}
                    },
                    error: function (data) {
												alert("Hubo un errror interno ( u.u)\n");
                    }
});
    }else{
        alert("Debe llenar los campos requeridos");
    }
}


function postIndicadorInsert(result, state){
	if(state=="success"){
							if(result=="true"){
								swal("El indicador se ha agregado exitosamente", {
										icon: "success",
									});
									//preIndicadorListPadre(idPadre,ultimoNombre);
							}else{
								 alert("Hubo un errror en la inserción ( u.u)\n"+result);
							}

 }else{
			alert("Hubo un errror interno ( u.u)\n"+result);
			}

}

function postIndicadorUpdate(result, state){
	if(state=="success"){
							if(result=="true"){
								swal("El indicador se ha actualizado exitosamente", {
										icon: "success",
									});
									//preIndicadorListPadre(idPadre,ultimoNombre);
							}else{
								 alert("Hubo un errror en la inserción ( u.u)\n"+result);
							}

 }else{
			alert("Hubo un errror interno ( u.u)\n"+result);
			}

}


function editarIndicador(id){
	cargaContenido('remp','front/views/actualizarIndicador.html');
	document.getElementById("breadc").innerHTML+='<li class="breadcrumb-item">Editar Indicador</li>';
	formData={'id':id};
	enviar(formData,'back/controller/indicador/IndicadorSelect.php',llenarDatosIndicador);
	enviar(formData,'back/controller/periodo/PeriodoFirst.php',llenarDatosPeriodo);
}

function llenarDatosIndicador(result,state){
	if(state=="success"){
			var json=JSON.parse(result);
							if(json[0].msg=="exito"){
								 document.getElementById('idPadre').value=json[1].id;
				 				document.getElementById('idDescripcion').value=json[1].descripcion;
								 document.getElementById('idNombre').value = json[1].nombre;
								 document.getElementById('UMedida').value= json[1].unidadMedida;
							}else{
								 alert("Hubo un errror en la busqueda ( u.u)\n"+result);
							}
 }else{
			alert("Hubo un errror interno ( u.u)\n"+result);
			}
}


function llenarDatosPeriodo(result,state){
	if(state=="success"){
			var json=JSON.parse(result);
			if(json[0].msg=="exito"){
				var Periodo = json[1];
				document.getElementById("idCantidad").value=Periodo.cantidad;
				document.getElementById("idMeta").value=Periodo.amarillo;
				document.getElementById("idRojo").value=Periodo.rojo;
				document.getElementById("idVerde").value=Periodo.verde;
				//get current date
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1; //January is 0!
				var yyyy = today.getFullYear();
				if(dd<10) {
				    dd = '0'+dd
				}

				if(mm<10) {
				    mm = '0'+mm
				}
				today = yyyy + '-' + mm + '-' + dd;//fecha actual
				//get final period date
				datos= Periodo.fecha_fin.split(" ");
				datos= datos[0].split("-");
				day=datos[2];
				month=datos[1];
				year=datos[0];
				final=year+"-"+month+"-"+day;//fecha final
				if(final<=today){
					document.getElementById('registroPeriodo').innerHTML='<a class="btn" data-toggle="tooltip" href="javascript:preRegistrarPeriodo(\''+Periodo.indicador+'\')" data-placement="top" title="Agregar nuevo periodo" id="actualizarUsuario"><i class="material-icons">library_add</i></a>';
				}
			}
 	}
}


function preRegistrarPeriodo(id){
	cargaContenido('remp','front/views/seccionPeriodo.html');
	idPadre=id;
	document.getElementById("breadc").innerHTML='<li class="breadcrumb-item"><a href="javascript:cargarInicio()"><i class="material-icons">home</i></a></li>';

}


function periodoInsert(idForm){
	if(validarForm(idForm)){
		document.getElementById("id").value=idPadre;
	 var formData=$('#'+idForm).serialize();
	 enviar(formData,'back/controller/periodo/PeriodoInsert.php',postPeriodoInsert);
	 }else{
			 alert("Debe llenar los campos requeridos");
	 }

}




function preArchivoInsert(idForm){
	if(validarForm(idForm)){
		var form = $("#"+idForm)[0];
		var formData=new FormData(form);
	 $.ajax({
									 type: "POST",
									 url: 'back/controller/archivo/ArchivoInsert.php',
									 data: formData,
									 enctype: 'multipart/form-data',
									 contentType: false,
									 processData: false,
									 cache: false,
									 success: function (data) {
										 var json=JSON.parse(data);
											 if (json[0].msg== "exito") {
												 swal("Archivo subido exitosamente", {
													 icon: "success",
												 });
												 preIndicadorListPadre(0,'Indicadores');//modificar luego, dependiendo de la rama en la que se este
												 }else{
														alert("Hubo un errror en la inserción ( u.u)\n");
												 }
									 },
									 error: function (data) {
											 alert("Hubo un errror interno ( u.u)\n");
									 }
});
	 }else{
			 alert("Debe llenar los campos requeridos");
	 }

}
