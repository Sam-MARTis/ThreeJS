precision mediump float;
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
	// gl_FragColor = vec4(vUv.xxx, 1.0 );
    gl_FragColor = vec4(mix(vec3(0), vec3(1), vUv.x), 1.0);
}

