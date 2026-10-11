define([], () => {
  'use strict';

  class PageModule {
    reload(){
       window.location.reload();
    }
  }
  
  return PageModule;
});
