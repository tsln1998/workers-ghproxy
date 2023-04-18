import {Router, Sunder} from 'sunder';
import {routes} from './routes';

export const create = () => {
  const app = new Sunder();
  const router = new Router();

  routes(router);

  app.use(router.middleware);
  return app;
};
