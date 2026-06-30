const VERTEX_SHADER = `#version 300 es
precision highp float;

const vec2 positions[6] = vec2[6](
  vec2(-1.0, -1.0),
  vec2(1.0, -1.0),
  vec2(-1.0, 1.0),
  vec2(-1.0, 1.0),
  vec2(1.0, -1.0),
  vec2(1.0, 1.0)
);

out vec2 vUv;

void main() {
  vec2 position = positions[gl_VertexID];
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform sampler2D u_image;
uniform float u_imageAspect;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_velocity;
uniform float u_wake;
uniform float u_strength;
uniform float u_engage;
uniform float u_ambientEngage;
uniform float u_radiusX;
uniform float u_radiusY;

in vec2 vUv;
out vec4 fragColor;

vec2 coverUV(vec2 uv) {
  float viewAspect = u_resolution.x / u_resolution.y;

  if (viewAspect > u_imageAspect) {
    float scale = viewAspect / u_imageAspect;
    uv.y = (uv.y - 0.5) / scale + 0.5;
  } else {
    float scale = u_imageAspect / viewAspect;
    uv.x = (uv.x - 0.5) / scale + 0.5;
  }

  return uv;
}

float mirrorAxis(float v) {
  float a = abs(v);
  a = mod(a, 2.0);
  return a <= 1.0 ? a : 2.0 - a;
}

vec2 mirrorUV(vec2 uv) {
  return vec2(mirrorAxis(uv.x), mirrorAxis(uv.y));
}

float edgeGuard(vec2 uv) {
  float margin = 0.042;
  float x = smoothstep(0.0, margin, uv.x) * smoothstep(0.0, margin, 1.0 - uv.x);
  float y = smoothstep(0.0, margin, uv.y) * smoothstep(0.0, margin, 1.0 - uv.y);
  return x * y;
}

float ambientWeight(vec2 uv) {
  float edge = edgeGuard(uv);
  float dist = length(uv - 0.5) * 1.414213562;
  float radial = 1.0 - smoothstep(0.18, 0.82, dist);
  float center = mix(0.48, 1.22, radial);
  return edge * center;
}

vec2 ambientIdle(vec2 p) {
  float t = u_time;
  float e = u_ambientEngage;

  float waveX = sin(t * 0.19 + p.y * 3.2) * 0.024
              + sin(t * 0.11 + p.y * 5.8 + 1.2) * 0.014;
  float waveY = sin(t * 0.23 + p.x * 2.6 + 0.8) * 0.018
              + cos(t * 0.14 + p.x * 4.4) * 0.012;

  float sway = sin(t * 0.27) * 0.019;
  vec2 offset = vec2(waveX + sway, waveY + sway * 0.7);

  offset *= ambientWeight(p) * e;

  return p + offset;
}

vec2 rippleWarp(vec2 p) {
  float energy = max(u_strength, u_wake);
  if (energy < 0.001) {
    return p;
  }

  vec2 toMouse = p - u_mouse;
  float dist = length(toMouse);
  vec2 dir = dist > 0.0001 ? toMouse / dist : vec2(0.0);

  float ellipse = (toMouse.x * toMouse.x) / (u_radiusX * u_radiusX)
                + (toMouse.y * toMouse.y) / (u_radiusY * u_radiusY);
  float zone = exp(-ellipse * 0.95);
  float influence = zone * energy;

  float speed = length(u_velocity);
  vec2 vel = normalize(u_velocity + vec2(0.0001));
  float along = dot(toMouse, vel);

  float expandBase = 0.23 + min(speed * 0.024, 0.055);
  float expandShape = 0.2 + 0.8 * smoothstep(0.0, 0.11, dist);
  vec2 offset = toMouse * expandBase * zone * expandShape * u_engage;

  float trailMask = smoothstep(0.0, -0.04, along) * zone;
  offset += vel * trailMask * min(speed * 0.0005, 0.0015) * energy * u_engage;

  float ring = smoothstep(0.07, 0.12, dist) * (1.0 - smoothstep(0.2, 0.28, dist));
  float phase = dist * 13.0 - u_time * 0.12 + along * 1.5;
  offset += dir * sin(phase) * ring * influence * 0.0011 * u_engage * u_engage;

  offset *= edgeGuard(p);

  return p + offset;
}

vec2 warpUV(vec2 uv) {
  return rippleWarp(ambientIdle(uv));
}

void main() {
  vec2 imageUV = mirrorUV(coverUV(warpUV(vUv)));
  fragColor = texture(u_image, imageUV);
}
`;

type HeroCursorShaderOptions = {
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  maxPixelCount?: number;
};

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error('Could not create shader');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? 'Unknown shader error';
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();

  if (!program) {
    throw new Error('Could not create program');
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? 'Unknown program error';
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

function getDrawSize(canvas: HTMLCanvasElement, maxPixelCount: number): { width: number; height: number } {
  const rect = canvas.getBoundingClientRect();
  const baseDpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = Math.max(1, Math.round(rect.width * baseDpr));
  let height = Math.max(1, Math.round(rect.height * baseDpr));
  const pixelCount = width * height;

  if (pixelCount > maxPixelCount) {
    const scale = Math.sqrt(maxPixelCount / pixelCount);
    width = Math.max(1, Math.round(width * scale));
    height = Math.max(1, Math.round(height * scale));
  }

  return { width, height };
}

function lerp(current: number, target: number, amount: number): number {
  return current + (target - current) * amount;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

const INIT_RIPPLE_CAP = 0.08;
const INITIAL_RAMP_MS = 800;
const INITIAL_MOVE_DIST = 0.1;
const AMBIENT_RAMP_MS = 2800;
const INIT_AMBIENT_CAP = 0;

export function createHeroCursorShader({ canvas, image, maxPixelCount = 1_500_000 }: HeroCursorShaderOptions) {
  const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, depth: false, stencil: false });

  if (!gl) {
    throw new Error('WebGL2 is not available');
  }

  const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
  const texture = gl.createTexture();

  if (!texture) {
    throw new Error('Could not create texture');
  }

  gl.useProgram(program);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  const uniforms = {
    resolution: gl.getUniformLocation(program, 'u_resolution'),
    image: gl.getUniformLocation(program, 'u_image'),
    imageAspect: gl.getUniformLocation(program, 'u_imageAspect'),
    time: gl.getUniformLocation(program, 'u_time'),
    mouse: gl.getUniformLocation(program, 'u_mouse'),
    velocity: gl.getUniformLocation(program, 'u_velocity'),
    wake: gl.getUniformLocation(program, 'u_wake'),
    strength: gl.getUniformLocation(program, 'u_strength'),
    engage: gl.getUniformLocation(program, 'u_engage'),
    ambientEngage: gl.getUniformLocation(program, 'u_ambientEngage'),
    radiusX: gl.getUniformLocation(program, 'u_radiusX'),
    radiusY: gl.getUniformLocation(program, 'u_radiusY'),
  };

  gl.uniform1i(uniforms.image, 0);
  gl.uniform1f(uniforms.radiusX, 0.12);
  gl.uniform1f(uniforms.radiusY, 0.19);
  gl.uniform1f(uniforms.engage, 1);
  gl.uniform1f(uniforms.ambientEngage, 0);
  gl.uniform1f(uniforms.imageAspect, image.naturalWidth / image.naturalHeight);

  let rafId = 0;
  let disposed = false;
  let paused = false;
  let drawSize = getDrawSize(canvas, maxPixelCount);
  const startTime = performance.now();
  let lastFrameTime = performance.now();
  let lastMoveTime = performance.now();
  let lastTargetX = 0.5;
  let lastTargetY = 0.5;
  let hasMouseSample = false;
  let frameCount = 0;
  let onReady: (() => void) | null = null;
  let hasEngagedOnce = false;
  let isInitialApproach = false;
  let engageBlend = 0;
  let initialApproachStart = 0;
  let initialMoveDist = 0;
  let isAmbientRamp = false;
  let hasAmbientRamped = false;
  let ambientApproachStart = 0;

  const target = {
    mouseX: 0.5,
    mouseY: 0.5,
    influence: 0,
    viewport: 1,
    wake: 0,
  };

  const smooth = {
    mouseX: 0.5,
    mouseY: 0.5,
    velocityX: 0,
    velocityY: 0,
    shaderVelX: 0,
    shaderVelY: 0,
    strength: 0,
    wake: 0,
    viewport: 1,
  };

  const MOUSE_LAG_TAU = 0.12;
  const WAKE_LAG_TAU = 0.32;
  const SHADER_VEL_TAU = 0.28;
  const STRENGTH_TAU = 0.12;
  const VIEWPORT_TAU = 0.15;
  const SETTLE_SNAP = 0.0015;

  const resize = () => {
    drawSize = getDrawSize(canvas, maxPixelCount);
    canvas.width = drawSize.width;
    canvas.height = drawSize.height;
    gl.viewport(0, 0, drawSize.width, drawSize.height);
  };

  const render = (now: number) => {
    if (disposed) {
      return;
    }

    rafId = requestAnimationFrame(render);

    const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
    lastFrameTime = now;
    const elapsed = (now - startTime) / 1000;

    if (paused) {
      return;
    }

    const strengthFollow = 1 - Math.exp(-dt / STRENGTH_TAU);
    const viewportFollow = 1 - Math.exp(-dt / VIEWPORT_TAU);
    const velocityDecay = Math.pow(0.945, dt * 60);
    const mouseFollow = 1 - Math.exp(-dt / MOUSE_LAG_TAU);
    const wakeFollow = 1 - Math.exp(-dt / WAKE_LAG_TAU);
    const shaderVelFollow = 1 - Math.exp(-dt / SHADER_VEL_TAU);

    smooth.viewport = lerp(smooth.viewport, target.viewport, viewportFollow);

    const rippleDx = target.mouseX - smooth.mouseX;
    const rippleDy = target.mouseY - smooth.mouseY;
    const lagDist = Math.hypot(rippleDx, rippleDy);

    let strengthTarget = target.influence * smooth.viewport;
    let shaderEngage: number;

    if (isInitialApproach) {
      const timeProgress = clamp((now - initialApproachStart) / INITIAL_RAMP_MS, 0, 1);
      const moveProgress = clamp(initialMoveDist / INITIAL_MOVE_DIST, 0, 1);
      engageBlend = Math.max(timeProgress, moveProgress);
      engageBlend = smoothstep(0, 1, engageBlend);
      const rippleScale = lerp(INIT_RIPPLE_CAP, 1, engageBlend);
      shaderEngage = lerp(0.04, 1, engageBlend);
      strengthTarget *= rippleScale;

      if (engageBlend >= 1) {
        isInitialApproach = false;
        hasEngagedOnce = true;
      }
    } else {
      engageBlend = 1;
      shaderEngage = 1;
    }

    let ambientEngage = hasAmbientRamped ? 1 : 0;
    if (isAmbientRamp) {
      const ambientProgress = clamp((now - ambientApproachStart) / AMBIENT_RAMP_MS, 0, 1);
      const ambientBlend = smoothstep(0, 1, smoothstep(0, 1, ambientProgress));
      ambientEngage = lerp(INIT_AMBIENT_CAP, 1, ambientBlend);

      if (ambientBlend >= 1) {
        isAmbientRamp = false;
        hasAmbientRamped = true;
      }
    }

    const velMag = Math.hypot(smooth.velocityX, smooth.velocityY);
    target.wake = clamp(velMag * 0.055, 0, 1) * strengthTarget * engageBlend;

    if (lagDist < SETTLE_SNAP) {
      smooth.mouseX = target.mouseX;
      smooth.mouseY = target.mouseY;
    } else {
      smooth.mouseX = lerp(smooth.mouseX, target.mouseX, mouseFollow);
      smooth.mouseY = lerp(smooth.mouseY, target.mouseY, mouseFollow);
    }

    smooth.strength = lerp(smooth.strength, strengthTarget, strengthFollow);
    smooth.velocityX *= velocityDecay;
    smooth.velocityY *= velocityDecay;
    smooth.shaderVelX = lerp(smooth.shaderVelX, smooth.velocityX, shaderVelFollow);
    smooth.shaderVelY = lerp(smooth.shaderVelY, smooth.velocityY, shaderVelFollow);
    smooth.wake = lerp(smooth.wake, target.wake, wakeFollow);

    gl.useProgram(program);
    gl.uniform2f(uniforms.resolution, drawSize.width, drawSize.height);
    gl.uniform1f(uniforms.time, elapsed);
    gl.uniform2f(uniforms.mouse, smooth.mouseX, smooth.mouseY);
    gl.uniform2f(uniforms.velocity, smooth.shaderVelX, smooth.shaderVelY);
    gl.uniform1f(uniforms.wake, smooth.wake);
    gl.uniform1f(uniforms.strength, smooth.strength);
    gl.uniform1f(uniforms.engage, shaderEngage);
    gl.uniform1f(uniforms.ambientEngage, ambientEngage);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    frameCount += 1;

    if (frameCount === 1 && onReady) {
      onReady();
      onReady = null;
    }
  };

  resize();
  rafId = requestAnimationFrame(render);

  const resizeObserver = new ResizeObserver(() => {
    resize();
  });

  resizeObserver.observe(canvas);

  return {
    setMouse(x: number, y: number) {
      if (!hasMouseSample) {
        target.mouseX = x;
        target.mouseY = y;
        lastTargetX = x;
        lastTargetY = y;
        hasMouseSample = true;
        lastMoveTime = performance.now();
        return;
      }

      if (isInitialApproach) {
        initialMoveDist += Math.hypot(x - lastTargetX, y - lastTargetY);
      }

      const now = performance.now();
      const dt = Math.max((now - lastMoveTime) / 1000, 0.008);
      const impulseX = (x - lastTargetX) / dt;
      const impulseY = (y - lastTargetY) / dt;

      smooth.velocityX = lerp(smooth.velocityX, impulseX, 0.13);
      smooth.velocityY = lerp(smooth.velocityY, impulseY, 0.13);
      smooth.velocityX = clamp(smooth.velocityX, -4, 4);
      smooth.velocityY = clamp(smooth.velocityY, -4, 4);

      lastMoveTime = now;
      lastTargetX = x;
      lastTargetY = y;
      target.mouseX = x;
      target.mouseY = y;
    },
    setInfluence(influence: number) {
      const clamped = clamp(influence, 0, 1);
      const entering = target.influence < 0.001 && clamped > 0.001;

      if (entering) {
        smooth.velocityX = 0;
        smooth.velocityY = 0;
        smooth.shaderVelX = 0;
        smooth.shaderVelY = 0;
        smooth.wake = 0;
        target.wake = 0;

        if (hasEngagedOnce) {
          smooth.mouseX = target.mouseX;
          smooth.mouseY = target.mouseY;
          engageBlend = 1;
        } else {
          isInitialApproach = true;
          engageBlend = 0;
          initialApproachStart = performance.now();
          initialMoveDist = 0;
          smooth.mouseX = target.mouseX;
          smooth.mouseY = target.mouseY;
        }
      }

      target.influence = clamped;
    },
    setViewport(visible: boolean) {
      target.viewport = visible ? 1 : 0;
    },
    setPaused(isPaused: boolean) {
      paused = isPaused;
    },
    beginAmbientRamp() {
      if (hasAmbientRamped || isAmbientRamp) {
        return;
      }

      isAmbientRamp = true;
      ambientApproachStart = performance.now();
    },
    whenReady(callback: () => void) {
      if (frameCount > 0) {
        callback();
        return;
      }

      onReady = callback;
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    },
  };
}
