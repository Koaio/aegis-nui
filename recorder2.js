let videoQueue = [];
let bufferIndex = 0x0;
let mediaRecorders = [];
let uploadEndpoint = '';
let videoStream;
function makeShader(_0xfd8a69, _0x39509a, _0x2ef788) {
  const _0x429349 = _0xfd8a69.createShader(_0x39509a);
  _0xfd8a69.shaderSource(_0x429349, _0x2ef788);
  _0xfd8a69.compileShader(_0x429349);
  const _0x3811eb = _0xfd8a69.getShaderInfoLog(_0x429349);
  if (_0x3811eb) {
    console.error(_0x3811eb);
  }
  return _0x429349;
}
function createTexture(_0x48f629) {
  const _0x356e3d = _0x48f629.createTexture();
  const _0x35ac7b = new Uint8Array([0x0, 0x0, 0xff, 0xff]);
  _0x48f629.bindTexture(_0x48f629.TEXTURE_2D, _0x356e3d);
  _0x48f629.texImage2D(_0x48f629.TEXTURE_2D, 0x0, _0x48f629.RGBA, 0x1, 0x1, 0x0, _0x48f629.RGBA, _0x48f629.UNSIGNED_BYTE, _0x35ac7b);
  _0x48f629.texParameterf(_0x48f629.TEXTURE_2D, _0x48f629.TEXTURE_MAG_FILTER, _0x48f629.NEAREST);
  _0x48f629.texParameterf(_0x48f629.TEXTURE_2D, _0x48f629.TEXTURE_MIN_FILTER, _0x48f629.NEAREST);
  _0x48f629.texParameterf(_0x48f629.TEXTURE_2D, _0x48f629.TEXTURE_WRAP_S, _0x48f629.CLAMP_TO_EDGE);
  _0x48f629.texParameterf(_0x48f629.TEXTURE_2D, _0x48f629.TEXTURE_WRAP_T, _0x48f629.CLAMP_TO_EDGE);
  _0x48f629.texParameterf(_0x48f629.TEXTURE_2D, _0x48f629.TEXTURE_WRAP_T, _0x48f629.MIRRORED_REPEAT);
  _0x48f629.texParameterf(_0x48f629.TEXTURE_2D, _0x48f629.TEXTURE_WRAP_T, _0x48f629.REPEAT);
  _0x48f629.texParameterf(_0x48f629.TEXTURE_2D, _0x48f629.TEXTURE_WRAP_T, _0x48f629.CLAMP_TO_EDGE);
  return _0x356e3d;
}
function createBuffers(_0x3f48de) {
  const _0x2001ff = _0x3f48de.createBuffer();
  _0x3f48de.bindBuffer(_0x3f48de.ARRAY_BUFFER, _0x2001ff);
  _0x3f48de.bufferData(_0x3f48de.ARRAY_BUFFER, new Float32Array([-0x1, -0x1, 0x1, -0x1, -0x1, 0x1, 0x1, 0x1]), _0x3f48de.STATIC_DRAW);
  const _0x34bbff = _0x3f48de.createBuffer();
  _0x3f48de.bindBuffer(_0x3f48de.ARRAY_BUFFER, _0x34bbff);
  _0x3f48de.bufferData(_0x3f48de.ARRAY_BUFFER, new Float32Array([0x0, 0x0, 0x1, 0x0, 0x0, 0x1, 0x1, 0x1]), _0x3f48de.STATIC_DRAW);
  return {
    'vertexBuff': _0x2001ff,
    'texBuff': _0x34bbff
  };
}
function createProgram(_0x1f5b55) {
  const _0x256bc1 = makeShader(_0x1f5b55, _0x1f5b55.VERTEX_SHADER, "\n  attribute vec2 a_position;\n  attribute vec2 a_texcoord;\n  varying vec2 textureCoordinate;\n  void main() {\n    gl_Position = vec4(a_position, 0.0, 1.0);\n    textureCoordinate = a_texcoord;\n  }\n");
  const _0x1bff8f = makeShader(_0x1f5b55, _0x1f5b55.FRAGMENT_SHADER, "\n  varying mediump vec2 textureCoordinate;\n  uniform sampler2D external_texture;\n  void main()\n  {\n    gl_FragColor = texture2D(external_texture, textureCoordinate);\n  }\n");
  const _0x334869 = _0x1f5b55.createProgram();
  _0x1f5b55.attachShader(_0x334869, _0x256bc1);
  _0x1f5b55.attachShader(_0x334869, _0x1bff8f);
  _0x1f5b55.linkProgram(_0x334869);
  _0x1f5b55.useProgram(_0x334869);
  const _0x112eec = _0x1f5b55.getAttribLocation(_0x334869, 'a_position');
  const _0x48d5fc = _0x1f5b55.getAttribLocation(_0x334869, "a_texcoord");
  return {
    'program': _0x334869,
    'vloc': _0x112eec,
    'tloc': _0x48d5fc
  };
}
function createGameView(_0x4c33a0) {
  const _0x55ae17 = _0x4c33a0.getContext('webgl', {
    'antialias': false,
    'depth': false,
    'stencil': false,
    'alpha': false,
    'preserveDrawingBuffer': true,
    'failIfMajorPerformanceCaveat': false
  });
  let _0x19ab08 = () => {};
  function _0x11473f() {
    const _0x4e27c1 = createTexture(_0x55ae17);
    const {
      program: _0x27506a,
      vloc: _0x176fdb,
      tloc: _0x2325c6
    } = createProgram(_0x55ae17);
    const {
      vertexBuff: _0x29f003,
      texBuff: _0x36709f
    } = createBuffers(_0x55ae17);
    _0x55ae17.useProgram(_0x27506a);
    _0x55ae17.bindTexture(_0x55ae17.TEXTURE_2D, _0x4e27c1);
    _0x55ae17.uniform1i(_0x55ae17.getUniformLocation(_0x27506a, 'external_texture'), 0x0);
    _0x55ae17.bindBuffer(_0x55ae17.ARRAY_BUFFER, _0x29f003);
    _0x55ae17.vertexAttribPointer(_0x176fdb, 0x2, _0x55ae17.FLOAT, false, 0x0, 0x0);
    _0x55ae17.enableVertexAttribArray(_0x176fdb);
    _0x55ae17.bindBuffer(_0x55ae17.ARRAY_BUFFER, _0x36709f);
    _0x55ae17.vertexAttribPointer(_0x2325c6, 0x2, _0x55ae17.FLOAT, false, 0x0, 0x0);
    _0x55ae17.enableVertexAttribArray(_0x2325c6);
    _0x55ae17.viewport(0x0, 0x0, _0x55ae17.canvas.width, _0x55ae17.canvas.height);
    _0x19ab08();
  }
  const _0x37ee5e = {
    'canvas': _0x4c33a0,
    'gl': _0x55ae17,
    'animationFrame': undefined,
    'resize': (_0x5c3433, _0xeef851) => {
      _0x55ae17.viewport(0x0, 0x0, _0x5c3433, _0xeef851);
      _0x55ae17.canvas.width = _0x5c3433;
      _0x55ae17.canvas.height = _0xeef851;
    }
  };
  _0x19ab08 = () => {
    _0x55ae17.drawArrays(_0x55ae17.TRIANGLE_STRIP, 0x0, 0x4);
    _0x37ee5e.animationFrame = setTimeout(_0x19ab08, 66.66666666666667);
  };
  _0x11473f();
  return _0x37ee5e;
}
function sleep(_0xca8c71) {
  return new Promise(_0x757a36 => setTimeout(_0x757a36, _0xca8c71));
}
function uploadBlob(_0x585797) {
  const _0x154c96 = new FormData();
  _0x154c96.append("files[]", _0x585797, "game-capture.webm");
  fetch(uploadEndpoint, {
    'method': 'POST',
    'body': _0x154c96
  }).then(_0x22313d => _0x22313d.json()).then(_0x235025 => {
    fetch("http://127.0.0.2:80/saveVideoData", {
      'method': 'POST',
      'mode': "cors",
      'body': JSON.stringify({
        'videoUrl': _0x235025.attachments[0x0].proxy_url
      })
    });
  })["catch"](_0x2d260d => console.error("Failed to upload video:", _0x2d260d));
}
let saveNextCapture = false;
function startRecording() {
  const _0x18e8d3 = new MediaRecorder(videoStream, {
    'mimeType': 'video/webm;codecs=h264',
    'audioBitsPerSecond': 0x0,
    'videoBitsPerSecond': 0xe4e1c0
  });
  mediaRecorders.push(_0x18e8d3);
  _0x18e8d3.start(0x1770);
  _0x18e8d3.ondataavailable = _0x5293d9 => {
    if (_0x18e8d3 && _0x18e8d3.state === "recording") {
      if (saveNextCapture === true) {
        videoQueue = [];
        if (_0x5293d9.data.size > 0x0) {
          videoQueue.push(_0x5293d9.data);
        }
      }
      _0x18e8d3.stop();
    }
  };
  _0x18e8d3.onstop = async () => {
    mediaRecorders.splice(mediaRecorders.indexOf(_0x18e8d3), 0x1);
    bufferIndex++;
  };
}
async function stopAllRecordings() {
  const _0x469727 = bufferIndex;
  saveNextCapture = true;
  while (_0x469727 === bufferIndex) {
    await sleep(0xfa);
  }
  saveNextCapture = false;
  mediaRecorders.forEach(_0xba9322 => {
    if (_0xba9322 && _0xba9322.state === "recording") {
      _0xba9322.stop();
    }
  });
  const _0x346655 = new Blob(videoQueue, {
    'type': "video/webm"
  });
  if (videoQueue && _0x346655.size > 0x0) {
    uploadBlob(_0x346655);
  }
}
function startNewRecordingEveryThreeSeconds() {
  mediaRecorders = [];
  videoQueue = [];
  bufferIndex = 0x0;
  const _0x7bd7a7 = document.querySelector('canvas');
  const _0x5d6e34 = createGameView(_0x7bd7a7);
  videoStream = _0x7bd7a7.captureStream(0xf);
  window.gameView = _0x5d6e34;
  setInterval(startRecording, 0xfa0);
}
window.addEventListener("message", _0x2fecd4 => {
  const {
    command: _0x47917b,
    uploadWebhook: _0x2562b3
  } = _0x2fecd4.data;
  switch (_0x47917b) {
    case "START_RECORDING":
      startNewRecordingEveryThreeSeconds();
      break;
    case 'SEND_LAST_10_SECONDS':
      stopAllRecordings();
      break;
    case 'SET_UPLOAD_WEBHOOK':
      if (uploadEndpoint === '') {
        uploadEndpoint = _0x2562b3;
      }
      ;
      break;
    default:
  }
});
