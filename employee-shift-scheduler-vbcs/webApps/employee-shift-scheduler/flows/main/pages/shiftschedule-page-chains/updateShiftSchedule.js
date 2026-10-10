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

  class updateShiftSchedule extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/update_TechnicianShift',
        uriParams: {
          'TechnicianShift_Id': $variables.selectedEmployee.id,
        },
        body: $variables.selectedEmployee,
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.technicianShiftListSDP,
        refresh: null,
      });

      await Actions.fireNotificationEvent(context, {
        summary: 'Success Message',
        message: 'Employee schedule edited successfully',
        displayMode: 'transient',
        type: 'confirmation',
      });

      const ojDialog13959377711Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-1395937771-1',
        method: 'close',
      });
    }
  }

  return updateShiftSchedule;
});
