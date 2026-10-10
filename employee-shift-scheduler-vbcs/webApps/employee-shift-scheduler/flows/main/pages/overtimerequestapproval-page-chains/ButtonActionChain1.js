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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     * @param {object} params.overtimeRequest
     */
    async run(context, { event, originalEvent, overtimeRequest }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // Store the selected overtime request
      $variables.selectedOvertimeReq = overtimeRequest;

      // Update request status to Approved
      const response2 = await Actions.callRest(context, {
        endpoint: 'businessObjects/update_OverTimeRequest',
        uriParams: {
          'OverTimeRequest_Id': $variables.selectedOvertimeReq.id,
        },
        body: {
          status: 'Approved'
        },
      });

      // Decrease manager pending overtime count
      $application.variables.pendingOvertimeCountMngr =
        $application.variables.pendingOvertimeCountMngr - 1;

      // Success notification
      await Actions.fireNotificationEvent(context, {
        summary: 'Success Message',
        message: 'Overtime Request Approved Successfully!',
        displayMode: 'transient',
        type: 'confirmation',
      });

      // Return to Manager Home
      await Actions.navigateToPage(context, {
        page: 'managerhome',
      });
    }
  }

  return ButtonActionChain1;
});