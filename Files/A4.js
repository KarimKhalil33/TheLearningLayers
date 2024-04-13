let VSHADER_SOURCE = `
    precision mediump float;
    attribute vec4 a_Position;

    uniform mat4 u_Model;
    uniform mat4 u_View;
    uniform mat4 u_Proj;

    void main() {
        gl_Position = u_Proj * u_View * u_Model * a_Position;
        gl_PointSize = 3.0;
    }
`;

let FSHADER_SOURCE = `
    precision mediump float;

    uniform vec4 u_Color;

    void main() {
        gl_FragColor = u_Color;
    }
`;

var RAD_STEP = 0.04;
var g_last = Date.now();
const LONGI = 15;
const LATI = 15;
const BAC_NUM = 10;

function printText(text) {
    var textContainer = document.getElementById("textContainer");
    textContainer.textContent = text;
}


function main() {

    let canvas = document.getElementById("webgl");
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element");
        return;
    }
    let gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});


    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders.");
        return;
    }

    let {model_matrix} = initMvpMatrices(gl, canvas);    // Initiate Matrices


    gl.clearColor(0.0, 0.0, 0.0, 1.0);    // Set clear color and enable hidden surface removal

    gl.enable(gl.DEPTH_TEST);

    // Mouse rotation
    let mouseDown = false;
    let X;
    let Y;

    let  [vertices, indices] = sphereProp(1, [0,0,0]);
    var colors = new Float32Array(3*BAC_NUM);
    var origins = new Float32Array(3*BAC_NUM);
    let vertArr = Array.from(vertices);

    for(var i=0; i<3*BAC_NUM; i+=3){
        pnt = Math.floor(Math.random() * ( Math.floor(vertices.length/3) - 1));
        origins[i]= vertArr[pnt];
        origins[i+1]= vertArr[pnt+1];
        origins[i+2]= vertArr[pnt+2];
        colors[i] = Number(Math.random().toFixed(3));
        colors[i+1] = Number(Math.random().toFixed(3));
        colors[i+2] = Number(Math.random().toFixed(3));

       // console.log("(",origins[i],",",origins[i+1],",",origins[i+2],")");
    }
    var isAlive = new Float32Array(BAC_NUM);

    for(var i=0; i<BAC_NUM; i++){
        isAlive[i] = true;
    }


    canvas.onmousedown = function (event) {
        mouseDown = true;

        let x = event.clientX; // x coord of mouse
        let y = event.clientY; // x coord of mouse
        let rect = event.target.getBoundingClientRect();
        x = (x - rect.left - 0.5*canvas.height) / (0.5*canvas.height);
        y = (0.5*canvas.width - (y - rect.top)) / (0.5*canvas.width);
        X = x;
        Y = y;
    };

    canvas.onmousemove = function (event) {
        if (!mouseDown) {
            return;
        }

        // Get current mouse position
        let x = event.clientX; // x coordinate of a mouse pointer
        let y = event.clientY; // y coordinate of a mouse pointer
        let rect = event.target.getBoundingClientRect();
        x = (x - rect.left - canvas.height / 2) / (canvas.height / 2);
        y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

        xDiff = x - X;
        yDiff = y - Y;
        let acceleration = 1;

        model_matrix.rotate(yDiff * acceleration, -1, 0, 0);
        model_matrix.rotate(xDiff * acceleration, 0, 1, 0);
        u_Model = gl.getUniformLocation(gl.program, "u_Model");
        gl.uniformMatrix4fv(u_Model, false, model_matrix.elements);
    };

    canvas.onmouseup = function (event) {
        mouseDown = false;
        let rect = event.target.getBoundingClientRect();
        lastX = (event.clientX - rect.left - 0.5*canvas.height) / (0.5*canvas.height);
        lastY = (0.5*canvas.width - (event.clientY - rect.top)) / (0.5*canvas.width);
        if (X === lastX &&  Y === lastY) {
            // Get the color of the clicked pixel
            let pixelColor = getPixelColor(event.clientX, event.clientY,canvas, gl, colors, isAlive);
             console.log("Clicked pixel color:", pixelColor);
        }
    };


    // Animation
    var radius = 0.01;
    var startT = Date.now();
    function tick() {
        var score = Math.round(100 - ((Date.now()-startT) / 14000) * 100); //scoring based on how fast you win the game
        if (score < 0){ // if too slow, lowest score is 0
            score = 0;
            alert("YOU LOSE!!! \nScore: "+0); //if you lose you get a score of 0
            return 0;
          }
        if(done(isAlive)){
        alert("YOU WIN!!!\n SCORE: "+ score);
        return 0;
        }

        printText("Time Left: " + String(score));
        radius = updateRadius(radius);
        draw(gl, origins, colors, radius, isAlive);
        requestAnimationFrame(tick, canvas);
    }

    tick();

    

}

function draw(gl, origins, colors, radius, isAlive) {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawSphere(gl, 1, [1,0,0], [1.0, 1.0, 1.0], [0,0,0],false); //Draw the Globe
    for(var i=0; i<BAC_NUM; i++){ //Draw every bacteria
        if(isAlive[i]){
            drawSphere(gl, radius, [colors[3*i], colors[3*i +1], colors[3*i +2]], [0,0,0], [origins[3*i], origins[3*i +1], origins[3*i +2]],false);
            //drawSphere(gl, 0.5, [0.4,0.4,0.4], [0,0,0], [origins[3*i], origins[3*i +1], origins[3*i +2]], true);
        }
    }

}

// SPHERE
function drawSphere(gl, radius, sphereColor, textureColor, origin, pointsMode) {
    let [r,g,b] = textureColor;

    let [vertices, indices] = sphereProp(radius, origin);

    let n = initVertexBuffers(gl, vertices, vertices.length / 3);
    if (n < 0) {
        console.log("Failed to initiate vertex buffer.");
        return;
    }

    gl.uniform4f(gl.getUniformLocation(gl.program, "u_Color"),sphereColor[0],sphereColor[1],sphereColor[2], 1.0);

    // Write the sphere indices to the buffer object
    indices = new Uint16Array(indices);
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    // Draw sphere
    if(pointsMode){gl.drawElements(gl.POINTS, indices.length, gl.UNSIGNED_SHORT, 0);}
    else{gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);}

    // Draw grid
    if(!(r==0 & g==0 & b==0)){sphereTexture(gl, indices, textureColor);}
    
}

function sphereProp(radius, origin) {
    let [xO, yO, zO] = origin;
    let sphereVertices = [];
    let sphereIndices = [];

    for (var i = 0; i <= LONGI; i++) { //Go through the longitude in 180 degrees (top to bottom)
        let phi = (i * Math.PI) / LONGI;
        for (let j = 0; j <= LATI; j++) { //Go through the latitude in 360 degrees (all around)
            let theta = (2 * j * Math.PI) / LATI;

            //Push the vertices of the sphere
            sphereVertices.push(radius * Math.sin(phi) * Math.cos(theta) + xO);
            sphereVertices.push(radius * Math.sin(phi) * Math.sin(theta) + yO);
            sphereVertices.push(radius * Math.cos(phi) + zO);

            //Push the indices in the correct order
            sphereIndices.push(i * LATI + j);
            sphereIndices.push(i * LATI + j + LATI + 1);
            sphereIndices.push(i * LATI + j + 1);

            sphereIndices.push(i * LATI + j + LATI + 1);
            sphereIndices.push(i * LATI + j + LATI + 2);
            sphereIndices.push(i * LATI + j + 1);
        }
    }



    return [sphereVertices,sphereIndices];
}

function sphereTexture(gl, indices, textureColor) {
    let indexBuffer = gl.createBuffer();


    // Pass color to u_Color
    gl.uniform4f(gl.getUniformLocation(gl.program, "u_Color"), textureColor[0], textureColor[1], textureColor[2], 1.0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    gl.drawElements(gl.LINE_STRIP, indices.length, gl.UNSIGNED_SHORT, 0);
}

// BUFFER + MATRIX
function initVertexBuffers(gl, vertexArray, numVertices) {
    // Make array with vertices
    let vertices = new Float32Array(vertexArray);
    let n = numVertices;

    // Create buffer
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Get a_Position location
    let a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get a_Position");
        return -1;
    }

    // Pass vertices to a_Position
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}

function initMvpMatrices(gl, canvas) {
    let model_matrix = new Matrix4();
    let view_matrix = new Matrix4();
    let proj_matrix = new Matrix4();

    view_matrix.lookAt(0, 0, 7, 0, 0, 0, 0, 1, 0);
    proj_matrix.setPerspective(30, canvas.width / canvas.height, 1, 100);

    u_Model = gl.getUniformLocation(gl.program, "u_Model");
    u_View = gl.getUniformLocation(gl.program, "u_View");
    u_Proj = gl.getUniformLocation(gl.program, "u_Proj");

    gl.uniformMatrix4fv(u_Model, false, model_matrix.elements);
    gl.uniformMatrix4fv(u_View, false, view_matrix.elements);
    gl.uniformMatrix4fv(u_Proj, false, proj_matrix.elements);

    return { model_matrix, view_matrix, proj_matrix };
}

function updateRadius(radius){ //update radius
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;
    newRadius = radius + (RAD_STEP * elapsed) / 1000.0;
    return newRadius;
  }

  function getPixelColor(x, y, canvas, gl, colors, isAlive) {
    // Convert coordinates to WebGL viewport coordinates
    let rect = canvas.getBoundingClientRect();
    x = Math.round((x - rect.left) * (canvas.width / rect.width));
    y = Math.round((y - rect.top) * (canvas.height / rect.height));

    // Create a buffer to store the color value
    let pixelBuffer = new Uint8Array(4);

    // Read the color value of the pixel at the specified coordinates
    gl.readPixels(x, canvas.height - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelBuffer);
    
    var r = roundTo(pixelBuffer[0]/255);
    var g = roundTo(pixelBuffer[1]/255);
    var b = roundTo(pixelBuffer[2]/255);


    for(var i=0; i<3*BAC_NUM; i+=3){
        var rC = roundTo(colors[i]);
        var gC = roundTo(colors[i+1]);
        var bC = roundTo(colors[i+2]);
        console.log("(" + String(r) +"," + String(g) +"," + String(b) +") == (" + String(rC) + "," + String(gC) + "," + String(bC) + ")");
        if((r >= (rC-0.02) &&  r <= (rC+0.02)) && (g >= (gC-0.02) &&  g <= (gC+0.02)) && (b >= (bC-0.02) &&  b <= (bC+0.02))){
            isAlive[parseInt(i/3)] = false;
            console.log("MATCH");
        }
    }
    // Return the color as an array of [R, G, B, A] values
    return pixelBuffer;
}

function roundTo(number,val=2) {
    return parseFloat(number.toFixed(val));
}

function done(isAlive){
    var win = true;
    for(var i=0; i<isAlive.length; i++){
      if(isAlive[i] == true){
        win = false;
      }
    }
    return win;
  
  }

