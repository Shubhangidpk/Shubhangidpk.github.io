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

  class FilePickerSelectChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object[]} params.files
     * @param {any} params.originalEvent
     */
    async run(context, { event, files, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const results = await ActionUtils.forEach(files, async (item, index) => {

        // ---- TODO: Add your code here ---- //
        $variables.FileADP.data.push({"FileRef":files[index],"FileName":files[index].name,
        "FileType":files[index].type, "FileSize":files[index].size})
      }, { mode: 'serial' });
    }
  }

  return FilePickerSelectChain;
});
