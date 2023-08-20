import type {TuiDocPage, TuiDocPages} from '@taiga-ui/addon-doc';

import {DEMO_PAGES} from '../../../../demo/src/app/app.pages';

const EXCLUSION_SECTIONS: string[] = [`Documentation`];
const EXCLUSION_ROUTES: string[] = [`Starter Kit`];

export const DEMO_PATHS = flatPages(DEMO_PAGES)
    .filter(page => !EXCLUSION_SECTIONS.includes(page.section as unknown as string))
    .filter(page => !EXCLUSION_ROUTES.includes(page.title))
    .map(page => page.route.replace(`/`, ``));

export const isEmbedPage = (path: string): boolean => path.startsWith(`embed/`);

function flatPages(pages: TuiDocPages): readonly TuiDocPage[] {
    return pages.reduce(
        (prev: readonly TuiDocPage[], next) => [
            ...prev,
            ...(`subPages` in next ? next.subPages : [next]),
        ],
        [],
    );
}