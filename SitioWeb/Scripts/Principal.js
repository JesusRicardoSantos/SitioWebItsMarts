// Initialize the platform object:
var platform = new H.service.Platform({
    'app_id': '{YOUR_APP_ID}',
    'app_code': '{YOUR_APP_CODE}'
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.normal.map,
    {
        zoom: 9,
        center: { lng: -99.154209, lat: 19.400720 }
    });

// Instantiate a circle object (using the default style):
var circle = new H.map.Circle({ lat: -99.154209, lng: 19.400720 }, 8000);

// Add the circle to the map:
map.addObject(circle);

//Consultar
function traerDatoUsuario(URL, cliente_sap) {
    $.ajax({
        type: "POST",
        url: "http://mywebsiteits.gear.host/Home/consultaDatoUsuario",
        data: { intId: cliente_sap },
        success: function (response) {
            llenarTextoUsuario(response);
        }
    });
}
//Llenar campos
function llenarTextoUsuario(response) {
    var arrayDeCadenas = response.split(",");
    
    var date = new Date(arrayDeCadenas[5]);
    var setDate = date.toISOString().slice(0, 10);

    var element = document.getElementById('selectEdo');
    element.value = arrayDeCadenas[13];
    
    $('input[name=txtNombre]').val(arrayDeCadenas[0]);
    $('input[name=txtA_paterno]').val(arrayDeCadenas[1]);
    $('input[name=txtA_materno]').val(arrayDeCadenas[2]);
    $('input[name=txtTelefono]').val(arrayDeCadenas[3]);
    $('input[name=txtCliente_sap]').val(arrayDeCadenas[4]);

    document.getElementById('txtCliente_sap').disabled = true;
    document.getElementById('txtFecha_creacion').value = setDate; //"2019-02-01";//yy-mm-dd
    document.getElementById('txtFecha_creacion').disabled = true;

    $('input[name=txtNombre_fiscal]').val(arrayDeCadenas[6]);
    $('input[name=txtRfc]').val(arrayDeCadenas[7]);
    $('input[name=txtContacto]').val(arrayDeCadenas[8]);
    $('input[name=txtlogitud]').val(arrayDeCadenas[9]);
    $('input[name=txtlatitud]').val(arrayDeCadenas[10]);
    $('input[name=txtReferencia]').val(arrayDeCadenas[12]);

    var lon = parseFloat(arrayDeCadenas[9]);
    var lati = parseFloat(arrayDeCadenas[10]);

    document.getElementById('mapaHere').innerHTML = "<div style='width: auto; height: 400px; margin: 10px;' id='mapContainer'></div>'";

    map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.normal.map,
        {
            zoom: 9,
            center: { lng: lon, lat: lati }
        });

    // Instantiate a circle object (using the default style):
    circle = new H.map.Circle({ lat: lati, lng: lon }, 8000);

    // Add the circle to the map:
    map.addObject(circle);
}

//editar usuario
function editarUsuario() {
    var eNombre = document.getElementById("txtNombre").value;
    var eA_paterno = document.getElementById("txtA_paterno").value;
    var eA_materno = document.getElementById("txtA_materno").value;
    var eTelefono = document.getElementById("txtTelefono").value;
    var eCliente_sap = document.getElementById("txtCliente_sap").value;
    var eFecha_creacion = document.getElementById("txtFecha_creacion").value;
    var eNombre_fiscal = document.getElementById("txtNombre_fiscal").value;
    var eRfc = document.getElementById("txtRfc").value;
    var eContacto = document.getElementById("txtContacto").value;

    var select = document.getElementById("selectEdo");
    var eCedild = select.options[select.selectedIndex].text;
    

    var eLongitud = document.getElementById("txtlongitud").value;
    var eLatitud = document.getElementById("txtlatitud").value;
    var eContrasena = "1234";
    var eReferencia = document.getElementById("txtReferencia").value;
    var eFoto_local = "";

    if (eNombre == "") {
        alert("Inserte nombre");
        $("#txtNombre").focus();
    } else if (eA_paterno == "") {
        alert("Inserte A_paterno");
        $("#txtA_paterno").focus();
    } else if (eA_materno == "") {
        alert("Inserte A_materno");
        $("#txtA_materno").focus();
    } else if (eNombre_fiscal == "") {
        alert("Inserte Nombre_fiscal");
        $("#txtNombre_fiscal").focus();
    } else if (eRfc == "") {
        alert("Inserte RFC");
        $("#txtRfc").focus();
    } else {

        var data = new Object();
        data["Nombre"] = eNombre;
        data["A_paterno"] = eA_paterno;
        data["A_materno"] = eA_materno;
        data["Telefono"] = eTelefono;
        data["Cliente_sap"] = eCliente_sap;
        data["Fecha_creacion"] = eFecha_creacion;
        data["Nombre_fiscal"] = eNombre_fiscal;
        data["Rfc"] = eRfc;
        data["Contacto"] = eContacto;
        data["Cedild"] = eCedild;
        data["Longitud"] = eLongitud;
        data["Latitud"] = eLatitud;
        data["Contrasena"] = eContrasena;
        data["Referencia"] = eReferencia;
        data["Foto_local"] = eFoto_local;


        $.ajax({
            type: "POST",
            url: "http://mywebsiteits.gear.host/Home/editarUsuario",
            data: { usuarioData: data },
            success: function (response) {
                mensajesWS(response);
            }
        });
    }
}
//mensajes de respuesta
function mensajesWS(response) {
    switch (parseInt(response)) {
        case 0: //->OK
            {
                alert("Proceso satisfactorio! :)");
                document.getElementById('txtCliente_sap').disabled = false;
                document.getElementById('txtFecha_creacion').disabled = false;

                document.getElementById("myForm").reset();

                //Restablecemos toda la pagina
                document.getElementById('mapaHere').innerHTML = "<div style='width: auto; height: 400px; margin: 10px;' id='mapContainer'></div>'";

                map = new H.Map(
                    document.getElementById('mapContainer'),
                    maptypes.normal.map,
                    {
                        zoom: 9,
                        center: { lng: -99.154209, lat: 19.400720 }
                    });

                // Instantiate a circle object (using the default style):
                circle = new H.map.Circle({ lng: -99.154209, lat: 19.400720 }, 8000);

                // Add the circle to the map:
                map.addObject(circle);
            }
            break;
        case 1: //-> Id cliente repetido
            {
                alert("Id cliente repetido. Intente con otro");
            }
            break;
        case 2: //Nombre fiscal repetido
            {
                alert("Nombre fiscal repetido. Intente con otro");
            }
            break;
        case 3: // RFC repetido
            {
                alert("RFC repetido. Intente con otro");
            }
            break;
        case 4: // No existe este cliente
            {
                alert("No existe este cliente");
            }
            break;
        case 5: // Error en el WS
            {
                alert("Error en el WS ");
            }
            break;
        case 400: //Excepcion no controlada
            {
                alert("Excepcion no controlada ");
            }
            break;
    }
}

//crear usuario
function crearCuenta() {
    var eNombre = document.getElementById("txtNombre").value;
    var eA_paterno = document.getElementById("txtA_paterno").value;
    var eA_materno = document.getElementById("txtA_materno").value;
    var eTelefono = document.getElementById("txtTelefono").value;
    var eCliente_sap = document.getElementById("txtCliente_sap").value;
    var eFecha_creacion = document.getElementById("txtFecha_creacion").value;
    var eNombre_fiscal = document.getElementById("txtNombre_fiscal").value;
    var eRfc = document.getElementById("txtRfc").value;
    var eContacto = document.getElementById("txtContacto").value;

    var select = document.getElementById("selectEdo");
    var eCedild = select.options[select.selectedIndex].text;


    var eLongitud = document.getElementById("txtlongitud").value;
    var eLatitud = document.getElementById("txtlatitud").value;
    var eContrasena = "1234";
    var eReferencia = document.getElementById("txtReferencia").value;
    var eFoto_local = "";

    if (eNombre == "") {
        alert("Inserte nombre");
        $("#txtNombre").focus();
    } else if (eA_paterno == "") {
        alert("Inserte A_paterno");
        $("#txtA_paterno").focus();
    } else if (eA_materno == "") {
        alert("Inserte A_materno");
        $("#txtA_materno").focus();
    } else if (eNombre_fiscal == "") {
        alert("Inserte Nombre_fiscal");
        $("#txtNombre_fiscal").focus();
    } else if (eRfc == "") {
        alert("Inserte RFC");
        $("#txtRfc").focus();
    } else if (eCliente_sap <= 0) {
        alert("Agrege otro codigo para Cliente_sap");
        $("#txtCliente_sap").focus();
    } else {

        var data = new Object();
        data["Nombre"] = eNombre;
        data["A_paterno"] = eA_paterno;
        data["A_materno"] = eA_materno;
        data["Telefono"] = eTelefono;
        data["Cliente_sap"] = eCliente_sap;
        data["Fecha_creacion"] = eFecha_creacion;
        data["Nombre_fiscal"] = eNombre_fiscal;
        data["Rfc"] = eRfc;
        data["Contacto"] = eContacto;
        data["Cedild"] = eCedild;
        data["Longitud"] = eLongitud;
        data["Latitud"] = eLatitud;
        data["Contrasena"] = eContrasena;
        data["Referencia"] = eReferencia;
        data["Foto_local"] = eFoto_local;


        $.ajax({
            type: "POST",
            url: "http://mywebsiteits.gear.host/Home/agregarUsuario",
            data: { usuarioData: data },
            success: function (response) {
                mensajesWS(response);
            }
        });
    }
}

//Probar
function eliminarUsuario(cliente_sap) {
    $.ajax({
        type: "POST",
        url: "http://mywebsiteits.gear.host/Home/eliminarUsuario",
        data: { intId: cliente_sap },
        success: function (response) {
            mensajesWS(response);
            if (parseInt(response) == 0) {
                $("#trUsuario_" + cliente_sap).remove();
            }
        }
    });
}

