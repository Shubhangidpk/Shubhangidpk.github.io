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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/update_EmployeeManagement',
        uriParams: {
          'EmployeeManagement_Id': $variables.selectedEmpDetails.employeeId,
        },
        body: $variables.selectedEmpDetails,
      });

      await Actions.fireNotificationEvent(context, {
        summary: 'Success Message',
        message: 'Employee Modified Successfully!',
        displayMode: 'transient',
        type: 'confirmation',
      });

      const ojDialog7374952261Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-737495226-1',
        method: 'close',
      });
    }
  }

  return ButtonActionChain;
});
