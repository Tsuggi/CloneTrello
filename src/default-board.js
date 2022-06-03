import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'description test tâche 1',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'description test tâche 2',
          name: 'second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'description test tâche 3',
          name: 'and third',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: 'description test tâche',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: 'description test tâche',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
