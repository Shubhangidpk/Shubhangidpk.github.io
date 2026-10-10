define([
  'vb/action/actionChain',
  'vb/action/actions',
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class SelectValueItemChangeChain1 extends ActionChain {

    async run(context, {
      event,
      previousValue,
      value,
      updatedFrom,
      key,
      data,
      metadata,
      valueItem
    }) {

      const { $variables } = context;

      // Selected employee record (empty when the search is cleared)
      const selected = valueItem?.data || data;

      if (selected && selected.employeeId) {
        // Employee selected: filter the table to that employee
        $variables.employeeTableFilter = {
          op: '$eq',
          attribute: 'employeeId',
          value: selected.employeeId,
        };
      } else {
        // Search cleared: remove the filter so all employees show again
        $variables.employeeTableFilter = {};
      }

      // Reload the table's SDP with the new filter
      await Actions.fireDataProviderEvent(context, {
        target: $variables.employeeManagementListSDP,
        refresh: null,
      });
    }
  }

  return SelectValueItemChangeChain1;
});