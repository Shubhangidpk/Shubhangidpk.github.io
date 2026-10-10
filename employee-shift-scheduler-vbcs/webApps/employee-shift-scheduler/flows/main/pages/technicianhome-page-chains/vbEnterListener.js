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

  class vbEnterListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      const response2 = await Actions.callRest(context, {
        endpoint: 'businessObjects/getall_OverTimeRequest',
        uriParams: {
          q: "employeeId='" + $application.variables.loggedInUser.employeeId + "' and status='Pending'",
        },
      });

      $application.variables.pendingOvertimeCount = response2.body.items.length;

      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/getall_AbsenceRequest',
        uriParams: {
          q: "employeeId='" + $application.variables.loggedInUser.employeeId + "' and status='Pending'",
        },
      });

      $application.variables.pendingAbsenceCount = response.body.items.length;
    }
  }

  return vbEnterListener;
});
