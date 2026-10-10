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
     * @param {object} params.absenceRequest
     */
    async run(context, { event, originalEvent, overtimeRequest }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      // Store the selected absence request
      $variables.selectedOvertimeReq = overtimeRequest;

      // Update request status
      const response2 = await Actions.callRest(context, {
        endpoint: 'businessObjects/update_OverTimeRequest',
        uriParams: {
          'OverTimeRequest_Id': $variables.selectedOvertimeReq.id,
        },
        
      });

      // Decrease manager pending count
      $application.variables.pendingOvertimeCountMngr =
        $application.variables.pendingOvertimeCountMngr - 1;

      await Actions.fireNotificationEvent(context, {
        summary: 'Error Message',
        message: 'Overtime Request is rejected!',
        displayMode: 'transient',
        type: 'error',
      });

      // Return to manager home
      await Actions.navigateToPage(context, {
        page: 'managerhome',
      });
    }
  }

  return ButtonActionChain1;
});
