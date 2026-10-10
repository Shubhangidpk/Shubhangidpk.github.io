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


      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/getall_OverTimeRequest',
        uriParams: {
          q: "status='Pending'",
        },
      });

      $application.variables.pendingOvertimeCountMngr = response.body.items.length;

      const response2 = await Actions.callRest(context, {
        endpoint: 'businessObjects/getall_AbsenceRequest',
        uriParams: {
          q: "status='Pending'",
        },
      });

      $application.variables.pendingAbsenceCountMngr = response2.body.items.length;

      const response3 = await Actions.callRest(context, {
        endpoint: 'businessObjects/getall_EmployeeManagement',
        uriParams: {
          q: "status='Active'",
        },
      });

      $application.variables.activeTechnician = response3.body.items.length;
    }
  }

  return vbEnterListener;
});
