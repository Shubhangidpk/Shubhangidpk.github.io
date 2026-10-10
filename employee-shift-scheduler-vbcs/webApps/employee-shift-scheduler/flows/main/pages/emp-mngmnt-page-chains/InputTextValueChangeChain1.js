define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  class SearchEmployeeActionChain extends ActionChain {

    async run(context, { event }) {
      const { $variables } = context;

      const searchText = (event.detail.value || '').trim();

      // Clear search → show all employees
      if (!searchText) {
        $variables.employeeFilter = {};
        return;
      }

      // Search Employee ID OR Employee Name
      $variables.employeeFilter = {
        op: '$or',
        criteria: [
          {
            op: '$sw',
            attribute: 'employeeId',
            value: searchText
          },
          {
            op: '$sw',
            attribute: 'employeeName',
            value: searchText
          }
        ]
      };
    }
  }

  return SearchEmployeeActionChain;
});