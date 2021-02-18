import gaussianFrag from './glsl/dog.frag'
import gaussianVert from './glsl/dog.vert'


const filterSize = 2;
const gaussian = (sigma: number, x: number, y: number) => {
    const coefficient = 1 / (Math.PI * 2 * (sigma ** 2));
    const exp = Math.exp(-1 * (x ** 2 + y ** 2) / (2 * (sigma ** 2)));
    return coefficient * exp;
}

// ガウシアンフィルタ(ぼかし)
const gaussianFilter = (r: number, sigma: number) => {
    const kernelArray = new Array<number>();
    let weightSum = 0.0;
    for (let y = -r; y <= r; y++) {
        for (let x = -r; x <= r; x++) {
            const weight = gaussian(sigma, x, y);
            weightSum += weight;
            kernelArray.push(weight);
        }
    }

    return kernelArray.map(value => { return value / weightSum });
}


const gauss3 = gaussianFilter(filterSize, 1)

const gauss5 = gaussianFilter(filterSize, 3)

// ガウス差分
export const weightArray = gauss5.map((value, index) => {
    return value - gauss3[index];
});

export const DOGShader = {
    uniforms: {

        "tDiffuse": { value: null },
        "weight": { value: weightArray },

    },
    vertexShader: gaussianVert,
    fragmentShader: gaussianFrag
}
