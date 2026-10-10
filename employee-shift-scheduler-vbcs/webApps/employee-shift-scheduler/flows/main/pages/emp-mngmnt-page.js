define([], () => {
  'use strict';

  class PageModule {

    getEmployeeText(context) {
  return context.data.employeeName;
}
  }
  
  return PageModule;
});
