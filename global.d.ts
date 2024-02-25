/// <reference types="vite/client" />

// additional import types not included in vite/client

declare module '*.glsl' {
  const src: string;
  export default src;
}

declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.gltf' {
  const src: string;
  export default src;
}
