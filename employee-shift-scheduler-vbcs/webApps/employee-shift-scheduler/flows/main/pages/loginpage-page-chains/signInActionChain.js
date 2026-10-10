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

  class signInActionChain extends ActionChain {

    async run(context, { event, originalEvent }) {
      const { $application, $variables } = context;

      // Clear previous login
      $application.variables.loggedInUser = null;
      $variables.loggedInUser = null;

      // Check mock users
      await ActionUtils.forEach(
        $variables.users,
        async (item, index) => {

          if (
            $variables.employeeId === item.employeeId &&
            $variables.password === item.password
          ) {
            // Store logged-in user at application level
            $application.variables.loggedInUser = {
              employeeId: item.employeeId,
              name: item.name,
              role: item.role
            };

            // Keep page variable as well
            $variables.loggedInUser = item;
          }

        },
        { mode: 'serial' }
      );

      console.log(
        "Logged In:",
        $application.variables.loggedInUser
      );

      // Invalid credentials
      if (!$application.variables.loggedInUser) {

        await Actions.fireNotificationEvent(context, {
          summary: 'Invalid Employee ID or Password.',
          displayMode: 'transient',
          type: 'error'
        });

        return;
      }

      // Technician
      if ($application.variables.loggedInUser.role === 'Technician') {

        await Actions.navigateToPage(context, {
          page: 'technicianhome'
        });

      }

      // Manager
      else if ($application.variables.loggedInUser.role === 'Manager') {

        await Actions.navigateToPage(context, {
          page: 'managerhome'
        });

      }
    }
  }

  return signInActionChain;
});