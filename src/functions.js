function getSelectionCoordinates(atStart) {
    const sel = window.getSelection();

    // check if selection exists
    if (!sel.rangeCount) return null;

    // get range
    let range = sel.getRangeAt(0).cloneRange();
    if (!range.getClientRects) return null;

    // get client rect
    range.collapse(atStart);

    // let rects = range.getClientRects();
    // if (rects.length <= 0) return null;
    // let rect = rects[0];
    let rect = range.getBoundingClientRect();

    // Detect if selection is backwards
    let isBackwards;
    try {
        let range = document.createRange();
        range.setStart(sel.anchorNode, sel.anchorOffset);
        range.setEnd(sel.focusNode, sel.focusOffset);
        isBackwards = range.collapsed;
        range.detach();
    } catch (e) { console.log(e); }

    let coordsToReturn = { dx: rect.x, dy: rect.y, backwards: isBackwards };

    if (rect.x == 0 && rect.y == 0) {
        let rectCoords = getSelectionRectDimensions();
        if (atStart)
            coordsToReturn = { dx: rectCoords.dx, dy: rectCoords.dy, backwards: isBackwards };
        else
            coordsToReturn = { dx: rectCoords.dx + rectCoords.width, dy: rectCoords.dy + rectCoords.height - (selectionHandleLineHeight - 7.5), backwards: isBackwards };
    }

    if (coordsToReturn.dx == 0 && coordsToReturn.dy == 0)
        coordsToReturn = { dx: lastMouseUpEvent.clientX, dy: lastMouseUpEvent.clientY - 8, backwards: isBackwards, dontAddDragHandles: true };

    return coordsToReturn;
}

//Establecer posicion del contenedor
const setPositionElement = (element,top,left) =>{
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
  }