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

  class createTechnicianShiftChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // Sets the progress variable to true
      $variables.createTechnicianShiftChainInProgress = true;

      try {
        // Validates TechnicianShift form
        const validateFormResult = await Actions.callChain(context, {
          chain: 'flow:validateFormChain',
          params: {
            validationGroupId: 'validation-group',
          },
        }, { id: 'validateTechnicianShift' });

        if (!validateFormResult) {
          return;
        }

        const callRestResult = await Actions.callRest(context, {
          endpoint: 'businessObjects/create_TechnicianShift',
          body: $variables.technicianShift,
        }, { id: 'createTechnicianShift' });

        if (!callRestResult.ok) {
          // Create error message
          const errorMessage = callRestResult.body?.detail || callRestResult.body?.['o:errorDetails']?.[0]?.detail || `Could not create new TechnicianShift: status ${callRestResult.status}`;
          // Fires a notification event about failed save
          await Actions.fireNotificationEvent(context, {
              summary: 'Save failed',
              message: errorMessage,
          }, { id: 'fireErrorNotification' });

          return;
        }

        await Actions.fireNotificationEvent(context, {
          summary: 'TechnicianShift saved',
          message: 'TechnicianShift record successfully created',
          displayMode: 'transient',
          type: 'confirmation',
        }, { id: 'fireSuccessNotification' });

        await Actions.navigateBack(context, {}, { id: 'navigateBack' });
      } finally {
        // Sets the progress variable to false
        $variables.createTechnicianShiftChainInProgress = false;
      }
    }
  }

  return createTechnicianShiftChain;
});
