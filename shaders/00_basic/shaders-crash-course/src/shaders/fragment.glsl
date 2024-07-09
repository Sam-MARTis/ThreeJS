precision mediump float;
// uniform float uTime;
uniform float RADIUS;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 colourToUse;


varying vec3 vDisplacement;





void main() {
	// gl_FragColor = vec4(vUv.xxx, 1.0 );
    // gl_FragColor = vec4(step(0.5, vUv.xxx), 1.0);
    // gl_FragColor = vec4(smoothstep(0.3, 0.7, vUv.xxx), 1.0);


    // vec3 valToUse = vec3(smoothstep(0.3, 0.7, (0.5+0.5*sin((vNorTrans.xxx)*30.0))));
    gl_FragColor = vec4(vDisplacement, 1);
}

