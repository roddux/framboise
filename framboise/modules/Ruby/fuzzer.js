// TODO: BROKEN, needs to be updated for octo
var fuzzerRuby = (function() {

	var targetElements = ["span", "ruby", "rt", "rp", "rtc", "rb"];
	var objsInBody     = [];
	var notInBody      = [];

	function onInit() {
		var icmd = [];
		icmd.push("document.designMode='on';");

		// Add at least one element of each type to the Objects
		for (var x = 0; x < targetElements.length; x++) {
			var cobj = o.add(targetElements[x]);
			var mcmd = cobj + ' = document.createElement("' + targetElements[x] + '"); ';
			mcmd    += cobj + ".innerHTML='" + Make.junkData(20) + "';";
			icmd.push(mcmd);
		}

		return icmd;
	}

	function genEditCommand() {
		var retCmd     = [];
		var designCmds = [
			// 'selectAll',
			'justifyLeft',
			'justifyRight',
			'subscript',
			'superscript',
			'justifyFull',
			'justifyCenter',
			'indent',
			'increaseFontSize',
			'heading',
			'formatBlock',
			'decreaseFontSize',
			'createLink',
			'bold',
			// 'copy',
			// 'paste',
			// 'cut',
			// 'delete',
			'enableInlineTableEditing',
			'enableObjectResizing',
			"forwardDelete",
			"insertBrOnReturn",
			// "insertHorizontalRule",
			"insertOrderedList",
			"insertUnorderedList",
			"insertParagraph",
			// "insertText",
			"italic",
			"outdent",
			"redo",
			"removeFormat",
			"strikeThrough",
			"underline",
			"undo",
			"unlink",

		];

		var complexCmds = {
			"backColor":Make.colorNoQuote(),
			"contentReadOnly":Random.pick(["true","false"]),
			"createLink":Random.pick(["http://google.ru/",Make.junkData(20)]),
			"fontName":Random.pick([Make.junkData(20),"Arial"]),
			"fontSize":Random.range(1,10),
			"foreColor":Make.colorNoQuote(),
			"formatBlock":Random.pick(["H1","BLOCKQUOTE","PRE","P"]),
			"heading":Random.pick(["H1","BLOCKQUOTE","PRE","P"]),
			"hiliteColor":Make.colorNoQuote(),
			// "insertHTML":Make.junkData(20),
			// "insertImage":Random.pick(["http://google.ru/",Make.junkData(20)]),
			"styleWithCSS":Random.pick(["true","false"])

		};

		switch(Random.range(1,2)) {
			case 1:
				var CMD = Random.pick(designCmds);
				retCmd.push("document.execCommand('selectAll'); document.execCommand('"+CMD+"');");
				break;
			case 2:
				var CMD = Random.pick(Object.keys(complexCmds));
				var VAL = complexCmds[CMD];
				retCmd.push("document.execCommand('selectAll'); document.execCommand('"+CMD+"',false,'"+VAL+"');");
				break;
		}

		return retCmd;
	}

	function genBoxSizingTestCommand() {
		var retCmd = [];

		switch(Random.range(1,3)) {
			case 1:
				retCmd.push(Random.pick([o.rpick(),JS.getRandomElement()])+".offsetHeight+"+Random.pick([o.rpick(),JS.getRandomElement()])+".offsetParent;");
				break;
			case 2:
				retCmd.push(Random.pick([o.rpick(),JS.getRandomElement()])+".getBoundingClientRect();");
				break;
			case 3:
				retCmd.push(Random.pick([o.rpick(),JS.getRandomElement()])+".getClientRects();");
				break;
		}

		return retCmd;
	}

	function makeCommand() {
		var cmds = [];

		switch(Random.range(1,3)) {
			case 1:
				cmds = cmds.concat(genMessyCommand());
				break;
			case 2:
				cmds = cmds.concat(genEditCommand());
				break;
			case 3:
				cmds = cmds.concat(genBoxSizingTestCommand());
				break;
		}

		return cmds;
	}

	function genMessyCommand() {
		var messyRet = [];

		var messCmds = [
			Random.pick([o.rpick(),JS.getRandomElement()]) + ".outerHTML = '"+Make.junkData(20)+"';",
			Random.pick([o.rpick(),JS.getRandomElement()]) + ".innerHTML = '"+Make.junkData(20)+"';",
			Random.pick([o.rpick(),JS.getRandomElement()]) + ".after = '"+Make.junkData(20)+"';",
			Random.pick([o.rpick(),JS.getRandomElement()]) + ".before = '"+Make.junkData(20)+"';",
			Random.pick([o.rpick(),JS.getRandomElement()]) + ".appendChild("+o.rpick()+");",
			Random.pick([o.rpick(),JS.getRandomElement()]) + ".childElementCount;",
			Random.pick([o.rpick(),JS.getRandomElement()]) + ".replaceWith("+o.rpick()+");",
			Random.pick([o.rpick(),JS.getRandomElement()]) + ".closest('"+o.rpick()+"');",
		];
		messyRet.push(Random.pick(messCmds));

		return messyRet;
	}

	function onFinish() {
		return [""];
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
		// Events: Events,
		WindowEvents: wEventList
	};
})();
