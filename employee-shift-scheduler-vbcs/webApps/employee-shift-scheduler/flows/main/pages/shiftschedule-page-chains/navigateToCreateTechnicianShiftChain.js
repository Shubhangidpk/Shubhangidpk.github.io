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

  class navigateToCreateTechnicianShiftChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const navigateToPageMainCreateTechnicianShiftResult = await Actions.navigateToPage(context, {
        page: 'main-create-technician-shift',
        params: {},
      });
    }
  }

  return navigateToCreateTechnicianShiftChain;
});
