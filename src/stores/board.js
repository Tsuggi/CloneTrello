import { defineStore } from "pinia";
import default_board from "../default-board.js";
import { useStorage } from "@vueuse/core";
import { uuid } from "../utils.js";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    board: useStorage("BoardInStorage", default_board),
  }),

  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    },
  },

  actions: {
    CREATE_TASK(nom, colonne) {
      //  this.board.columns[index].tasks.push({
      //    name: nom,
      //    description: "Create Task",
      //    id: uuid(),
      //    userAssigned: null,
      //  });
      colonne.push({
        name: nom,
        description: "Create Task",
        id: uuid(),
        userAssigned: null,
      });
    },
    UPDATE_TASK(task, property, value) {
      task[property] = value;
    },
    DELETE_TASK(task, index){
      task.splice(index,1);
    },
    MOVE_TASK (fromColumn, toColumn, taskIndex){
      const taskToMove = fromColumn.splice(taskIndex, 1)[0];
      toColumn.push(taskToMove);
    }
  }
});
