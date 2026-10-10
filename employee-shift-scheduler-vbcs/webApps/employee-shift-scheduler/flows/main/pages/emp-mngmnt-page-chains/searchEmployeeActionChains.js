define([
  'vb/action/actionChain',
], (ActionChain) => {
  'use strict';

  class SearchEmployeeActionChain extends ActionChain {

    async run(context, { event }) {
      const { $variables } = context;

      const searchText = (event.detail.value || '').trim();

      if (!searchText) {
        $variables.employeeFilter = {};
        return;
      }

      $variables.employeeFilter = {
        op: '$or',
        criteria: [
          {
            op: '$co',
            attribute: 'employeeId',
            value: searchText
          },
          {
            op: '$co',
            attribute: 'employeeName',
            value: searchText
          }
        ]
      };
    }
  }

  return SearchEmployeeActionChain;
});