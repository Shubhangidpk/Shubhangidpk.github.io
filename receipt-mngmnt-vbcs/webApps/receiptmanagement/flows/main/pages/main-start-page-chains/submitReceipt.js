
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class SubmitReceiptChain extends ActionChain {

    async run(context, { event, originalEvent }) {
      const { $variables, $functions } = context;

      // 1. Create the receipt
      const response = await Actions.callRest(context, {
        endpoint: 'businessObjects/create_Receipts',
        body: {
          receiptNumber: $variables.receiptNumber,
          amount: $variables.receiptAmount,
          comment1: $variables.receiptComment,
          status: 'Pending Approval',
          approverComment: '',
          bankName: $variables.bankName,
          branchName: $variables.branchName,
          accountType: $variables.accountType,
        },
      });

      // 2. Refresh the approval table data
      await Actions.fireDataProviderEvent(context, {
        target: $variables.ReceiptApprovalSDP,
        refresh: null,
      });

      await $functions.reload();
      await Actions.fireNotificationEvent(context, {
        summary: 'Success',
        message: 'Receipt submitted successfully for approval!',
        displayMode: 'transient',
        type: 'confirmation',
      });
    }
  }

  return SubmitReceiptChain;
});
