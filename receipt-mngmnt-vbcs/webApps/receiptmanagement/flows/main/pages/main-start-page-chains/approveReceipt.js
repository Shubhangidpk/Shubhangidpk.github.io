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

  class approveReceipt extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response2 = await Actions.callRest(context, {
        endpoint: 'businessObjects/update_Receipts',
        body: {
          status: 'Approved',
          approverComment: 'Receipt approved',
        },
        uriParams: {
          'Receipts_Id': $variables.selectedReceiptId,
        },
      });

      await Actions.fireNotificationEvent(context, {
        summary: 'Success',
        message: 'Receipt Approved Successfully!',
        displayMode: 'transient',
        type: 'confirmation',
      });

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.ReceiptApprovalSDP,
      });
    }
  }

  return approveReceipt;
});
