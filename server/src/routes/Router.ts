import express from 'express';

// Using singleton pattern
// Ensure we are only having noe more than one router
export class Router {
  private static staticInstance: express.Router;
  static get instance(): express.Router {
    if (!Router.staticInstance) {
      Router.staticInstance = express.Router();
    }
    return Router.staticInstance;
  }
}
