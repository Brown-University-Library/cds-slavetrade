function expandTextarea(element) {
  resize(element);
  element.addEventListener('input', function() {
    resize(element);
  }, false);
}

function resize(element) {
  let self = element;
  var minHeight = self.clientHeight;
  self.style.boxSizing = self.style.mozBoxSizing = 'border-box';
  self.style.overflowY = 'hidden';
  var outerHeight = parseInt(window.getComputedStyle(self).height, 10);
  var diff = outerHeight - self.clientHeight;
  // set the height to 0 in case of it has to be shrinked
  self.style.height = 0;
  // set the correct height
  // this.scrollHeight is the full height of the content, not just the visible part
  self.style.height = Math.max(minHeight + diff, self.scrollHeight + diff + 5) + 'px';
}
