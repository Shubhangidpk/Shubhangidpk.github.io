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

      if (response.body.items.length === 0) {
        $variables.overtimeRequests = [];
        return;
      }

      $variables.overtimeRequests = response.body.items;
    }
  }

  return vbEnterListener;
});
