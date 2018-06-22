let currentColor = 'black';
let mouseDown = false;
let fillMode = false;

setupCanvas(70, 70*0.5625, document.getElementById('canvas'));
let wrapper = setupPalette(document.getElementById('palette'));
setCanvasListeners(document.getElementById('canvas'));

document.getElementById('palette').addEventListener('click', function (ev){
    if (ev.target && ev.target.getAttribute('class') === 'dot'){
        currentColor = ev.target.style.background;
        document.getElementById('currentColorIndicator').style.background = currentColor;
        wrapper.style.background =  currentColor;
    }
});

document.getElementById('colorPicker').addEventListener('change', function (ev){
    currentColor = ev.target.value;
    document.getElementById('currentColorIndicator').style.background = currentColor;
    wrapper.style.background = currentColor;
});

document.getElementById('save').addEventListener('click', function () {
    const canvas = document.getElementById('canvas');
    const canvasObject = nodeToJSObject(canvas);
    localStorage.setItem('savedCanvas', JSON.stringify(canvasObject));
});

document.getElementById('load').addEventListener('click', function () {
    const canvasObject = JSON.parse(localStorage.getItem('savedCanvas'));
    const canvas = JSObjectToNode(canvasObject);
    document.getElementById('pixelArt').replaceChild(canvas, document.getElementById('canvas'));
    setCanvasListeners(canvas);
});

document.getElementById('fill').addEventListener('click', function () {
    fillMode = true;
});


function setCanvasListeners(canvas){
    canvas.addEventListener('click', function (ev) {
        if (ev.target && (ev.target.getAttribute('class') === 'block' || ev.target.getAttribute('class') === 'filled')) {
            if (fillMode){
                floodFill(ev.target, ev.target.style.background, currentColor);
                fillMode = false;
            }
            else {
                ev.target.setAttribute('class', 'filled');
                ev.target.style.background = currentColor;
            }
        }
    });

    canvas.addEventListener('mousedown', function () {
        mouseDown = true;
    });

    canvas.addEventListener('mouseup', function () {
        mouseDown = false;
    });

    canvas.addEventListener('mouseout', function (ev) {
        if (!ev.relatedTarget || !(ev.relatedTarget.getAttribute('class') === 'block' || ev.relatedTarget.getAttribute('class') === 'filled')){
            mouseDown = false;
        }
    });

    canvas.addEventListener('mouseover', function (ev) {
        if (mouseDown && ev.target && (ev.target.getAttribute('class') === 'block' || ev.target.getAttribute('class') === 'filled')) {
            ev.target.setAttribute('class', 'filled');
            ev.target.style.background = currentColor;
        }
    });
}

function setupCanvas(cols, rows, canvas){
    canvas.setAttribute('divsCols', cols);
    canvas.setAttribute('divsRows', rows);
    for (let i = 0; i < rows; i++){
        const row = document.createElement('p');
        row.setAttribute('class', 'divBricksRow');
        for (let j = 0; j < cols; j++){
            const block = document.createElement('div');
            block.setAttribute('class', 'block');
            block.setAttribute('id', 'row_' + i + '_col_' + j);
            row.appendChild(block);
        }
        canvas.appendChild(row);
    }
}

function setupPalette(palette) {
    const colorsRow = document.createElement('p');
    colorsRow.setAttribute('class', 'paletteRow noMargin');
    for (let color of CSS_COLOR_NAMES) {
        const block = document.createElement('div');
        block.setAttribute('class', 'dot');
        block.setAttribute('id', "color_" + color);
        block.style.background = color;
        colorsRow.appendChild(block);
    }
    palette.appendChild(colorsRow);

    //Color Picker
    const colorPicker = document.createElement('input');
    colorPicker.setAttribute('type','color');
    colorPicker.setAttribute('id','colorPicker');
    colorPicker.setAttribute('class','noMargin');
    const wrapper =  document.createElement('div');
    wrapper.setAttribute('id', 'colorPickerWrapper');
    wrapper.setAttribute('class', 'dot');
    wrapper.style.background = currentColor;
    wrapper.appendChild(colorPicker);

    const colorPickerLabel = document.createElement('label');
    colorPickerLabel.setAttribute('for', 'colorPickerWrapper');
    colorPickerLabel.setAttribute('id', 'colorPickerLabel');
    colorPickerLabel.setAttribute('class', 'noMargin');
    colorPickerLabel.appendChild(document.createTextNode('PICK COLOR > '));

    palette.appendChild(colorPickerLabel);
    palette.appendChild(wrapper);
    //

    //CurrentColor
    const currentColorRow = document.createElement('p');
    currentColorRow.setAttribute('id', 'currentColorRow');
    currentColorRow.setAttribute('class', 'noMargin');
    const block = document.createElement('div');
    block.setAttribute('class', 'dot');
    block.setAttribute('id', 'currentColorIndicator');
    block.style.background = currentColor;

    const label = document.createElement('label');
    label.setAttribute('for', 'currentColorIndicator');
    label.setAttribute('id', 'currentColorIndicatorLabel');
    label.setAttribute('class', 'noMargin');
    label.appendChild(document.createTextNode('CURRENT COLOR > '));

    currentColorRow.appendChild(label);
    currentColorRow.appendChild(block);

    currentColorRow.setAttribute('class', 'right noMargin');
    palette.appendChild(currentColorRow);
    //

    return wrapper;
}

function floodFill(node, targetColor, replacementColor) {
    if (targetColor === replacementColor || node.style.background !== targetColor) {
        return;
    }
    const queue = [node];
    for (let queueElement of queue) {
        let w = queueElement;
        let e = queueElement;
        while (w.previousSibling && w.previousSibling.style.background === targetColor) {
            w = w.previousSibling;
        }
        while (e.nextSibling && e.nextSibling.style.background === targetColor) {
            e = e.nextSibling;
        }
        while (w !== e.nextSibling) {
            w.style.background = replacementColor;
            w.setAttribute('class', 'filled');
            const index = Array.prototype.indexOf.call(w.parentNode.children, w);
            const n = w.parentNode.previousSibling? w.parentNode.previousSibling.children[index] : null;
            const s = w.parentNode.nextSibling? w.parentNode.nextSibling.children[index] : null;
            if (n && n.style.background === targetColor) {
                queue.push(n);
            }
            if (s && s.style.background === targetColor) {
                queue.push(s);
            }
            queue.push();
            w = w.nextSibling;
        }
    }
}
