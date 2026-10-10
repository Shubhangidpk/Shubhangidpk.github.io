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
     * @param {string} params.absenceRequest
     */
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

      await Actions.fireNotificationEvent(context, {
        summary: 'Error Message',
        message: 'Absence Request is rejected!',
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
