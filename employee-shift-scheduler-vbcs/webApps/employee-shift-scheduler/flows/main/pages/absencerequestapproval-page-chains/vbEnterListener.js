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

    async run(context) {
      const { $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/getall_AbsenceRequest',
        uriParams: {
          q: "status='Pending'",
        },
      });

      if (response.body.items.length === 0) {
        $variables.absenceRequests = [];
        return;
      }

      $variables.absenceRequests = response.body.items;
    }
  }

  return vbEnterListener;
});