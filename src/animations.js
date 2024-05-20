export function animateTorus(delta, torus) {
    torus.rotation.x += 0.27 * delta;
    torus.rotation.y += 0.13 * delta;
    torus.rotation.z += 0.29 * delta;
}
export function animateCamera(delta, camera, move, cameraMoveSpeed) {
    if (move.forward) camera.position.z -= cameraMoveSpeed * delta;
    if (move.backward) camera.position.z += cameraMoveSpeed * delta;
    if (move.left) camera.position.x -= cameraMoveSpeed * delta;
    if (move.right) camera.position.x += cameraMoveSpeed * delta;
    if (move.up) camera.position.y += cameraMoveSpeed * delta;
    if (move.down) camera.position.y -= cameraMoveSpeed * delta;
}
