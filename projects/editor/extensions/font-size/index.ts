import {Extension} from '@tiptap/core';
import type * as ExtensionTextStyleType from '@tiptap/extension-text-style';

export type {ExtensionTextStyleType};

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            /**
             * Set the font size
             */
            setFontSize: (fontSize: string) => ReturnType;
            /**
             * Unset the font size
             */
            unsetFontSize: () => ReturnType;
        };
    }
}

interface FontSizeOptions {
    types: string[];
}

export const TuiFontSizeExtension = Extension.create<FontSizeOptions>({
    name: 'fontSize',

    addOptions(): FontSizeOptions {
        return {types: ['textStyle']};
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: ({style}) => style.fontSize,
                        renderHTML: ({fontSize}) =>
                            fontSize ? {style: `font-size: ${fontSize}`} : {},
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setFontSize:
                (fontSize: string) =>
                ({chain}) =>
                    chain().setMark('textStyle', {fontSize}).run(),
            unsetFontSize:
                () =>
                ({chain}) =>
                    chain()
                        .setMark('textStyle', {fontSize: null})
                        .removeEmptyTextStyle()
                        .run(),
        };
    },
});
