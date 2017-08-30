// TODO: BROKEN, needs to be updated for octo
var badVals = ["\n","\\","\"", "'", "\r"];

var fuzzerCSS = (function() {

	var textAlignStyles = [
		"left",
		"right",
		"center",
		"justify",
		"justify-all",
		"start",
		"end",
		"match-parent",
	];
	function genTextAlignStyle() {
		var ncmd = "";
		var myobj = o.rpick();
		// Maybe turn this into textAlignLast property
		ncmd  = myobj + ".style.textAlign" + Random.pick("","Last") + " = '";
		ncmd += Random.pick(textAlignStyles) + "';";
		return ncmd;
	}

	var textCombineStyles = [
		"none",
		"all",
	];
	function genTextCombineStyle() {
		var ncmd = "";
		var myobj = o.rpick();
		ncmd  = myobj + ".style.textCombineUpright = '";
		ncmd += Random.pick(textCombineStyles) + "';";
		return ncmd;
	}

	var lineStyles = [" underline ", " overline ", " line-through ", " blink "]; // "none"
	var lineDecs   = [" solid ", " double ", " dotted ", " dashed ", " wavy "];
	function genTextDecorationStyle() {
		// Inside the function to be dynamic
		var textDecorationStyles = [
			Random.pick(lineStyles),
			Random.pick(lineStyles) + Make.colorNoQuote(),
			Random.pick(lineStyles) + Random.pick(lineDecs),
			Random.pick(lineStyles) + Random.pick(lineDecs) + Make.colorNoQuote(),
		];
		var ncmd = "";
		var myobj = o.rpick();
		ncmd  = myobj + ".style.textDecoration = '";
		ncmd += Random.pick(textDecorationStyles) + "';";
		return ncmd;
	}

	var textEmphasisLineStyles = [" dot ", " circle ", " double-circle ", " triangle ", " sesame "];
	function genTextEmphasisStyle() {
		// Inside the function to be dynamic
		var textEmphasisStyles = [
			"\""+Make.junkData(5)+"\"" + Make.colorNoQuote(),
			Random.pick(["filled ", "open "]) + "\""+Make.junkData(5)+"\" ",
			Random.pick(["filled ", "open "]) + Make.colorNoQuote(),
			Random.pick(["filled ", "open "]) + "\""+Make.junkData(5)+"\" " + Make.colorNoQuote(),
			Random.pick(["filled ", "open "]) + Random.pick(textEmphasisLineStyles) + Make.colorNoQuote(),
			Random.pick(textEmphasisLineStyles) + Make.colorNoQuote(),
		];
		var ncmd = "";
		var myobj = o.rpick();
		ncmd  = myobj + ".style.textEmphasis = '";
		ncmd += Random.pick(textEmphasisStyles) + "';";
		return ncmd;
	}

	var transformCommands = [
		"matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)",
		"translate("+Make.length()+", "+Make.length()+")",
		"translateX("+Make.length()+")",
		"translateY("+Make.length()+")",
		"scale("+Make.number()+", "+Make.number()+")",
		"scaleX("+Make.number()+")",
		"scaleY("+Make.number()+")",
		"rotate("+Make.number()+"turn)",
		"skew("+Make.number()+"deg, "+Make.number()+"deg)",
		"skewX("+Make.number()+"deg)",
		"skewY("+Make.number()+"rad)",
		"matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
		"translate3d("+Make.length()+", "+Make.length()+", "+Make.length()+")",
		"translateZ("+Make.length()+")",
		"scale3d("+Make.number()+", "+Make.number()+", "+Make.number()+")",
		"scaleZ("+Make.number()+")",
		"rotate3d("+Make.number()+", "+Make.number()+", "+Make.number()+", "+Make.number()+"deg)",
		"rotateX("+Make.number()+"deg)",
		"rotateY("+Make.number()+"deg)",
		"rotateZ("+Make.number()+"deg)",
		"perspective("+Make.length()+")",
	];
	function genTransformStyle() {
		var ncmd = "";
		var myobj = o.rpick();
		ncmd  = myobj + ".style.transform = '";
		ncmd += Random.pick(transformCommands) + "';";
		return ncmd;
	}

	function genTransformOriginStyle() {
		var transformOriginStyles = [
			Random.pick([
				"left", "center", "right",
				"top", "bottom", Make.percent(), Make.length()
			]),

			Random.pick([
				Make.percent(), Make.length(),
				"left", "center", "right"
			]) + " " + Random.pick([
				Make.percent(), Make.length(),
				"top", "center", "bottom"
			]),

			Random.pick([
				Make.percent(), Make.length(),
				"left", "center", "right"
			]) + " " + Random.pick([
				Make.percent(), Make.length(),
				"top", "center", "bottom"
			]) + " " + Make.length(),
		];

		var ncmd = "";
		var myobj = o.rpick();
		ncmd  = myobj + ".style.transformOrigin = '";
		ncmd += Random.pick(transformOriginStyles) + "';";

		return ncmd;
	}

	function genColumnsStyle() {
		var ncmd = "";
		var myobj = o.rpick();
		ncmd  = myobj + ".style.columns = '";
		ncmd += Random.pick([
			Make.length(),
			Make.length() +" "+ Make.number(),
		]) + "';";
		return ncmd;
	}

	function onInit() {
		var icmd = [];
		return icmd;
	}

	// Selectors
	function genStyleCommand(howMany=1) {
		var retCmd = [];
		// https://developer.mozilla.org/en-US/docs/Web/CSS/Reference
		for (var c = 0; c < howMany; c++) {
			retCmd.push(
				Random.choose([
					[10, [
						genTextAlignStyle(),
						genTextCombineStyle(),
						genTextDecorationStyle(),
						genTextEmphasisStyle(),
					]],
					[10, [
						genTransformOriginStyle(),
						genTransformStyle(),
					]],
					[10, [
						genColumnsStyle(),
					]]
				])
			);

		}
		return retCmd;
	}

	function makeCommand() {
		var mkcmd = [];

		var styleCmds = genStyleCommand(2);
		for (var c = 0; c < styleCmds.length; mkcmd.push(styleCmds[c]), c++);

		return mkcmd;
	}

	function onFinish() {
		var fcmd = [];
		return fcmd;
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

	return {
		onInit: onInit,
		makeCommand: makeCommand,
		onFinish: onFinish,
		Events: Events
	};
})();
