var fuzzerEditCommands = (function() {

  function genEditCommand() {
    let designCmds = [
      'selectAll',
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
      'forwardDelete',
      'insertBrOnReturn',
      // 'insertHorizontalRule',
      'insertOrderedList',
      'insertUnorderedList',
      'insertParagraph',
      // 'insertText',
      'italic',
      'outdent',
      'redo',
      'removeFormat',
      'strikeThrough',
      'underline',
      'undo',
      'unlink',
    ]

    switch(random.range(1,2)) {
      case 1:
        return 'document.execCommand("' + random.pick(designCmds) + '");'
        break
      case 2:
        let complexCmds = {
          'backColor':make.colors.any(),
          'contentReadOnly':random.pick(['true','false']),
          'createLink':random.pick(['http://google.ru/',make.text.junk(50)]),
          'fontName':random.pick([make.text.junk(50),'Arial']),
          'fontSize':random.range(1,10),
          'foreColor':make.colors.any(),
          'formatBlock':random.pick(['H1','BLOCKQUOTE','PRE','P']),
          'heading':random.pick(['H1','BLOCKQUOTE','PRE','P']),
          'hiliteColor':make.colors.any(),
          'styleWithCSS':random.pick(['true','false'])
          // 'insertHTML':make.text.junk(20),
          // 'insertImage':Random.pick(['http://google.ru/',make.text.junk(20)]),
        }
        let CMD = random.pick(Object.keys(complexCmds))
        let VAL = complexCmds[CMD]
        return 'document.execCommand("' + CMD + '", false, "' + VAL + '");'
        break
    }
  }

  function genMessyCommand() {
    let junk    = make.text.junk(50) // make.text.any would be better
    let randEl1 = random.pick([o.rpick(), utils.script.getRandomElement()])
    let randEl2 = random.pick([o.rpick(), utils.script.getRandomElement()])

    let messCmds = [
      randEl1 + '.outerHTML  = "' + junk    + '";',
      randEl1 + '.outerHTML += "' + junk    + '";',
      randEl1 + '.innerHTML  = "' + junk    + '";',
      randEl1 + '.innerHTML += "' + junk    + '";',
      randEl1 + '.after      = "' + junk    + '";',
      randEl1 + '.after     += "' + junk    + '";',
      randEl1 + '.before     = "' + junk    + '";',
      randEl1 + '.before    += "' + junk    + '";',
      randEl1 + '.appendChild('   + randEl2 + ');',
      randEl1 + '.replaceWith('   + randEl2 + ');',
    ]

    return random.pick(messCmds)
  }
  
  function onInit() { return ["document.designMode='on';"] }

  function makeCommand() { return random.item([genEditCommand, genMessyCommand])() }

  function onFinish() { return [] }

  let wEventList = [
    'onbeforeunload',
    'onchange',
    'onerror',
    'onload',
    'onmozbeforepaint',
    'onpageshow',
    'onpagehide',
    'onpaint',
    'onselect',
    'onselectionchange',
    'onunload',
  ]

  return {
    onInit: onInit,
    makeCommand: makeCommand,
    onFinish: onFinish,
    WindowEvents: wEventList
  }

})()