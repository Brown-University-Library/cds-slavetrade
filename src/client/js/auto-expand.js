function expandTextareas() {
  var $elements = document.getElementsByClassName("auto-expand");
  var minHeights = [];

  for (let i = 0; i < $elements.length; ++i) {
    minHeights.push($elements[i].clientHeight);
    console.log(minHeights);
    $elements[i].addEventListener('input', function() {
      this.style.boxSizing = this.style.mozBoxSizing = 'border-box';
      this.style.overflowY = 'hidden';
      var outerHeight = parseInt(window.getComputedStyle(this).height, 10);
      var diff = outerHeight - this.clientHeight;
      // set the height to 0 in case of it has to be shrinked
      this.style.height = 0;
      // set the correct height
      // this.scrollHeight is the full height of the content, not just the visible part
      this.style.height = Math.max(minHeights[i] + diff, this.scrollHeight + diff + 5) + 'px';
    }, false);
  }
}

window.addEventListener('load', expandTextareas);
