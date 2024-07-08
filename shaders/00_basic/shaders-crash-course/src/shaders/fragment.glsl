precision mediump float;
// uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	// gl_FragColor = vec4(vUv.xxx, 1.0 );
    // gl_FragColor = vec4(step(0.5, vUv.xxx), 1.0);
    gl_FragColor = vec4(smoothstep(0.3, 0.7, vUv.xxx), 1.0);
}

