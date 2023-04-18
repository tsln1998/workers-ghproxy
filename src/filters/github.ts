import {RegExpFilter} from './filter';

export const GitHubGist = new RegExpFilter(
    '^https://gist\\.githubusercontent\\.com/[^/]+/[a-f0-9]+/raw/.+$'
);

export default [GitHubGist];
