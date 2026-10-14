export const instantiateTemplate = (template) => {
  return {
    ...template,
    id: `chk-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    tasks: template.tasks.map((task) => ({
      ...task,
      id: `tsk-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'To Do',
      evidenceLocked: false
    }))
  };
};