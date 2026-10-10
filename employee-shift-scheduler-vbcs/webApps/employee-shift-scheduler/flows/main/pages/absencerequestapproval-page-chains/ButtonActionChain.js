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

    async run(context, { event, originalEvent, absenceRequest }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // Store the selected absence request
      $variables.selectedAbsenceRequest = absenceRequest;

      // Update request status
      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/update_AbsenceRequest',
        uriParams: {
          AbsenceRequest_Id: String($variables.selectedAbsenceRequest.id),
        },
        body: {
          status: 'Approved'
        },
      });

      // Decrease manager pending count
      $application.variables.pendingAbsenceCountMngr =
        $application.variables.pendingAbsenceCountMngr - 1;

      // Success message
      await Actions.fireNotificationEvent(context, {
        summary: 'Success Message',
        message: 'Absence Request Approved Successfully!',
        displayMode: 'transient',
        type: 'confirmation',
      });

      // Return to manager home
      await Actions.navigateToPage(context, {
        page: 'managerhome',
      });
    }
  }

  return ButtonActionChain;
});