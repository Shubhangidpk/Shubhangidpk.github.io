
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class ButtonActionChain2 extends ActionChain {

    async run(context, { event, originalEvent }) {
      const { $variables } = context;

      // 1. Update the selected receipt
      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/update_Receipts',
        uriParams: {
          Receipts_Id: $variables.selectedReceiptId,
        },
        body: {
          status: 'Rejected',
          approverComment: $variables.approverComment || 'Receipt rejected',
        },
      });

      // 2. Show success notification
      await Actions.fireNotificationEvent(context, {
        summary: 'Success',
        message: 'Receipt rejected successfully!',
        displayMode: 'transient',
        type: 'confirmation',
      });

      // 3. Refresh the approval table's data provider
      await Actions.fireDataProviderEvent(context, {
        target: $variables.ReceiptApprovalSDP,
        refresh: null,
      });
    }
  }

  return ButtonActionChain2;
});
