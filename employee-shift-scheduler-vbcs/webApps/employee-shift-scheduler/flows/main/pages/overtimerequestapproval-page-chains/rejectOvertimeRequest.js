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

  class rejectOvertimeRequest extends ActionChain {

    async run(context, { event, originalEvent, overtimeRequest }) {
      const { $application, $variables } = context;

      // Store the selected overtime request
      $variables.selectedOvertimeReq = overtimeRequest;

      // Update request status to Rejected
      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/update_OverTimeRequest',

        uriParams: {
          'OverTimeRequest_Id': $variables.selectedOvertimeReq.id,
        },

        body: {
          status: 'Rejected'
        }
      });

      // Decrease manager pending overtime count
      $application.variables.pendingOvertimeCountMngr =
        $application.variables.pendingOvertimeCountMngr - 1;

      // Rejection notification
      await Actions.fireNotificationEvent(context, {
        summary: 'Request Rejected',
        message: 'Overtime Request has been rejected.',
        displayMode: 'transient',
        type: 'error',
      });

      // Return to Manager Home
      await Actions.navigateToPage(context, {
        page: 'managerhome',
      });
    }
  }

  return rejectOvertimeRequest;
});