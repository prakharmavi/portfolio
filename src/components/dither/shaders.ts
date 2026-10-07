// Adapted from React Bits Dither: https://reactbits.dev/backgrounds/dither
export const waveVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const waveFragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time, waveSpeed, waveFrequency, waveAmplitude, mouseRadius;
uniform vec3 waveColor, backgroundColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz, iy = Pi.yyww;
  vec4 fx = Pf.xzxz, fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  gx -= floor(gx + 0.5);
  vec2 g00 = vec2(gx.x, gy.x), g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z), g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade(Pf.xy).x);
  return 2.3 * mix(n_x.x, n_x.y, fade(Pf.xy).y);
}
float fbm(vec2 p) {
  float value = 0.0, amp = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amp * abs(cnoise(p));
    p *= waveFrequency;
    amp *= waveAmplitude;
  }
  return value;
}
void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy - 0.5;
  uv.x *= resolution.x / resolution.y;
  float f = fbm(uv + fbm(uv - time * waveSpeed));
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float effect = 1.0 - smoothstep(0.0, mouseRadius, length(uv - mouseNDC));
    f -= 0.5 * effect;
  }
  gl_FragColor = vec4(mix(backgroundColor, waveColor, clamp(f, 0.0, 1.0)), 1.0);
}
`;

export const ditherFragmentShader = `
precision highp float;
uniform float colorNum, pixelSize;
const float bayerMatrix8x8[64] = float[64](
  0.0,48.0,12.0,60.0,3.0,51.0,15.0,63.0,
  32.0,16.0,44.0,28.0,35.0,19.0,47.0,31.0,
  8.0,56.0,4.0,52.0,11.0,59.0,7.0,55.0,
  40.0,24.0,36.0,20.0,43.0,27.0,39.0,23.0,
  2.0,50.0,14.0,62.0,1.0,49.0,13.0,61.0,
  34.0,18.0,46.0,30.0,33.0,17.0,45.0,29.0,
  10.0,58.0,6.0,54.0,9.0,57.0,5.0,53.0,
  42.0,26.0,38.0,22.0,41.0,25.0,37.0,21.0
);
vec3 dither(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0)), y = int(mod(scaledCoord.y, 8.0));
  float threshold = bayerMatrix8x8[y * 8 + x] / 64.0 - 0.25;
  color += threshold / (colorNum - 1.0);
  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float bias = mix(0.2, 0.0, smoothstep(0.45, 0.8, luminance));
  color = clamp(color - bias, 0.0, 1.0);
  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}
void mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {
  vec2 normalizedPixelSize = pixelSize / resolution;
  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);
  vec4 color = texture2D(inputBuffer, uvPixel);
  outputColor = vec4(dither(uv, color.rgb), color.a);
}
`;
