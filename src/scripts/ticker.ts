/**
 * Un solo bucle requestAnimationFrame para todo el sitio.
 * Cada tarea devuelve `true` mientras necesite más frames; cuando todas terminan, el bucle se detiene.
 */
type Task = (time: number) => boolean;

const tasks = new Set<Task>();
let running = false;

function loop(time: number): void {
  for (const task of tasks) if (!task(time)) tasks.delete(task);
  if (tasks.size) requestAnimationFrame(loop);
  else running = false;
}

export function wake(task: Task): void {
  tasks.add(task);
  if (!running) {
    running = true;
    requestAnimationFrame(loop);
  }
}
