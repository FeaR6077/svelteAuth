<script lang="ts">
  import { tasks } from "../stores/auth";
  import type { taskType } from "../types/taskType";
  export let task: any;

  let isChecked: boolean;

  const taskDone = () => {
    console.log(isChecked);

    let updatedTasks: string[] = $tasks.map((currentTask) => {
      if (currentTask.id === task.id) {
        currentTask.completed = isChecked;
        return currentTask;
      }
      return currentTask;
    });

    tasks.set(updatedTasks);
    console.log($tasks);
  };
</script>

<main>
  <li class="list-group-item">
    <input
      type="checkbox"
      class="form-check-input"
      id="exampleCheck1"
      bind:checked={isChecked}
      on:change={(e) => taskDone(e)}
    />
    <span class:completed={task.completed}>{task.description}</span>
  </li>
</main>

<style>
  .completed {
    color: red;
    text-decoration: line-through;
  }
</style>
