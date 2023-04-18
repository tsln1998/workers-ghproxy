import {Router} from 'sunder';
import {DocController} from './handlers/doc';
import {ProxyController} from './handlers/proxy';

export const routes = (router: Router<unknown>) => {
  const doc = new DocController();
  const proxy = new ProxyController();

  router.get('/', doc.Index);
  router.all('*', proxy.handle);
};
