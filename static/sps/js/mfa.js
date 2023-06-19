
	var waitingDialog = waitingDialog || (function ($) {
	    'use strict';

	// Creating modal dialog's DOM
	var $dialog = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
		'<div class="modal-dialog modal-m">' +
		'<div class="modal-content">' +
			'<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
			'<div class="modal-body">' +
				'<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
			'</div>' +
		'</div></div></div>');

	return {
		/**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
		show: function (message, options) {
			// Assigning defaults
			if (typeof options === 'undefined') {
				options = {};
			}
			if (typeof message === 'undefined') {
				message = 'Loading';
			}
			var settings = $.extend({
				dialogSize: 'm',
				progressType: '',
				onHide: null // This callback runs after the dialog was hidden
			}, options);

			// Configuring dialog
			$dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
			$dialog.find('.progress-bar').attr('class', 'progress-bar');
			if (settings.progressType) {
				$dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
			}
			$dialog.find('h3').text(message);
			// Adding callbacks
			if (typeof settings.onHide === 'function') {
				$dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
					settings.onHide.call($dialog);
				});
			}
			// Opening dialog
			$dialog.modal();
		},
		/**
		 * Closes dialog
		 */
		hide: function () {
			$dialog.modal('hide');
		}
	};

})(jQuery);

	function enterKey() {
		$(document).keyup(function(event) {
			if (event.keyCode == 13) {
			$("#submit").click();
			}
		});
	}
	
	function clearModal() {
		$('#modal-title').empty();
		$('#modal-body').empty();
		$('#latency').empty();
		document.getElementById("modalDialog").setAttribute("class", "modal-dialog");

	}

	function GetURLParameter(sParam) {
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) {
				return sParameterName[1];
				}
			}
	}

	function randomString(len, charSet) {
	    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	    var randomString = '';
	    for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz,randomPoz+1);
	    }
	return randomString;
	}

	function rememberMe() {
		// Get the checkbox
  		var checkBox = document.getElementById("rememberMeCheck");

	  		if (checkBox.checked == true){
	    			var remember = "true";
	  		} else {
	    			var remember = "false";
	  		}
		return remember;

		}

	function clearForm() {
		$('#titleMFA h3').empty();
		$('#description').empty();
		$('#inputDescription').empty();
		$('#inputLabel').empty();
		$('#inputCol').empty();
		$('#msg').empty();
	}

	function mfaAuth() {
		clearForm();
		var providerMessage = sessionStorage.getItem('providerMessage');
		var message = sessionStorage.getItem('infoMessage');
		document.getElementById("formMfaAuth").setAttribute("style", "display:none;");
		$('#description').append(providerMessage);
		$('#msg').append(message);
		$('#inputCol').append('<input name="input" title="inserisci la tua password" placeholder="Password" type="password" id="input" class="form-control" value="">');
		document.getElementById("submit").setAttribute("onclick", "startMFA();");
		document.getElementById("formMfaAuth").setAttribute("style", "");
		sessionStorage.removeItem('infoMessage');
		
		$('#input').focus();
		
		enterKey();
		
	}
	
	function mfaChallenge() {
		$('#description').empty();
		$('#msg').empty();
		$('#inputCol').empty();
		$('#inputDescription').empty();
		
		var providerMessage = sessionStorage.getItem('providerMessage');
		var message = sessionStorage.getItem('infoMessage');
		document.getElementById("formMfaAuth").setAttribute("style", "display:none;");	
		document.getElementById("uidMfa").setAttribute("style", "display:none;");
		document.getElementById("inputMfa").setAttribute("style", "");
		document.getElementById("submitMfa").setAttribute("style", "");
		$('#description').append(providerMessage);
		$('#msg').append(message);
		$('#inputCol').append('<input name="input" title="inserisci il pin inviato tramite sms" placeholder="Pin" id="input" class="form-control" value="">');
		document.getElementById("submit").setAttribute("onclick", "startMFAChallenge();");
		document.getElementById("formMfaAuth").setAttribute("style", "");
		sessionStorage.removeItem('infoMessage');
		$('#input').focus();
		
		enterKey();
		
	}

	function levelMsg() {
		clearForm();
		var fingerPrintState = sessionStorage.getItem('fingerPrintState');
		if (fingerPrintState == "true"){
				document.getElementById("deleteFingerPrintRow").setAttribute("style", "");
			}
		document.getElementById("uidMfa").setAttribute("style", "display:none;");
		document.getElementById("inputMfa").setAttribute("style", "display:none;");
		document.getElementById("reset").setAttribute("style", "display:none;");
		document.getElementById("submitMfa").setAttribute("style", "");
		document.getElementById("submit").setAttribute("onclick", "redirectLvl10();");
		$('#msg').append("Il livello di autenticazione e' valido per MFA");
		document.getElementById("formMfaAuth").setAttribute("style", "");
		waitingDialog.hide();
		enterKey();
		
	}

	function levelReqMsg() {
		clearForm();
		var fingerPrintState = sessionStorage.getItem('fingerPrintState');
		if (fingerPrintState == "true"){
				document.getElementById("deleteFingerPrintRow").setAttribute("style", "");
			}
		document.getElementById("uidMfa").setAttribute("style", "display:none;");
		document.getElementById("inputMfa").setAttribute("style", "display:none;");
		document.getElementById("reset").setAttribute("style", "display:none;");
		document.getElementById("submitMfa").setAttribute("style", "display:none;");
		$('#msg').append("Per poter utilizzare l'applicazione richiesta e' necessario utilizzare MFA microsoft o Google Authenticator. ");
		document.getElementById("formMfaAuth").setAttribute("style", "");
		waitingDialog.hide();
		enterKey();
		
	}
	
	function notEnabled() {
		$('#description').empty();
		$('#msg').empty();
		var message = sessionStorage.getItem('infoMessage');
		document.getElementById("uidMfa").setAttribute("style", "display:none;");
		document.getElementById("inputMfa").setAttribute("style", "display:none;");
		document.getElementById("submitMfa").setAttribute("style", "display:none;");
		$('#msg').append(message);
		sessionStorage.setItem('typeAuth', "NotEnabled");
		document.getElementById("formMfaAuth").setAttribute("style", "");
		sessionStorage.removeItem('infoMessage');
		
		enterKey();
	}

	function resultFalse() {
		$('#description').empty();
		$('#msg').empty();
		providerMessage = sessionStorage.getItem('providerMessage');
		message = sessionStorage.getItem('infoMessage');
		document.getElementById("inputMfa").setAttribute("style", "");
		document.getElementById("submitMfa").setAttribute("style", "");
		$('#msg').append(message);
		$('#description').append(providerMessage);
		sessionStorage.removeItem('infoMessage');
		$('#input').focus(); 
		
		enterKey();
	}
	
	function resetForm() {
		sessionStorage.removeItem('uid');
		sessionStorage.removeItem('infoMessage');
		sessionStorage.removeItem('providerMessage');
		sessionStorage.removeItem('state');
		sessionStorage.removeItem('result');
		sessionStorage.removeItem('SessionAuth');
		sessionStorage.removeItem('typeAuth');
		
		window.location.replace("/api/mfa/login");
	}

	function sessionType() {
		
		$('#description').empty();
		$('#msg').empty();
		var sessionAuth = sessionStorage.getItem('SessionAuth');
		
		if (sessionAuth == "BASIC") {
			uid = sessionStorage.getItem('uid');
			providerMessage = sessionStorage.getItem('providerMessage');
			message = sessionStorage.getItem('infoMessage');
			fingerPrintState = sessionStorage.getItem('fingerPrintState');
			document.getElementById("uidMfa").setAttribute("style", "display:none;");
			document.getElementById("inputMfa").setAttribute("style", "display:none;");
			document.getElementById("submitMfa").setAttribute("style", "");
			document.getElementById("formMfaAuth").setAttribute("style", "");
			if (fingerPrintState == "true"){
				document.getElementById("rememberMeCheckRow").setAttribute("style", "");
			}
			$('#msg').append(message);
			$('#description').append(providerMessage);
			sessionStorage.removeItem('infoMessage');
			
			enterKey();
			
		}
		else if (sessionAuth = "SMSESSION") {
			providerMessage = sessionStorage.getItem('providerMessage');
			message = sessionStorage.getItem('infoMessage');
			uid = sessionStorage.getItem('uid');
			fingerPrintState = sessionStorage.getItem('fingerPrintState');
			document.getElementById("uidMfa").setAttribute("style", "display:none;");
			document.getElementById("inputMfa").setAttribute("style", "display:none;");
			document.getElementById("submit").setAttribute("onclick", "startAuthenticate();");
			document.getElementById("submitMfa").setAttribute("style", "");
			document.getElementById("formMfaAuth").setAttribute("style", "");
			if (fingerPrintState == "true"){
				document.getElementById("rememberMeCheckRow").setAttribute("style", "");
			}
			$('#uidCol').append('<input name="uid" id="uid" title="inserisci la tua password" placeholder="Password" class="form-control" value="'+ uid +'">' + uid);
			$('#msg').append(message);
			$('#description').append(providerMessage);
			sessionStorage.removeItem('infoMessage');
			
			enterKey();
			
		}
		else {
	
		}	
	}

	function fingerPrintMessage() {
		clearForm();
		var message = sessionStorage.getItem('infoMessage');
		document.getElementById("uidMfa").setAttribute("style", "display:none;");
		document.getElementById("inputMfa").setAttribute("style", "display:none;");
		document.getElementById("reset").setAttribute("style", "display:none;");
		document.getElementById("deleteFingerPrint").setAttribute("style", "display:none;");
		document.getElementById("submitMfa").setAttribute("style", "");
		document.getElementById("submit").setAttribute("onclick", "redirectLvl10();");
		$('#msg').append(message);
		document.getElementById("formMfaAuth").setAttribute("style", "");
		enterKey();
		
	}
	function redirectLvl10() {
		var target = sessionStorage.getItem('TARGET');
		sessionStorage.removeItem('TARGET');
		sessionStorage.removeItem('typeAuth');
		sessionStorage.removeItem('fingerPrint');
		sessionStorage.removeItem('infoMessage');
		window.location.replace(target);
	}

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=.inail.it;path=/"
	}

	

	function startInfo() {
		
			

		var redirect = GetURLParameter('Redirect');
		var levelReq = GetURLParameter('LevelReq');
		
		if (levelReq == null || levelReq == undefined) {
			sessionStorage.setItem('levelReq', "MFAL8");
		}
		else {
			sessionStorage.setItem('levelReq', levelReq);
		}		
		result = sessionStorage.getItem('result');
		typeAuth = sessionStorage.getItem('typeAuth');
		target = GetURLParameter('TARGET');
		
		document.cookie = "SMSESSION_L10=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.inail.it; path=/;";
		document.cookie = "MFAToken_L10=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.inail.it; path=/;";
		document.cookie = "MFATokenDisp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.inail.it; path=/;";

		if (redirect !== undefined && redirect !== null ) {
			waitingDialog.show('Attendere reindirizzamento');
			sessionStorage.removeItem('uid');
			sessionStorage.removeItem('infoMessage');
			sessionStorage.removeItem('providerMessage');
			sessionStorage.removeItem('providerName');
			sessionStorage.removeItem('state');
			sessionStorage.removeItem('result');
			sessionStorage.removeItem('SessionAuth');
			sessionStorage.removeItem('typeAuth');
			var redirect = GetURLParameter('Redirect');
			redirect_dec = decodeURIComponent(redirect);
			window.location.replace(redirect_dec);
			
		}
		
		else {
			
			if (target == undefined) {
				target = "https://collportale.inail.it/cs/internet/home.html";
				sessionStorage.setItem('TARGET', target);
			}
			
			else {
				target_dec = decodeURIComponent(target);
				
				target = target_dec.replace(/-SM-/, "");
				sessionStorage.setItem('TARGET', target);
			}

			
			
			if (result != "false" ) {
				
				verifyMFA();
			}

			else if (typeAuth == "MFAChallenge") {
				
				mfaChallenge();
			}
			else {
				
				verifyuid();
			}
	
		}

		

	}


	function verifyMFA() {
		waitingDialog.show('Verifica Sessione');
		var fingerprint = sessionStorage.getItem('fingerPrint');
		var levelReq = sessionStorage.getItem('levelReq');
		$.ajax({	
	    		url: 'https://collportale.inail.it/api/mfa/verify',
	    		dataType: 'json',
	    		type: 'GET',
	    		contentType: 'application/json',
			xhrFields: {
       				withCredentials: false
   			},
   			crossDomain: true,
			headers: {
				"client_id": "ClientMFA",
				"X-Inail-DATA": fingerprint
		    	},
	    		data: {},
			success: function(data){
				
				var formattedData = JSON.stringify(data, null, '\t');		
				var d = $.parseJSON(formattedData);
				var result = d['result'];
				var uid = d['uid'];
				var fingerPrintState = d['fingerPrintState'];
				var authLevel = d['level'];
				sessionStorage.setItem('uid', uid);
				sessionStorage.setItem('fingerPrintState', fingerPrintState);

				if (result == "false" || authLevel != levelReq) {
	
					if (uid == "null") {
						sessionStorage.removeItem('providerMessage');
						sessionStorage.removeItem('providerName');	
						sessionStorage.removeItem('infoMessage');
						waitingDialog.hide();
						verifyuid();
					}
					else {
						document.getElementById("menusecondario").setAttribute("style", "");
						$('#utente-loggato-nome').append(uid);
						
						if (fingerPrintState == "false") {
							canAuthenticate();
						}
						if (fingerPrintState == "true") {
							fingerPrint('C');
						}
					}
				}
				//else if (levelReq > authLevel){
					//levelReqMsg();
				//}
				
				else { 
					var smsession = d['SMSESSION'];
					if (smsession != undefined) {
						var mfatoken = d['MFAToken'];
						setCookie("SMSESSION_L10",smsession,"1");
						setCookie("MFAToken_L10",mfatoken,"1");
						target = sessionStorage.getItem('TARGET');
						sessionStorage.setItem('result', result);
						target_enc = encodeURIComponent(target);
						waitingDialog.hide();
						window.location.replace("/api/mfa/login?Redirect=" + target_enc +"");
						
					}
					else {
						
						levelMsg();
						
					}
				}	
				
			},
			error: function(data){
				
				waitingDialog.hide();
			}
		});

	};
	
	function verifyuid() {
			var uid = sessionStorage.getItem('uid');
			var sessionAuth = sessionStorage.getItem('SessionAuth');
			
			if ( uid == "null" || uid == undefined ) {
				fingerPrintState = sessionStorage.getItem('fingerPrintState');
				$('#uidCol').append('<input name="uid" id="uid" title="inserisci il tuo nome utente" placeholder="Nome utente" size="10" class="form-control" value="">');
				document.getElementById("uidMfa").setAttribute("style", "");
				if (fingerPrintState == "true") {
					document.getElementById("rememberMeCheckRow").setAttribute("style", "");
				}
				mfaAuth();
			}
			else {
				if (sessionAuth == "BASIC") {
					fingerPrintState = sessionStorage.getItem('fingerPrintState');
					$('#user').append(uid);
					$('#uidCol').append('<input name="uid" id="uid" title="inserisci il tuo nome utente" placeholder="Nome utente" size="10" class="form-control" value="'+ uid +'">' + uid);
					if (fingerPrintState == "true") {
						document.getElementById("rememberMeCheckRow").setAttribute("style", "");
					}
					mfaAuth();

				}
				
				else if (sessionAuth == "SMSESSION") {
					
					sessionType();
				}
				else {
			
				}
				
			}
		}

	function fingerPrint(operation) {
		
		var uid = $('#uid').val();
		var password = $('#input').val();
		
		var postInput = {"uid": uid, "Password": password, "operation": operation}
		var fingerprint = sessionStorage.getItem('fingerPrint');
		
		$.ajax({	
	    		url: 'https://collportale.inail.it/api/mfa/fingerPrint',
	    		dataType: 'json',
	    		type: 'POST',
	    		contentType: 'application/json',
			xhrFields: {
       				withCredentials: false
   			},
   			crossDomain: true,
			headers: {
				"client_id": "ClientMFA",
				"X-Inail-DATA": fingerprint
		    	},
	    		data: JSON.stringify( postInput ),
			success: function(data){
				
				var formattedData = JSON.stringify(data, null, '\t');		
				var d = $.parseJSON(formattedData);
				var result = d['result'];
				var smsession = d['SMSESSION'];
				var operation = d['operation'];
				

				if (smsession != undefined) {
					var mfatoken = d['MFAToken'];
					setCookie("SMSESSION_L10",smsession,"1");
					setCookie("MFAToken_L10",mfatoken,"1");
					target = sessionStorage.getItem('TARGET');
					sessionStorage.setItem('result', result);
					target_enc = encodeURIComponent(target);
					waitingDialog.hide();
					window.location.replace("/api/mfa/login?Redirect=" + target_enc +"");
					
				}
				else if (operation == 'delete') {
					var message = d['infoMessage'];
						sessionStorage.setItem('infoMessage', message);
						fingerPrintMessage();
				}
				else {
					if (uid == null| uid == undefined) {
														
						canAuthenticate();
						
					}
					else if (uid != null| uid != undefined ){
						
						canAuthenticate2();
						
					}
				}
				
			},
			error: function(data){
				
				waitingDialog.hide();
			}
		});

	};

	function canAuthenticate() {
		
			var uid = sessionStorage.getItem('uid');
			var levelReq = sessionStorage.getItem('levelReq');
			var postInput = {"uid": uid, "MFALevelReq":  levelReq}
			$.ajax({	
		    		url: 'https://collportale.inail.it/api/mfa/canauthenticate',
		    		dataType: 'json',
		    		type: 'POST',
		    		contentType: 'application/json',
				xhrFields: {
	       				withCredentials: false
	   			},
	   			crossDomain: true,
				headers: {
					"client_id": "ClientMFA"
			    	},
		    		data: JSON.stringify( postInput ),
				success: function(data){
					
					var formattedData = JSON.stringify(data, null, '\t');
					
					var d = $.parseJSON(formattedData);
					var status = d['status'];
					var result = d['result'];
					var message = d['infoMessage'];
					var providerMessage = d['providerMessage'];
					var providerName = d['providerName'];
					var sessionAuth = d['authType'];
					var smsession = d['SMSESSION'];
					var enableMessage = d['enableMessage'];

					if (result == "true") {
						
						if (smsession != undefined) {
							var mfatoken = d['MFAToken'];
							setCookie("SMSESSION_L10",smsession,"1");
							target = sessionStorage.getItem('TARGET');
							sessionStorage.setItem('result', result);
							target_enc = encodeURIComponent(target);
							waitingDialog.hide();
							window.location.replace("/api/mfa/login?Redirect=" + target_enc +"");
							
						}
						else if (enableMessage == "false"){
							var uid = sessionStorage.getItem('uid');
							sessionStorage.setItem('providerMessage', providerMessage);
							sessionStorage.setItem('providerName', providerName);
							sessionStorage.setItem('infoMessage', message);
							sessionStorage.setItem('SessionAuth', sessionAuth);
							$('#uidCol').append('<input name="uid" id="uid" title="inserisci il tuo nome utente" placeholder="Nome utente" size="10" class="form-control" value="'+ uid +'">' + uid);
							startMFA();
						}
						else {
							sessionStorage.setItem('providerMessage', providerMessage);
							sessionStorage.setItem('providerName', providerName);
							sessionStorage.setItem('infoMessage', message);
							sessionStorage.setItem('SessionAuth', sessionAuth);
							waitingDialog.hide();
							verifyuid();
						}
					}
					else if (result == "NotEnable"){
						sessionStorage.setItem('infoMessage', message);
						waitingDialog.hide();						
						notEnabled();
						
					}
					else if (result == "LevelNotValid"){
						sessionStorage.setItem('infoMessage', message);
						waitingDialog.hide();						
						notEnabled();
						
					}	
					else  {
						waitingDialog.hide();
						levelMsg();
						
					}	
					
				},
				error: function(data){
						waitingDialog.hide();
					
				}
			});

	};

	function canAuthenticate2() {
		
		var uid = $('#uid').val();
		
		sessionStorage.setItem('uid', uid);
		
			var levelReq = sessionStorage.getItem('levelReq');
			var postInput = {"uid": uid, "MFALevelReq":  levelReq}

			$.ajax({	
		    		url: 'https://collportale.inail.it/api/mfa/canauthenticate',
		    		dataType: 'json',
		    		type: 'POST',
		    		contentType: 'application/json',
				xhrFields: {
	       				withCredentials: false
	   			},
	   			crossDomain: true,
				headers: {
					"client_id": "ClientMFA"
			    	},
		    		data: JSON.stringify( postInput ),
		    		success: function(data){
					
					var formattedData = JSON.stringify(data, null, '\t');
					
					var d = $.parseJSON(formattedData);
					var result = d['result'];
					var message = d['infoMessage'];
					var providerMessage = d['providerMessage'];
					var providerName = d['providerName'];
					var sessionAuth = d['authType'];

					if (result == "true") {
						
						sessionStorage.setItem('providerMessage', providerMessage);
						sessionStorage.setItem('providerName', providerName);
						sessionStorage.setItem('infoMessage', message);
						sessionStorage.setItem('SessionAuth', sessionAuth);
						waitingDialog.hide();					
						sessionType();
						
						
						
					}
					else if (result == "NotEnable"){
						sessionStorage.setItem('infoMessage', message);
						waitingDialog.hide();					
						notEnabled();
						
					}
					else if (result == "LevelNotValid"){
						sessionStorage.setItem('infoMessage', message);
						waitingDialog.hide();						
						notEnabled();
						
					}	
					else {
						waitingDialog.hide();
						levelMsg();
						
					}	
					
				},
				error: function(data){
					
					waitingDialog.hide();
				}
			});
		

	};

	function startMFA() {
			var uid = sessionStorage.getItem('uid');
			if (uid == "null") {
				
				//canAuthenticate2();
				fingerPrint('C');
				
			}
			else {
				startAuthenticate();
			}
		}

	function startAuthenticate() {
		$('#description').empty();
		$('#msg').empty();
		
		waitingDialog.show('Fase di autenticazione - Approvare la transazione su device');
		document.getElementById("uidMfa").setAttribute("style", "display:none;");
		document.getElementById("inputMfa").setAttribute("style", "display:none;");
		document.getElementById("submitMfa").setAttribute("style", "display:none;");
		var providerMessage = sessionStorage.getItem('providerMessage');
		var providerName = sessionStorage.getItem('providerName');
		var message = sessionStorage.getItem('infoMessage');
		$('#description').append(providerMessage);
		if (message == undefined) {
			$('#msg').append("Autorizzare la richiesta di accesso tramite l'app mobile");
		}
		else {
			$('#msg').append(message);
		}
		var remember = rememberMe();
		var fingerprint = sessionStorage.getItem('fingerPrint');
		var uid = $('#uid').val();
		sessionStorage.setItem('uid', uid);	
		var password = $('#input').val();
		var levelReq = sessionStorage.getItem('levelReq');
	
		var postInput = {"uid": uid, "Password": password, "rememberMe": remember, "MFALevelReq":  levelReq}
		
		$.ajax({	
	    		url: 'https://collportale.inail.it/api/mfa/authenticate',
	    		dataType: 'json',
	    		type: 'post',
	    		contentType: 'application/json',
			xhrFields: {
       				withCredentials: false
   			},
   			crossDomain: true,
			headers: {
				"client_id": "ClientMFA",
				"X-Inail-DATA": fingerprint
		    	},
	    		data: JSON.stringify( postInput ),
			success: function(data){
				
				var formattedData = JSON.stringify(data, null, '\t');
				var d = $.parseJSON(formattedData);
				var result = d['result'];
				sessionStorage.setItem('result', result);
				
				if (result == "true") {
					var smsession = d['SMSESSION'];
					var mfatoken = d['MFAToken'];
					setCookie("SMSESSION_L10",smsession,"1");
					setCookie("MFAToken_L10",mfatoken,"1");
					target = sessionStorage.getItem('TARGET');
					sessionStorage.setItem('result', result);
					target_enc = encodeURIComponent(target);
					
					waitingDialog.hide();
					window.location.replace("/api/mfa/login?Redirect=" + target_enc +"");
					
				}
				else if (result == "challenge") {
					var state = d['state'];
					sessionStorage.setItem('state', state);
					var message = d['infoMessage'];
					var providerMessage = d['providerMessage'];
					var providerName = d['providerName'];
					sessionStorage.setItem('providerMessage', providerMessage);
					sessionStorage.setItem('providerName', providerName);
					sessionStorage.setItem('infoMessage', message);
					sessionStorage.setItem('typeAuth', 'MFAChallenge');
					sessionStorage.setItem('result', result);
					waitingDialog.hide();
					
					mfaChallenge();

				}
				
				else if  (result == "NotEnable") {
					sessionStorage.removeItem('infoMessage');
					var message = d['infoMessage'];
					var providerMessage = d['providerMessage'];
					var providerName = d['providerName'];
					sessionStorage.setItem('providerMessage', providerMessage);
					sessionStorage.setItem('providerName', providerName);
					sessionStorage.setItem('infoMessage', message);
					sessionStorage.setItem('result', result);
					target = sessionStorage.getItem('TARGET');
					target_enc = encodeURIComponent(target);
					waitingDialog.hide();
					
					notEnabled();
				}
				else if  (result == "false") {
					sessionStorage.removeItem('infoMessage');
					var message = d['infoMessage'];
					var providerMessage = d['providerMessage'];
					var providerName = d['providerName'];
					sessionStorage.setItem('providerMessage', providerMessage);
					sessionStorage.setItem('providerName', providerName);
					sessionStorage.setItem('infoMessage', message);
					sessionStorage.setItem('result', result);
					target = sessionStorage.getItem('TARGET');
					target_enc = encodeURIComponent(target);
					waitingDialog.hide();
					
					resultFalse()
				}

				else {
					waitingDialog.hide();
				}	
				
			},
			error: function(data){
				
				var message = "Il servizio non e' disponibile o non si e' approvata l'autorizzazione tramite l'app mobile"
				sessionStorage.setItem('infoMessage', message);
				waitingDialog.hide();
				resultFalse()
				
			}
		});

	};

	
	function startMFAChallenge() {
		waitingDialog.show('Verifica Pin');
		var fingerprint = sessionStorage.getItem('fingerPrint');
		var uid = sessionStorage.getItem('uid');
		var remember = rememberMe();
		var pin = $('#input').val();
		state = sessionStorage.getItem('state');
		var levelReq = sessionStorage.getItem('levelReq');
		var postInput = {"uid": uid, "pin": pin, "state": state, "rememberMe": remember, "MFALevelReq":  levelReq }
		
		$.ajax({	
	    		url: 'https://collportale.inail.it/api/mfa/challenge',
	    		dataType: 'json',
	    		type: 'post',
	    		contentType: 'application/json',
			xhrFields: {
       				withCredentials: false
   			},
   			crossDomain: true,
			headers: {
				"client_id": "ClientMFA",
				"X-Inail-DATA": fingerprint
		    	},
	    		data: JSON.stringify( postInput ),
			success: function(data){
				
				var formattedData = JSON.stringify(data, null, '\t');		
				var d = $.parseJSON(formattedData);
				var result = d['result'];
				
				if (result == "true") {
					var smsession = d['SMSESSION'];
					var mfatoken = d['MFAToken'];
					setCookie("SMSESSION_L10",smsession,"1");
					setCookie("MFAToken_L10",mfatoken,"1");
					sessionStorage.setItem('result', result);
					target = sessionStorage.getItem('TARGET');
					target_enc = encodeURIComponent(target);
					typeAuth = sessionStorage.getItem('typeAuth');
					waitingDialog.hide();
					window.location.replace("/api/mfa/login?Redirect=" + target_enc +"");
				}

				else if (result == "false") {
					var message = d['infoMessage'];
					var providerMessage = d['providerMessage'];
					var providerName = d['providerName'];
					sessionStorage.setItem('providerMessage', providerMessage);
					sessionStorage.setItem('providerName', providerName);
					sessionStorage.setItem('infoMessage', message);
					sessionStorage.setItem('result', result);
					target = sessionStorage.getItem('TARGET');
					target_enc = encodeURIComponent(target);
					waitingDialog.hide();
					mfaChallenge();
					//window.location.replace("/api/mfa/login?TARGET="+ target_enc + "&result=false");

				}

				else {
					waitingDialog.hide();
				}
				
			},
			error: function(data){
			
				typeAuth = sessionStorage.getItem('typeAuth');
				target = sessionStorage.getItem('TARGET');
				sessionStorage.setItem('result', result);
				waitingDialog.hide();
				window.location.replace("/api/mfa/login?TARGET="+ target + "&result=false");
			}
		});

	}
	