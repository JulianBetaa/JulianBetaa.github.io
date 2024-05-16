export function animateTorus(delta, torus) {
    torus.rotation.x += 0.2 * delta;
    torus.rotation.y += 0.1 * delta;
    torus.rotation.z += 0.2 * delta;
}
