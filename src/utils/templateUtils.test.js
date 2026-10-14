import { instantiateTemplate } from './templateUtils';

describe('Template Instantiation Logic', () => {
  it('generates unique IDs to prevent React rendering conflicts in myChecklists state', () => {
    const mockTemplate = {
      id: 'template-deploy-auth',
      name: 'Deploy Auth Changes',
      tasks: [
        { id: 't-1', name: 'Create Work Branch', status: 'Template', evidenceLocked: true }
      ]
    };

    const newChecklist = instantiateTemplate(mockTemplate);

    // 1. Verifies the new checklist ID differs from the template
    expect(newChecklist.id).not.toBe(mockTemplate.id);
    expect(newChecklist.id).toMatch(/^chk-\d+-\d+$/);
    
    // 2. Verifies task IDs are regenerated for safe state insertion
    expect(newChecklist.tasks[0].id).not.toBe(mockTemplate.tasks[0].id);
    
    // 3. Verifies task properties are reset for the active workspace
    expect(newChecklist.tasks[0].status).toBe('To Do');
    expect(newChecklist.tasks[0].evidenceLocked).toBe(false);
  });
});