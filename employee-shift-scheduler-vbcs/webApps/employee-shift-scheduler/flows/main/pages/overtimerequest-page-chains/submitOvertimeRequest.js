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

  class submitOvertimeRequest extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/create_OverTimeRequest',
        body: {
        "employeeId": $application.variables.loggedInUser.employeeId,
        "employeeName": $application.variables.loggedInUser.name,
        "overtimeDate": $variables.overtimeDate,
        "overtimeHours": $variables.overtimeHours,
        "reason": $variables.reason,
        "status": "Pending"
      },
      });

      $application.variables.pendingOvertimeCount = $application.variables.pendingOvertimeCount +1;

      await Actions.fireNotificationEvent(context, {
        summary: 'Success',
        message: 'Over Time Request Submitted Successfully!!',
        displayMode: 'transient',
        type: 'confirmation',
      });

      const toTechnicianhome = await Actions.navigateToPage(context, {
        page: 'technicianhome',
      });
    }
  }

  return submitOvertimeRequest;
});
