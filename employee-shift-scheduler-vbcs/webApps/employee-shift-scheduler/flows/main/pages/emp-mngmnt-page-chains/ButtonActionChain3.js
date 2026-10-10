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

  class ButtonActionChain3 extends ActionChain {

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
        status: 'Inactive',
        body: {
       "status": "Inactive"
      },
      });

      await Actions.fireNotificationEvent(context, {
        summary: 'Success Message',
        message: 'Employee has been Inactivated successfully',
        displayMode: 'transient',
        type: 'confirmation',
      });

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.employeeManagementListSDP,
      });

      const ojDialog7374952262Close = await Actions.callComponentMethod(context, {
        selector: '#oj-dialog-737495226-2',
        method: 'close',
      });
    }
  }

  return ButtonActionChain3;
});
