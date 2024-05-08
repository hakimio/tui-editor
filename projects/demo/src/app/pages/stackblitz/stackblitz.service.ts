import {Inject, Injectable} from '@angular/core';
import stackblitz, {OpenOptions, Project} from '@stackblitz/sdk';
import {TuiCodeEditor} from '@taiga-ui/addon-doc';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';

import {TsFileComponentParser} from './classes';
import {StackblitzDepsService} from './stackblitz-deps.service';
import {AbstractTuiStackblitzResourcesLoader} from './stackblitz-resources-loader';
import {StackblitzEditButtonComponent} from './starter/stackblitz-edit-button.component';
import {appPrefix, getSupportFiles, prepareLess, prepareSupportFiles} from './utils';

const APP_COMP_META = {
    SELECTOR: `my-app`,
    TEMPLATE_URL: `./app.component.html`,
    STYLE_URLS: [`./app.component.less`],
    CLASS_NAME: `AppComponent`,
} as const;

@Injectable()
export class TuiStackblitzService implements TuiCodeEditor {
    readonly name = `Stackblitz`;
    readonly content = new PolymorpheusComponent(StackblitzEditButtonComponent);

    constructor(
        @Inject(StackblitzDepsService)
        private readonly deps: StackblitzDepsService,
    ) {}

    async edit(
        component: string,
        sampleId: string,
        content: Record<string, string>,
    ): Promise<void> {
        if (!content.HTML || !content.TypeScript) {
            return;
        }

        const appCompTs = new TsFileComponentParser(content.TypeScript);
        const supportFilesTuples = getSupportFiles(content);
        const modifiedSupportFiles = prepareSupportFiles(supportFilesTuples);

        appCompTs.selector = APP_COMP_META.SELECTOR;
        appCompTs.templateUrl = APP_COMP_META.TEMPLATE_URL;
        appCompTs.styleUrls = APP_COMP_META.STYLE_URLS;
        appCompTs.className = APP_COMP_META.CLASS_NAME;

        return stackblitz.openProject({
            ...this.getStackblitzProjectConfig(),
            title: `${component}-${sampleId}`,
            description: `TUI Editor example`,
            files: {
                ...(await this.getBaseAngularProjectFiles()),
                ...modifiedSupportFiles,
                [appPrefix`app.component.ts`]: appCompTs.toString(),
                [appPrefix`app.component.html`]: `<tui-root>\n\n${content.HTML}\n</tui-root>`,
                [appPrefix`app.component.less`]: prepareLess(content.LESS || ``),
            },
        });
    }

    async openStarter(
        {title, description, files}: Pick<Project, 'description' | 'files' | 'title'>,
        openOptions?: OpenOptions,
    ): Promise<void> {
        return stackblitz.openProject(
            {
                ...this.getStackblitzProjectConfig(),
                title,
                description,
                files: {
                    ...(await this.getBaseAngularProjectFiles()),
                    ...files,
                },
            },
            openOptions,
        );
    }

    private async getBaseAngularProjectFiles(): Promise<Project['files']> {
        const {tsconfig, angularJson, mainTs, polyfills, indexHtml, styles} =
            await AbstractTuiStackblitzResourcesLoader.getProjectFiles();

        return {
            'tsconfig.json': tsconfig,
            'angular.json': angularJson,
            'src/main.ts': mainTs,
            'src/polyfills.ts': polyfills,
            'src/index.html': indexHtml,
            'src/styles.less': styles,
        };
    }

    private getStackblitzProjectConfig(): Pick<
        Project,
        'dependencies' | 'tags' | 'template'
    > {
        return {
            template: `angular-cli`,
            dependencies: this.deps.get(),
            tags: [`Angular`, `Taiga UI`, `Angular components`, `UI Kit`],
        };
    }
}
