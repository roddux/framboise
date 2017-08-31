// TODO: Probably broken, needs updating/testing with octo
var fuzzerDOMess = (function() {

  var targetElements = [
    "a", "abbr", "acronym", "address", "applet",
    "area", "article", "aside", "audio", "b", "base", "basefont", "bdi",
    "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button",
    "canvas", "caption", "center", "cite", "code", "col", "colgroup",
    "command", "content", "data", "datalist", "dd", "del", "details", "dfn",
    "dialog", "dir", "div", "dl", "dt", "element", "em", "embed",
    "fieldset", "figcaption", "figure", "font", "footer", "form", "frame",
    "frameset", "h6", "head", "header", "hgroup", "hr", "html", "i",
    "iframe", "image", "img", "input", "ins", "isindex", "kbd", "keygen",
    "label", "legend", "li", "link", "listing", "main", "map", "mark",
    "marquee", "menu", "menuitem", "meta", "meter", "multicol", "nav",
    "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup",
    "option", "output", "p", "param", "picture", // "plaintext", // "pre",
    "progress", "q", "rp", "rt", "rtc", "ruby", "s", "samp", // "script",
    "section", "select", "shadow", "slot", "small", "source", "spacer",
    "span", "strike", "strong", "style", "sub", "summary", "sup", "table",
    "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time",
    "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr",
    "xmp"
  ];

  function onInit() {
    var icmd = [];

    var objsInBody = [];

    // Randomly add elements
    for (var j = 0; j < random.range(50,200); j++) {
      var newEl = random.pick(targetElements);
      var cobj  = o.add(newEl);
      // There's probably a util. method for this that I'm missing
      var mcmd1 = cobj + ' = document.createElement("' + newEl + '");';
      icmd.push(mcmd1);

      var mcmd2 = utils.script.addElementToBody(cobj);
      objsInBody.push(cobj);
      icmd.push(mcmd2);
    }

    // Randomly nest all the elements
    for (var c = 0; c < random.range(200,500); c++) {
      icmd.push(random.pick(objsInBody) + ".appendChild(" + o.rpick() + ");");
      icmd.push(o.rpick()               + ".appendChild(" + o.rpick() + ");");
    }

    // Fill the elements with junk
    for (var i = 0; i < objsInBody.length; i++) {
      var mcmd5 = objsInBody[i] + ".innerHTML+=";
      mcmd5 += "'" + make.text.junk(10) + "'";
      icmd.push(mcmd5);
    }

    var nCmds = tableGen();
    for (var c = 0; c < nCmds.length; icmd.push(nCmds[c]), c++);

    return icmd;
  }

  // TODO: Is this too specific? Probably.
  // Look to Dharama and other generators for inspiration about
  // implementing this without so much manual boilerplate
  // Implement for SVG, ruby/rb elements, 
  function tableGen() {
    var table = o.add("table");
    var tCmd1 = table + " = document.createElement(\"table\");";
    var tCmd2 = utils.script.addElementToBody(table);
    var cmds  = [tCmd1, tCmd2];

    // o.pick can throw if the random.pick below doesn't give at least one of each
    var tableInnards = ["thead","tfoot","th","tr","tbody"];

    for (let i = 0; i < tableInnards.length; i++) {
      cmds.push(o.add(tableInnards[i]) + " = document.createElement('" + tableInnards[i] + "');");
    }

    // Randomly add table innards to a table
    for (var j = 0; j < 20; j++) {
      var newEl = random.pick(tableInnards);
      var cobj  = o.add(newEl);
      var mcmd1 = cobj + ' = document.createElement("' + newEl + '");';
      cmds.push(mcmd1);

      var mcmd2 = o.pick("table") + ".appendChild(" + cobj + ");";
      cmds.push(mcmd2);
    }

    // Add some specific table innards
    for (var j = 0; j < 20; j++) {
      var newEl = random.pick(tableInnards);
      var cobj  = o.add(newEl);
      var mcmd1 = cobj + ' = document.createElement("' + newEl + '");';
      cmds.push(mcmd1);

      var mcmd2 = o.pick(random.pick(tableInnards)) + ".appendChild(" + cobj + ");";
      cmds.push(mcmd2);
    }
    return cmds;
  }

  function makeCommand() { return [""]; }

  function onFinish() { return [""]; }

  return {
    onInit: onInit,
    makeCommand: makeCommand,
    onFinish: onFinish,
    Events: [],
  };
})();
