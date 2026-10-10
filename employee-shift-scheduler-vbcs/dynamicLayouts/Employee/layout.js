define([], () => {
  'use strict';

  class LayoutModule {
    getProfileValue(context) {
      return context && context.profile;
    }
  }

  return LayoutModule;
});