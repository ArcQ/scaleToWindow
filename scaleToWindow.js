export default function scaleToWindow(eleDict, getWindow, getDocument, backgroundColor) {
  return (canvas) => {
    const container = document.querySelector(eleDict.containerSel);
    const _window = getWindow();
    const _document = getDocument();
    var scaleX, scaleY, scale, center;

    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !_window.MSStream;

    const getWWidth = () => ((iOS) ? _window.screen.width : _window.innerWidth
      || _document._documentElement.clientWidth
      || _document.body.clientWidth);

    const getWHeight = () => ((iOS) ? _window.screen.height : _window.innerHeight
      || _document._documentElement.clientHeight
      || _document.body.clientHeight);


    //1. Scale the container to the correct size
    //Figure out the scale amount on each axis
    scaleX = getWWidth() / canvas.offsetWidth;
    scaleY = getWHeight() / canvas.offsetHeight;

    //Scale the container based on whichever value is less: `scaleX` or `scaleY`
    scale = Math.min(scaleX, scaleY);
    container.style.transformOrigin = "0 0";
    container.style.transform = "scale(" + scale + ")";
    if (eleDict.childSelArr) {
      containerSelectors.childSelArr.map((sel) => {
        document.querySelector(sel).style.height = canvas.offsetHeight;
        document.querySelector(sel).style.width = canvas.offsetWidth;
      })
    }
    container.style.height = canvas.offsetHeight;
    container.style.width = canvas.offsetWidth;

    //2. Center the container.
    //Decide whether to center the container vertically or horizontally.
    //Wide containeres should be centered vertically, and
    //square or tall containeres should be centered horizontally
    if (canvas.offsetWidth > canvas.offsetHeight) {
      if (canvas.offsetWidth * scale < getWWidth()) {
        center = "horizontally";
      } else {
        center = "vertically";
      }
    } else {
      if (canvas.offsetHeight * scale < getWHeight()) {
        center = "vertically";
      } else {
        center = "horizontally";
      }
    }

    //Center horizontally (for square or tall containeres)
    var margin;
    if (center === "horizontally") {
      margin = (getWWidth() - canvas.offsetWidth * scale) / 2;
      container.style.marginTop = 0 + "px";
      container.style.marginBottom = 0 + "px";
      container.style.marginLeft = margin + "px";
      container.style.marginRight = margin + "px";
    }

    //Center vertically (for wide containeres)
    if (center === "vertically") {
      margin = (getWHeight() - container.offsetHeight * scale) / 2;
      container.style.marginTop = margin + "px";
      container.style.marginBottom = margin + "px";
      container.style.marginLeft = 0 + "px";
      container.style.marginRight = 0 + "px";
    }

    //3. Remove any padding from the container  and body and set the canvas
    //display style to "block"
    container.style.paddingLeft = 0 + "px";
    container.style.paddingRight = 0 + "px";
    container.style.paddingTop = 0 + "px";
    container.style.paddingBottom = 0 + "px";
    container.style.display = "block";
    container.style.width = canvas.offsetWidth + 'px';
    container.style.height = canvas.offsetHeight + 'px';

    //4. Set the color of the HTML body background
    if(backgroundColor) {
      _document.body.style.backgroundColor = backgroundColor;
    }

    //Fix some quirkiness in scaling for Safari
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari") != -1) {
      if (ua.indexOf("chrome") > -1) {
        // Chrome
      } else {
        // Safari
        //container.style.maxHeight = "100%";
        //container.style.minHeight = "100%";
      }
    }

    //5. Return the `scale` value. This is important, because you'll nee this value
    //for correct hit testing between the pointer and sprites
    return scale;
  }
}
