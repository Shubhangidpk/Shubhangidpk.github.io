
define([
  'vb/action/actionChain',
  'vb/action/actions',
], (
  ActionChain,
  Actions
) => {
  'use strict';

  class ButtonActionChain1 extends ActionChain {
    async run(context) {
      const { $variables } = context;

      // Clear text and number inputs
      $variables.receiptNumber = '';
      $variables.receiptAmount = null;
      $variables.receiptComment = '';

      // Clear bank details
      $variables.bankName = '';
      $variables.branchName = '';
      $variables.accountType = '';

      // Clear approval fields
      $variables.approverComment = '';
      $variables.selectedReceiptNumber = '';
      $variables.selectedReceiptId = null;

      // Reset validation
      $variables.ValidateForm = 'valid';
    }
  }

  return ButtonActionChain1;
});
