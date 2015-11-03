/**
 * @license Copyright (c) 2003-2013, webmote - codeex.cn. All rights reserved.
 * For licensing, see http://codeex.cn/
 * 2013-2-18 v1.0
 */

(function() {
    function isAllMediasEmbed(element) {
        var attributes = element.attributes;
        return (attributes.mtype === 'allmedias');
    }

    function createFakeElement(editor, realElement) {
        return editor.createFakeParserElement(realElement, 'cke_allMedias', 'allmedias', true);
    }

    function initAllMedias(editor) {
        editor.addCommand('allmedias', new CKEDITOR.dialogCommand('allmedias'));
        editor.ui.addButton && editor.ui.addButton('allmedias', {
            label: editor.lang.allmedias.allMedias,
            command: 'allmedias',
            toolbar: 'insert,20'
        });
        CKEDITOR.dialog.add('allmedias', this.path + 'dialogs/allmedias.js');

        // If the "menu" plugin is loaded, register the menu items.
        if (editor.addMenuItems) {
            editor.addMenuGroup('mediagroup');
            editor.addMenuItems({
                mediamenu: {
                    label: editor.lang.allmedias.properties,
                    command: 'allmedias',
                    group: 'mediagroup',
                    icons: this.icons
                }
            });
        }

        editor.on('doubleclick', function(evt) {
            var element = evt.data.element;

            if (element.data('cke-real-element-type') === 'allmedias') {
                evt.data.dialog = 'allmedias';
            }
        });

        // If the "contextmenu" plugin is loaded, register the listeners.
        if (editor.contextMenu) {
            editor.contextMenu.addListener(function(element, selection) {
                if (element && element.is('img') && !element.isReadOnly() && element.data('cke-real-element-type') == 'allMedias') {
                    return {
                        mediamenu: CKEDITOR.TRISTATE_OFF
                    };
                }
            });
        }
    }

    function afterInitAllMedias(editor) {
        var
            dataProcessor = editor.dataProcessor,
            dataFilter = dataProcessor && dataProcessor.dataFilter,
            //htmlFilter = dataProcessor && dataProcessor.htmlFilter,
            nodes = {
                'video': function(element) {
                    if (!isAllMediasEmbed(element)) {
                        return null;
                    }
                    element.name = 'cke:video';
                    return createFakeElement(editor, element);
                },
                'cke:video': function(element) {
                    if (!isAllMediasEmbed(element)) {
                        return null;
                    }

                    return createFakeElement(editor, element);
                },
                'audio': function(element) {
                    if (!isAllMediasEmbed(element)) {
                        return null;
                    }
                    element.name = 'cke:audio';
                    return createFakeElement(editor, element);
                },
                'cke:audio': function(element) {
                    if (!isAllMediasEmbed(element)) {
                        return null;
                    }

                    return createFakeElement(editor, element);
                },
                'cke:embed': function(element) {
                    if (!isAllMediasEmbed(element)) {
                        return null;
                    }

                    return createFakeElement(editor, element);
                }
            };

        if (dataFilter) {
            dataFilter.addRules({ elements: nodes }, 1);
        }
    }

    CKEDITOR.plugins.add('allmedias', {
        requires: 'dialog,fakeobjects',
        lang: ['en', 'zh-cn', 'zh'],
        icons: 'allmedias', // %REMOVE_LINE_CORE%
        onLoad: function() {
            CKEDITOR.addCss([
            	'img.cke_allMedias {',
                    'background-image: url(' + CKEDITOR.getUrl(this.path + 'images/placeholder.png') + ');',
                    'background-position: center center;',
                    'background-repeat: no-repeat;',
                    'border: 1px solid #a9a9a9;',
                    'width: 80px;',
                    'height: 80px;',
                '}'
            ].join(''));
            //CKEDITOR.scriptLoader.load( 'plugins/allmedias/jwplayer.js' );
        },
        init: initAllMedias,
        afterInit: afterInitAllMedias
    });
})();
