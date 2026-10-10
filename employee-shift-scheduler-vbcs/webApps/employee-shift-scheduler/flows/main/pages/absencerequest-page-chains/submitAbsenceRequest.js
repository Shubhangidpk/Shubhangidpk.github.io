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

  class submitAbsenceRequest extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response2 = await Actions.callRest(context, {
        endpoint: 'businessObjects/create_AbsenceRequest',
        employeeName: $application.variables.loggedInUser.name,
        absenceDate: $variables.absenceDate,
        reason: $variables.reason,
        status: 'Pending',
        body: { "employeeId": $application.variables.loggedInUser.employeeId,
              "employeeName": $application.variables.loggedInUser.name,
              "absenceDate": $variables.absenceDate,
              "reason": $variables.reason,
              "status": "Pending" },
      });

      $application.variables.pendingAbsenceCount = $application.variables.pendingAbsenceCount + 1;

      await Actions.fireNotificationEvent(context, {
        summary: 'Success',
        message: 'Absence Request Raised Successfully!',
        displayMode: 'transient',
        type: 'confirmation',
      });

      const toTechnicianhome = await Actions.navigateToPage(context, {
        page: 'technicianhome',
      });
    }
  }

  return submitAbsenceRequest;
});
