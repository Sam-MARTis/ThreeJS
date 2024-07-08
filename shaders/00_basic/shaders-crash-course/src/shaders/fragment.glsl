precision mediump float;
// uniform float uTime;
uniform float RADIUS;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	// gl_FragColor = vec4(vUv.xxx, 1.0 );
    // gl_FragColor = vec4(step(0.5, vUv.xxx), 1.0);
    // gl_FragColor = vec4(smoothstep(0.3, 0.7, vUv.xxx), 1.0);

    vec2 uvMine = vUv;
    uvMine = uvMine - 0.5;
    gl_FragColor = vec4(vec3(step(RADIUS, length(uvMine))), 1);
}

