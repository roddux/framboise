// TODO: BROKEN, needs to be updated for octo
/*
https://developer.mozilla.org/en-US/docs/Web/Events
https://developer.mozilla.org/en-US/docs/Web/API/Window
http://frama-c.com/features.html
http://trust-in-soft.com/tis-interpreter/


Further reading:
	http://es6-features.org/#StringInterpolation
	Literally everything about Javascript on MDN
	Focus:
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/uneval
		https://developer.mozilla.org/en-US/docs/Web/API
*/

// x = [...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[...[]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]];
// x = new Proxy(Array, {get:function(){return function(){return [...[123]];}}})

// Properties
var objectProperties = [
	"__proto__",
	"constructor",
	"__proto__.constructor",
	"value",
];

// Methods
var objectMethods = [
"assign(object, object)", // 1 or more objects
"create(object, object)", // object is optional
"defineProperties(object, object)",
"__proto__.defineProperties(object, object)",
/*
var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
});
*/
"defineProperty(object, value, object)",
"__proto__.defineProperty(object, value, object)",
/*
var obj = {};
Object.defineProperty(obj, 'key', {
  __proto__: null, // no inherited properties
  value: 'static'  // not enumerable
                   // not configurable
                   // not writable
                   // as defaults
});
Object.defineProperty(obj, 'key', {
	get: function(){return 1;};
});
*/
"entries(object)",
"freeze(object)",
"getOwnPropertyDescriptor(object, value)",
"getOwnPropertyDescriptors(object)",
"getOwnPropertyNames(object)",
"getOwnPropertySymbols(object)",
"getPrototypeOf(object)",
// "is(value, value)",
// "isExtensible(object)",
// "isFrozen(object)",
// "isSealed(object)",
"keys(object)",
// "preventExtensions(object)",
"prototype.__defineGetter__(value, function)",
"__proto__.__defineGetter__(value, function)",
"__defineGetter__(value, function)",
/*
var o = {};
o.__defineGetter__('gimmeFive', function() { return 5; });
console.log(o.gimmeFive); // 5
*/
"prototype.__defineSetter__(value, function)",
"__proto__.__defineSetter__(value, function)",
"__defineSetter__(value, function)",
/*
as above for definegetter
*/
"prototype.__lookupGetter__(value)",
"__proto__.__lookupGetter__(value)",
"__lookupGetter__(value)",
"prototype.__lookupSetter__(value)",
"__proto__.__lookupSetter__(value)",
"__lookupSetter__(value)",
// "prototype.hasOwnProperty(value)",
// "prototype.isPrototypeOf(object)",
// "prototype.propertyIsEnumerable(value)",
// "prototype.toLocaleString()",
// "prototype.toSource()",
// "prototype.toString()",
// "prototype.unwatch(value)",
// "prototype.valueOf()",
// "prototype.watch(value)",
// "seal(object)",
"setPrototypeOf(object, object)",
"values(object)",
];

// Throw some events in too, and event handlers. All that shit.

// Some fun target objects
// https://developer.mozilla.org/en-US/docs/Web/Reference/API
// var targetObjects = [
// 	//"self.document",
// 	//"document",
// 	//"window",
// 	"document.body",
// 	"document.documentElement",
// 	"localStorage",
// 	"Math",
// 	// WebAPIS
// 	// Canvas contextx
// 	// Document elements
// 	// - Video elements
// 	// - Audio elements
// 	// - Frames
// 	// - Iframes
// 	// - Images
// 	// - Stylesheets
// 	// - etc
// ];

// gcfunc
var gc = "if(window.dogc)for(var i=0;i<0x80000;++i)var s=new String(\"AAAA\");";

function buildStatement(norecurse=false) {
	var newStmt = "";

	if(Random.range(1,10)==1) newStmt += gc;

	// thing.__proto__=thing2/null/'asdaf'
	function type1() {
		var myStmt = "";
		myStmt += Random.pick([o.rpick(),JS.getRandomElement()]);
		myStmt += "."+Random.pick(objectProperties)+"=";
		myStmt += Random.pick([o.rpick(),Make.basicType(),'"'+Make.junkData(20)+'"']);
		return myStmt;
	}

	// thing.__proto__=thing2.value
	function type2() {
		var myStmt = "";
		myStmt += Random.pick([o.rpick(),JS.getRandomElement()]);
		myStmt += "."+Random.pick(objectProperties)+"=";
		myStmt += Random.pick([o.rpick(),Make.basicType(),'"'+Make.junkData(20)+'"',o.rpick()+"."+Random.pick(objectProperties)])
		return myStmt;
	}

	/* This one needs work */
	function type3() {
		var myStmt = "";
		myStmt += Random.pick([o.rpick(),JS.getRandomElement()]);
		myStmt += ".";
		var method = Random.pick(objectMethods);

		if (method.indexOf("object")) {
			method=method.replace(/object/g, Random.pick([o.rpick(),JS.getRandomElement()]));
		}

		if (method.indexOf("function")) {
			method=method.replace(/function/g, Random.pick([o.rpick(),JS.getRandomElement()]));
		}

		if (method.indexOf("value")) {
			switch(Random.range(1,2)) {
				case 1: method=method.replace(/value/g, Make.basicType()); break;
				case 2: method=method.replace(/value/g, Random.pick([o.rpick(),JS.getRandomElement()])); break;
			}
		}

		myStmt += method;
		return myStmt;
	}

	function type4() {
		var myStmt = "";
		//newStmt += "Object.getOwnPropertyDescriptors(window)[";
		//newStmt += "Object.keys(Object.getOwnPropertyDescriptors(window))[";
		//newStmt += Random.range(100,750); // fuck it
		//newStmt += "]].value=";
		myStmt += "document.__proto__[(document.__proto__)["+Random.range(1,50)+"]]=";
		switch(Random.range(1,2)) {
			case 1: myStmt += Make.basicType(); break;
			case 2: myStmt += o.rpick(); break;
			// case 3: myStmt += "[1...a...-999]"; break;
		}
		myStmt += ";";
		return myStmt;
	}

	function type5() {
		var myStmt = "";
		if (norecurse) return "return null;";
		myStmt += "Object.assign(";
		myStmt += o.rpick();
		myStmt += ",{get function() { ";
		myStmt += doRecurseStatement();
		myStmt += "} });";
		return myStmt;
	}

	function type6() {
		var myStmt = "";
		if (norecurse) return "return null;";
		var rElement  = Random.pick([o.rpick(),JS.getRandomElement()]);

		// Total guesswork here. Could be better.
		var rProperty = Random.pick([
			"'value'",
			"Object.getOwnPropertyNames("+rElement+")["+Random.range(0,5)+"]",
			"Object.getOwnPropertyNames("+rElement+".__proto__)["+Random.range(0,5)+"]",
		]);

		var retFull = rElement+".__defineGetter__("+rProperty+",function(){";

		retFull += Random.pick(
			[
				doRecurseStatement(),
				"return "+Random.pick(
					[
						Make.number(),
						Make.basicType(),
						"'"+Make.junkData(20)+"'"
					]
				)+";"
			]
		);

		retFull += "});";

		myStmt += retFull;
		return myStmt;
	}

	function type7() {
		if (norecurse) return "return null;";
		var fuckObj = o.rpick();
		var myStmt = fuckObj + "= new Proxy(" + fuckObj +", ";
		myStmt += "{get: function() { return function(){ ";
		myStmt += doRecurseStatement();
		myStmt += "} } }";
		myStmt += ");";

		return myStmt;
	}

	switch(Random.range(1,7)) {
		case 1: newStmt += type1(); break;
		case 2: newStmt += type2(); break;
		case 3: newStmt += type3(); break;
		case 4: newStmt += type4(); break;
		case 5: newStmt += type5(); break;
		case 6: newStmt += type6(); break;
		case 7: newStmt += type7(); break;
	}

	return newStmt;
}

function doRecurseStatement() {
	return buildStatement(norecurse=true);
}

var fuzzerJSFuck = (function() {
	function onInit() {
		if(Random.range(1,5)==1) return ["window.dogc = true;"];
		return [];
	}

	function makeCommand() {
		return [buildStatement()];
	}

	function onFinish() {
		return [];
	}

	var eventList = [
		"DOMAttrModified",
		"DOMAttributeNameChanged",
		"DOMCharacterDataModified",
		"DOMElementNameChanged",
		"DOMNodeInserted",
		"DOMNodeInsertedIntoDocument",
		"DOMNodeRemoved",
		"DOMNodeRemovedFromDocument",
		"DOMSubtreeModified",
	];

	var Events = {
		"CanvasElement": eventList,
		"Canvas2D":      eventList,
		"ImageElement":  eventList,
		"VideoElement":  eventList,
		"rb":            eventList,
		"ruby":          eventList,
		"rp":            eventList,
		"rtc":           eventList,
		"rt":            eventList,
		"span":          eventList,
		"RANDOM":        eventList,
	};

	var wEventList = [
		"onbeforeunload",
		"onchange",
		"onerror",
		"onload",
		"onmozbeforepaint",
		"onpageshow",
		"onpagehide",
		"onpaint",
		"onselect",
		"onselectionchange",
		"onunload",
	];

	return {
		onInit: onInit,
		makeCommand: makeCommand,
		onFinish: onFinish,
		Events: Events,
		WindowEvents: wEventList,
	};
})();
