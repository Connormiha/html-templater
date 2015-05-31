var templater = new(function(){
	"use strict";

	var type;
	var objs;
	var argsize;
	var obj;
	var reg = /<%=\s*(.*?)\s*%>/g;
	var div = document.createElement("div");
	var safe_mode;
	var i;

	function search(str, p1){
		for(i=1;i<argsize;i++){
			obj = objs[i];
			type = typeof(obj[p1]);
			if(type === "string" || type === "number"){
				if(safe_mode){
					div.textContent = obj[p1];
				} else {
					div.innerHTML = obj[p1];
				}
				return div.innerHTML;
			}
		}
		return "";
	}
		
	return function(str){
		objs = arguments;
		argsize = objs.length;
		if(typeof(objs[argsize-1]) === "boolean"){
			safe_mode = objs[argsize-1];
			argsize--;
		} else {
			safe_mode = false;
		}
		return str.replace(reg, search);
	};
})();