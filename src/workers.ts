/**
 * cloudflare workers
 */
import {create} from './app';

const app = create();

export default {
  fetch(request, ctx, env) {
    return app.fetch(request, ctx, env);
  },
};
