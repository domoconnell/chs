module.exports = function($rootScope, $timeout, $window, $http){
	InterfaceCtrl = this;
	InterfaceCtrl.choosingVenue = false;
	InterfaceCtrl.selectedVenue = $window.localStorage['selectedVenue'] || null;
	InterfaceCtrl.funcToDo = null;
	InterfaceCtrl.showConfirm = false;
	InterfaceCtrl.confirmMsg = '';
	InterfaceCtrl.confirmTitle = 'Are You Sure?';
	InterfaceCtrl.confirmButton = true;
	InterfaceCtrl.locationOptions = {
		"accelerate_older":{
			"location":"Cow Shed",
			"name":"Accelerate Older"
		},
		"accelerate_younger":{
			"location":"East Hall",
			"name":"Accelerate Younger"
		},
		"space":{
			"location":"Tent",
			"name":"Space"
		},
		"authentic":{
			"location":"Tent",
			"name":"Authentic"
		}
	}


	InterfaceCtrl.peopleOptions = {
		"chris":{
			"name":"Chris Daly-Roy",
			"number":"07825415946"
		},
		"barry":{
			"name":"Barry Pollard",
			"number":"07814698448"
		},
		"ben":{
			"name":"Ben Poucher",
			//"number":"07411976558"
			"number":"07771924073"
		}
	}

	InterfaceCtrl.changeVenue = function(vid){
		InterfaceCtrl.selectedVenue = vid;
		InterfaceCtrl.choosingVenue = false;
		$window.localStorage['selectedVenue'] = vid;
	}

	InterfaceCtrl.sendMessage = function(pid, type){
		var msg = '';
		var reqtype = '';
		if(type=="alert"){
			msg = 'Alert: please go to ' + InterfaceCtrl.locationOptions[InterfaceCtrl.selectedVenue].name + ' @ ' + InterfaceCtrl.locationOptions[InterfaceCtrl.selectedVenue].location;
			reqtype = 'a help';
		}else if(type=="urgent"){
			msg = 'URGENT: please go to ' + InterfaceCtrl.locationOptions[InterfaceCtrl.selectedVenue].name + ' @ ' + InterfaceCtrl.locationOptions[InterfaceCtrl.selectedVenue].location;
			reqtype = 'an urgent help';
		}else if(type=="cancel"){
			msg = 'CANCELLED: call from ' + InterfaceCtrl.locationOptions[InterfaceCtrl.selectedVenue].name + ' @ ' + InterfaceCtrl.locationOptions[InterfaceCtrl.selectedVenue].location;
			reqtype = 'a cancel'
		}
		InterfaceCtrl.confirmMsg = 'Are you sure you want to send ' + reqtype + ' to ' + InterfaceCtrl.peopleOptions[pid].name + '?';
		InterfaceCtrl.showConfirm = true;
		InterfaceCtrl.confirmTitle = 'Are You Sure?';
		InterfaceCtrl.confirmButton = true;
		InterfaceCtrl.funcToDo = function(){
			var hash = 'b3P5gQlcrgQ-MmlRjwvF7xf4NbKGNfC5sBnWmTvbOM';
			var user = 'samantha.oconnell29@gmail.com';
			var url = 'https://api.txtlocal.com/send/?username=' + user + '&apiKey=' + hash + '&numbers=' + InterfaceCtrl.peopleOptions[pid].number  + '&message=' + msg + '&sender=CHS';
			$http.get(url);
		}
	}
	InterfaceCtrl.confirmReq = function(req){
		if(req=='cancel'){
			InterfaceCtrl.showConfirm = false;
			InterfaceCtrl.funcToDo = null;
			InterfaceCtrl.confirmMsg = '';
		}else{
			InterfaceCtrl.confirmTitle = 'Message Sent!';
			InterfaceCtrl.confirmMsg = 'That message will be sent immediately';
			InterfaceCtrl.confirmButton = false;
			InterfaceCtrl.funcToDo();
			$timeout(function(){
				InterfaceCtrl.showConfirm = false;
				InterfaceCtrl.confirmMsg = '';
				InterfaceCtrl.confirmTitle = 'Are You Sure?';
				InterfaceCtrl.confirmButton = true;
			}, 3000);
		}
	}


}