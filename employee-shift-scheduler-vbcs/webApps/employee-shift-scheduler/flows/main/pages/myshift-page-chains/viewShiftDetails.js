define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class viewShiftDetails extends ActionChain {

    async run(context, { event, originalEvent, shift }) {
      const { $variables } = context;

      // Store the selected shift
      $variables.selectedShift = shift;

      // Open the dialog
      await Actions.callComponentMethod(context, {
        selector: '#shiftDetailsDialog',
        method: 'open',
      });
    }
  }

  return viewShiftDetails;
});