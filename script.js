document.getElementById("pullout").innerHTML += "<span id='script_chat'><input type='button'value='Ocultar chat'style='font-size: 9px; margin: 3px 0px 3px 0px;'onclick='ocultar_chat()'/></span><table width='100%'><tr><td style='padding: 3px;'colspan='2'align='center'bgcolor='#ccc'>***CONFIGURACIÓN SCRIPT***</td></tr><tr><td style='padding: 3px;'>Apuesta base:</td><td style='padding: 3px;'><input type='text'id='script_apuesta_base'value='1'size='5'></td></tr><tr><td style='padding: 3px;'>Modo:</td><td style='padding: 3px;'><select name='script_modo'id='script_modo'><option value='1'>Solo simulación</option><option value='2'>Apuestas reales</option></select></td></tr><tr><td style='padding: 3px; vertical-align: top;'>Detener script tras una racha de:</td><td style='padding: 3px;'><select name='script_limite'id='script_limite'><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option><option value='11'selected>11</option><option value='12'>12</option><option value='13'>13</option><option value='14'>14</option><option value='15'>15</option><option value='16'>16</option></select><br/>rondas consecutivas perdidas.</td></tr><tr><td colspan='2'style='padding: 3px;'align='center'id='script_boton'><input type='button'value='START'style='background-color: green;'onclick='start()'/></td></tr><tr><td style='padding: 3px;'colspan='2'align='center'bgcolor='#ccc'>***ESTADO ACTUAL***</td></tr><tr><td style='padding: 3px; background-color: black;color: #31ff00;'colspan='2'align='center'id='script_estado'>Pausado...</td></tr><tr><td style='padding: 3px;'colspan='2'align='center'bgcolor='#ccc'>***ESTADISTICAS***</td></tr><tr><td style='padding: 3px;'colspan='2'align='center'><span id='script_h_0'></span><span id='script_h_1'></span><span id='script_h_2'></span><span id='script_h_3'></span><span id='script_h_4'></span><span id='script_h_5'></span><span id='script_h_6'></span><span id='script_h_7'></span><span id='script_h_8'></span><span id='script_h_9'></span></td></tr><tr><td colspan='2'align='center'><span id='script_porcent_red'></span><span id='script_porcent_green'></span><span id='script_porcent_black'></span></td></tr><tr><td style='padding: 3px;'>Inicio ejecución:</td><td style='padding: 3px;'><span style='color:red;'id='script_inicio_ejecucion'></span></td></tr><tr><td style='padding: 3px;'>Partidas jugadas:</td><td style='padding: 3px;'><span style='color:red;'id='script_partidas_jugadas'></span></td></tr><tr><td style='padding: 3px;'>Partidas ganadas:</td><td style='padding: 3px;'><span style='color:red;'id='script_partidas_ganadas'></span></td></tr><tr><td style='padding: 3px;'>Total ganado:</td><td style='padding: 3px;'><span style='color:red;'id='script_total_ganado'></span></td></tr><tr><td style='padding: 3px;'>Balance inicial:</td><td style='padding: 3px;'><span style='color:red;'id='script_balance_inicio'></span></td></tr><tr><td style='padding: 3px;'>Máxima racha rondas perdidas:</td><td style='padding: 3px;'><span style='color:red;'id='script_maxima_perdidas'></span></td></tr><tr><td style='padding: 3px;'>Racha actual rondas perdidas:</td><td style='padding: 3px;'><span style='color:red;'id='script_actual_perdidas'></span></td></tr><tr><td style='padding: 3px;'colspan='2'align='center'bgcolor='#ccc'>***EXTRAS***</td></tr><tr><td style='padding: 3px;'colspan='2'align='center'><a href='http://comuesp.com/foro/index.php?topic=1978.0'target='_blank'><img width='150px'src='http://comuesp.com/foro/Themes/MinDI/images/theme/logo.png'/></a></td></tr><tr><td style='padding: 3px; vertical-align: middle;'colspan='2'align='center'><a href='https://www.youtube.com/channel/UC9eM3jqq5IfxbGHbuRR_jRw'target='_blank'><img width='20px'height='20px'src='https://yt3.ggpht.com/-5jryTPB4kMw/AAAAAAAAAAI/AAAAAAAAAAA/Q5QT0szmxx0/s88-c-k-no-mo-rj-c0xffffff/photo.jpg'/>&nbsp;El mejor canal de CS:GO</a></td></tr><tr><td style='padding: 3px; vertical-align: middle;'colspan='2'align='center'><a href='http://steamcommunity.com/profiles/76561198036737153'target='_blank'><img width='20px'height='20px'src='http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/c7/c7c3177b114bc5ec77afcfb5bb44e2742c74db2d_full.jpg'/>&nbsp;Script creado por VR46</a></td></tr></table>";
var totalGanado = 0; var apuestaInicial; var modoSimulacion; var rondaLimitePerdidas;
var cambio_seguro; var apuestaActual; var winOrLose; var stop = 0; var peorRacha = 0;
var sumaPerdidas = 0; var partidasJugadas = 0; var ultimoEstado; var lastBetColor; var ultimoNumeroRoll;
var $balance = $("#balance_r"); var $textareaBet = $("#betAmount"); var $statusBar = $(".progress #banner");
var $redButton = $("#panel11-7-b .betButton"); var $blackButton = $("#panel8-14-b .betButton");
var historico = []; var betColor = ""; var cualApostar = 0; var porcentajes = []; var long_historico1 = 0;
var d = new Date();
function start() {
	var intervalos = setInterval(tick, 500);
	document.getElementById("script_boton").innerHTML = "<input type='button' value='STOP' style='background-color: red; color: #fff;' onclick='stop_script()'/>";
	document.getElementById("script_inicio_ejecucion").innerHTML = d.getDate() + "/" + d.getMonth() + " " + d.getHours() + "h."+ d.getMinutes() + "m.";
	document.getElementById("script_balance_inicio").innerHTML = parseInt($balance.text()) + " coins";
	stop = 0; apuestaInicial = document.getElementById("script_apuesta_base").value; modoSimulacion = document.getElementById("script_modo").value; rondaLimitePerdidas = document.getElementById("script_limite").value;
	switch(modoSimulacion) {
		case "1": modoSimulacion = true; break;
		case "2": modoSimulacion = false; break;
		default: modoSimulacion = true; break; }
	cambio_seguro = Math.ceil(rondaLimitePerdidas/2); apuestaActual = apuestaInicial;
	document.getElementById("script_apuesta_base").disabled = true; document.getElementById("script_modo").disabled = true; document.getElementById("script_limite").disabled = true;
}
function stop_script() { stop = 1; document.getElementById("script_boton").innerHTML = ""; document.getElementById("script_estado").innerHTML = "La ejecución del script ha sido detenida."; }
function tick() { if(stop!=1) { var a = obtenerEstado(); if (a !== ultimoEstado && "unknown" !== a) { switch (a) { case "Esperando al Rolling": apuesta(); break; } ultimoEstado = a, printInfo(); } } }
function obtenerEstado() { var a = $statusBar.text();
    if (hasSubString(a, "Rolling in")) return "Esperando al Rolling";
    if (hasSubString(a, "***ROLLING***")) return "Rolling...";
    if (hasSubString(a, "Rolled")) { return ultimoNumeroRoll = obtenerUltimoNumero(a); } return "unknown";
}
function obtenerUltimoNumero(t) { t = t.substr(7); return t.slice(0,-1); }
function obtenerColorNumero(r) { if(r==0){ return "green"; }else{ if(r<=7){ return "red"; }else{ return "black"; }}}
function hasSubString(a, b) { return a.indexOf(b) > -1 }
function printInfo() { if(stop!=1) {
		document.getElementById("script_total_ganado").innerHTML = totalGanado*apuestaInicial + " coins";
		document.getElementById("script_partidas_ganadas").innerHTML = totalGanado;
		document.getElementById("script_partidas_jugadas").innerHTML = partidasJugadas;
		document.getElementById("script_maxima_perdidas").innerHTML = peorRacha;
		document.getElementById("script_actual_perdidas").innerHTML = sumaPerdidas;
		if(isNaN(ultimoEstado)) { document.getElementById("script_estado").innerHTML += "<br/>" + ultimoEstado; } }
}
function apuesta() {
	if(stop!=1) { var long_historico = historico.length;
		if(long_historico == 10) { actualiza_pila();
			if(partidasJugadas==0) { apuestaActual = apuestaInicial;
			} else { 
				if(betColor!="") {
					if(obtenerColorNumero(ultimoNumeroRoll)==betColor) { winOrLose = "ganada"; } else { winOrLose = "perdida"; }
					switch(winOrLose) {
						case "ganada": apuestaActual = apuestaInicial; sumaPerdidas = 0; totalGanado++; break;
						case "perdida": apuestaActual = apuestaActual*2; sumaPerdidas++; break; } } }
			if(sumaPerdidas<cambio_seguro) {
				if(porcentajes["red"]<=1) { betColor = "red"; } else { if(porcentajes["black"]<=1) { betColor = "black"; } else {
					if(obtenerColorNumero(historico[9])!="green") { betColor = obtenerColorNumero(historico[9]); } else {
						if(obtenerColorNumero(historico[8])!="green") { betColor = obtenerColorNumero(historico[8]); } else {
							if(obtenerColorNumero(historico[7])!="green") { betColor = obtenerColorNumero(historico[7]); } else {
								betColor = "red"; } } } } } } else {
				if(sumaPerdidas<rondaLimitePerdidas) {
					if(porcentajes["red"]<=1) { betColor = "red"; } else { if(porcentajes["black"]<=1) { betColor = "black"; } else { betColor = ""; } } } else {
					stop=1; betColor=""; document.getElementById("script_estado").innerHTML = "Ejecución del script detenida! Se ha alcanzado el limite de partidas perdidas estblecido."; } }
			if(stop==0) { if(betColor!="") { partidasJugadas++; if(sumaPerdidas>peorRacha) { peorRacha=sumaPerdidas; }
					if(!modoSimulacion) { enviarApuesta(apuestaActual), setTimeout(placeBet, 50); }
					document.getElementById("script_estado").innerHTML = "Apostando: " + apuestaActual + " coin -> Color: " + betColor; } else { document.getElementById("script_estado").innerHTML = "Ronda saltada sin apostar.<br/><small><i>El script esta analizando la tendencia y esperando un mejor momento para apostar: " + apuestaActual + " coins.</i></small><br/>Si no quieres esperar, puedes forzar la apuesta (" + apuestaActual + " coins) al <a href='#' onclick='apuestaManual(1)'>ROJO</a> o <a href='#' onclick='apuestaManual(8)'>NEGRO</a>"; } }
		} else { if(ultimoNumeroRoll!=null) { long_historico1 = long_historico + 1;
				switch(long_historico) {
					case 0: historico[0] = ultimoNumeroRoll; document.getElementById("script_estado").innerHTML = "Recopilando historico de ruleta:<br/><b>" + long_historico1 + "/10</b> numeros almacenados.<br/><i>No se realizará ningúna apuesta hasta que este proceso finalice.</i>"; document.getElementById("script_h_0").innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[0]) + "; color: #fff;'>" + historico[0] + "</b>]"; break;
					case 1: historico[1] = ultimoNumeroRoll; document.getElementById("script_estado").innerHTML = "Recopilando historico de ruleta:<br/><b>" + long_historico1 + "/10</b> numeros almacenados.<br/><i>No se realizará ningúna apuesta hasta que este proceso finalice.</i>"; document.getElementById("script_h_1").innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[1]) + "; color: #fff;'>" + historico[1] + "</b>]"; break;
					case 2: historico[2] = ultimoNumeroRoll; document.getElementById("script_estado").innerHTML = "Recopilando historico de ruleta:<br/><b>" + long_historico1 + "/10</b> numeros almacenados.<br/><i>No se realizará ningúna apuesta hasta que este proceso finalice.</i>"; document.getElementById("script_h_2").innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[2]) + "; color: #fff;'>" + historico[2] + "</b>]"; break;
					case 3: historico[3] = ultimoNumeroRoll; document.getElementById("script_estado").innerHTML = "Recopilando historico de ruleta:<br/><b>" + long_historico1 + "/10</b> numeros almacenados.<br/><i>No se realizará ningúna apuesta hasta que este proceso finalice.</i>"; document.getElementById("script_h_3").innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[3]) + "; color: #fff;'>" + historico[3] + "</b>]"; break;
					case 4: historico[4] = ultimoNumeroRoll; document.getElementById("script_estado").innerHTML = "Recopilando historico de ruleta:<br/><b>" + long_historico1 + "/10</b> numeros almacenados.<br/><i>No se realizará ningúna apuesta hasta que este proceso finalice.</i>"; document.getElementById("script_h_4").innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[4]) + "; color: #fff;'>" + historico[4] + "</b>]"; break;
					case 5: historico[5] = ultimoNumeroRoll; document.getElementById("script_estado").innerHTML = "Recopilando historico de ruleta:<br/><b>" + long_historico1 + "/10</b> numeros almacenados.<br/><i>No se realizará ningúna apuesta hasta que este proceso finalice.</i>"; document.getElementById("script_h_5").innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[5]) + "; color: #fff;'>" + historico[5] + "</b>]"; break;
					case 6: historico[6] = ultimoNumeroRoll; document.getElementById("script_estado").innerHTML = "Recopilando historico de ruleta:<br/><b>" + long_historico1 + "/10</b> numeros almacenados.<br/><i>No se realizará ningúna apuesta hasta que este proceso finalice.</i>"; document.getElementById("script_h_6").innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[6]) + "; color: #fff;'>" + historico[6] + "</b>]"; break;
					case 7: historico[7] = ultimoNumeroRoll; document.getElementById("script_estado").innerHTML = "Recopilando historico de ruleta:<br/><b>" + long_historico1 + "/10</b> numeros almacenados.<br/><i>No se realizará ningúna apuesta hasta que este proceso finalice.</i>"; document.getElementById("script_h_7").innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[7]) + "; color: #fff;'>" + historico[7] + "</b>]"; break;
					case 8: historico[8] = ultimoNumeroRoll; document.getElementById("script_estado").innerHTML = "Recopilando historico de ruleta:<br/><b>" + long_historico1 + "/10</b> numeros almacenados.<br/><i>No se realizará ningúna apuesta hasta que este proceso finalice.</i>"; document.getElementById("script_h_8").innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[8]) + "; color: #fff;'>" + historico[8] + "</b>]"; break;
					case 9: historico[9] = ultimoNumeroRoll; document.getElementById("script_estado").innerHTML = "Recopilando historico de ruleta:<br/><b>" + long_historico1 + "/10</b> numeros almacenados.<br/><i>No se realizará ningúna apuesta hasta que este proceso finalice.</i>"; document.getElementById("script_h_9").innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[9]) + "; color: #fff;'>" + historico[9] + "</b>]"; break; } } } }
}
function actualiza_pila() {
	var aux; var aux2; porcentajes["red"] = 0; porcentajes["green"] = 0; porcentajes["black"] = 0;
	for(aux=0; aux<10; aux++) { if(aux==9) { historico[9]=ultimoNumeroRoll; porcentajes[obtenerColorNumero(historico[9])]++; document.getElementById("script_h_"+aux).innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[9]) + "; color: #fff;'>" + historico[9] + "</b>]"; } else { aux2 = aux+1; historico[aux]=historico[aux2]; porcentajes[obtenerColorNumero(historico[aux])]++; document.getElementById("script_h_"+aux).innerHTML = "[<b style='background-color: " + obtenerColorNumero(historico[aux]) + "; color: #fff;'>" + historico[aux] + "</b>]"; } }
	document.getElementById("script_porcent_black").innerHTML = "<b style='padding: 3px; color: black;'>" + porcentajes["black"] + "0%<b>";
	document.getElementById("script_porcent_green").innerHTML = "<b style='padding: 3px; color: green;'>" + porcentajes["green"] + "0%<b>";
	document.getElementById("script_porcent_red").innerHTML = "<b style='padding: 3px; color: red;'>" + porcentajes["red"] + "0%<b>";
}
function enviarApuesta(a) { if(stop!=1) { $textareaBet.val(a); } }
function placeBet() { if(stop!=1) { return "red" === betColor ? ($redButton.click(), void(lastBetColor = "red")) : ($blackButton.click(), void(lastBetColor = "black")); } }
function obtenerBalance() { return parseInt($balance.text()); }
function apuestaManual(m) {
	if(m==1) { betColor = "red"; partidasJugadas++; if(modoSimulacion==false) {	enviarApuesta(apuestaActual), setTimeout(placeBet, 50); }
		document.getElementById("script_estado").innerHTML = "Apostando (manualmente): " + apuestaActual + " coin -> Color: " + betColor;
		document.getElementById("script_partidas_jugadas").innerHTML = partidasJugadas; } else {
		betColor = "black"; partidasJugadas++;
		if(modoSimulacion==false) {	enviarApuesta(apuestaActual), setTimeout(placeBet, 50); }
		document.getElementById("script_estado").innerHTML = "Apostando (manualmente): " + apuestaActual + " coin -> Color: " + betColor;
		document.getElementById("script_partidas_jugadas").innerHTML = partidasJugadas; }
}
function ocultar_chat() { $('#tab1').hide(); document.getElementById("script_chat").innerHTML = "<input type='button' value='Mostrar chat' style='font-size: 9px; margin: 3px 0px 3px 0px;' onclick='mostrar_chat()'/>"; }
function mostrar_chat() { $('#tab1').show(); document.getElementById("script_chat").innerHTML = "<input type='button' value='Ocultar chat' style='font-size: 9px; margin: 3px 0px 3px 0px;' onclick='ocultar_chat()'/>"; }
