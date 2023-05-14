module.exports = {
  name: 'employees',
  exposes: {
    './Module': 'apps/employees/src/app/remote-entry/entry.module.ts',
  },
};
