// ==UserScript==
// @name         强兼粘贴
// @namespace    http://starsharp06sharp.github.io/
// @version      2025-08-12
// @description  在不能粘贴的地方通过模拟键盘输入强行兼容粘贴功能, 按Ctrl+Shift+X粘贴剪贴板后的内容
// @author       leolzheng
// @match        *://*/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const tryPasteByDom = function(clipText) {
    const e = document.activeElement;
    if ((e.nodeName === 'INPUT' && ['text', 'email', 'number', 'password', 'search', 'tel', 'url'].includes(e.type))
        || (e.nodeName === 'TEXTAREA')){
      const prefix = e.value.slice(0, e.selectionStart);
      const suffix = e.value.slice(e.selectionEnd);
      e.value = prefix + clipText + suffix;
      const event = new Event('input', {
        bubbles: true,
        cancelable: true,
      });
      e.dispatchEvent(event);
      return true;
    }
    return false;
  }

  const tryPasteByEvent = function(clipText) {
    console.log('======TODO:待实现======');
  };

  const doPaste = function() {
    navigator.clipboard.readText().then(
      clipText => {
        console.log('粘贴内容: '+clipText);
        if (tryPasteByDom(clipText)) {
          console.log('tryPasteByDom Success');
        } else {
          console.log('tryPasteByEvent');
          tryPasteByEvent(clipText);
        }
      }
    );
  };

  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key.toUpperCase() === 'X') {
      console.log('Ctrl + Shift + X 被按下');
      doPaste();
      event.preventDefault(); // 阻止默认的保存行为
    }
  });

})();
