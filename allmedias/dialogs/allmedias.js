/**
 * @license Copyright (c) 2003-2013, webmote - codeex.cn. All rights reserved.
 * For licensing, see http://codeex.cn/
 * 2013-2-18 v1.0
 */

(function () {
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {
            var k;

            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var O = Object(this);
            var len = O.length >>> 0;

            if (len === 0) {
                return -1;
            }

            var n = +fromIndex || 0;

            if (Math.abs(n) === Infinity) {
                n = 0;
            }

            if (n >= len) {
                return -1;
            }

            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            while (k < len) {
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }

    // object 与界面映射词典
    var attributesMap = {
        'allowScriptAccess': {
            'embed': {'name': 'allowScriptAccess'}
        },
        'allowFullScreen': {
            'embed': {'name': 'allowFullScreen', 'default': true},
            'video': {'name': 'allowFullScreen', 'default': true},
            'audio': {'name': 'allowFullScreen', 'default': true}
        },
        'bgcolor': {
            'embed': {'name': 'bgcolor'}
        },
        'base': {
            'embed': {'name': 'base'}
        },
        'class': {
            'embed': {'name': 'class'}
        },
        'flashvars': {
            'embed': {'name': 'flashvars'}
        },
        'height': {
            'embed': {'name': 'height'},
            'video': {'name': 'height'},
            'audio': {'name': 'height'}
        },
        'hSpace': {
            'embed': {'name': 'hSpace'}
        },
        'id': {
            'embed': {'name': 'id'},
            'video': {'name': 'id'},
            'audio': {'name': 'id'}
        },
        'loop': {
            'embed': {'name': 'loop'},
            'video': {'name': 'loop'},
            'audio': {'name': 'loop'}
        },
        'mtype': {
            'embed': {'name': 'mtype', 'default': 'allmedias'},
            'video': {'name': 'mtype', 'default': 'allmedias'},
            'audio': {'name': 'mtype', 'default': 'allmedias'}
        },
        'menu': {
            'embed': {'name': 'menu', 'default': true}
        },
        'muted': {
            'video': {'name': 'muted'},
            'audio': {'name': 'muted'}
        },
        'name': {
            'embed': {'name': 'name'}
        },
        'pluginspage': {
            'embed': {'name': 'pluginspage'}
        },
        'play': {
            'embed': {'name': 'autostart'},
            'video': {'name': 'autoplay'},
            'audio': {'name': 'autoplay'}
        },
        'quality': {
            'embed': {'name': 'quality'}
        },
        'src': {
            'embed': {'name': 'rsrc'},
            'video': {'name': 'src'},
            'audio': {'name': 'src'}
        },
        'scale': {
            'embed': {'name': 'scale'}
        },
        'style': {
            'embed': {'name': 'style'}
        },
        'salign': {
            'embed': {'name': 'salign'}
        },
        'seamlesstabbing': {
            'embed': {'name': 'seamlesstabbing', 'default': true}
        },
        'type': {
            'video': {'name': 'type'},
            'audio': {'name': 'type'}
        },
        'vSpace': {
            'embed': {'name': 'vSpace'}
        },
        'width': {
            'embed': {'name': 'width'},
            'video': {'name': 'width'},
            'audio': {'name': 'width'}
        },
        'wmode': {
            'embed': {'name': 'wmode'}
        }
    };

    var mediaTypes = [ //video/x-ms-asf-plugin   application/x-mplayer2
        //{
        //    player: 'wmpvideo',
        //    idx: 0,
        //    tag: 'embed',
        //    types: ['video/x-ms-asf-plugin', 'video/x-ms-asf-plugin', 'video/x-ms-asf-plugin', 'video/x-ms-asf-plugin'],
        //    classid: 'clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6',
        //    codebase: 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701',
        //    pluginspage: 'http://activex.microsoft.com/',
        //    exts: ['wmv', 'mpeg', 'asf', 'avi']
        //},
        //{
        //    player: 'wmpaudio',
        //    idx: 0,
        //    types: ['video/x-ms-asf-plugin', 'video/x-ms-asf-plugin', 'video/x-ms-asf-plugin', 'video/x-ms-asf-plugin', 'video/x-ms-asf-plugin', 'video/x-ms-asf-plugin'],
        //    classid: 'clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6',
        //    codebase: 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701',
        //    pluginspage: 'http://activex.microsoft.com/',
        //    exts: ['wma', 'm4a', 'wav', 'mpg', 'mid', 'mp3']
        //},
        //{
        //    player: 'rpvideo',
        //    idx: 0,
        //    types: ['audio/x-pn-realaudio-plugin', 'audio/x-pn-realaudio-plugin', 'audio/x-pn-realaudio-plugin'],
        //    classid: 'clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA',
        //    codebase: 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0',
        //    pluginspage: 'http://download.macromedia.com',
        //    exts: ['rm', 'rmvb', 'ra']
        //},
        //{
        //    player: 'qmvideo',
        //    idx: 0,
        //    types: ['video/quicktime'],
        //    classid: 'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B',
        //    codebase: 'http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0',
        //    pluginspage: 'http://www.apple.com/qtactivex',
        //    exts: ['qt']
        //}, {
        //    player: 'flashvideo',
        //    idx: 0,
        //    types: ['application/x-shockwave-flash', 'application/x-shockwave-flash', 'application/x-shockwave-flash', 'application/x-shockwave-flash', 'application/x-shockwave-flash'],
        //    classid: 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
        //    codebase: 'http://download.macroallMedias.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0',
        //    pluginspage: 'http://www.macroallMedias.com/go/getflashplayer',
        //    src: 'plugins/allmedias/jwplayer.swf', //相对插件路径
        //    exts: ['flv', 'mov', 'mp4', 'm4v', 'f4v']
        //},
        {
            player: 'html5video',
            idx: 0,
            tag: 'video',
            types: ['video/mp4', 'video/webm', 'video/ogg', 'video/ogg'],
            exts: ['mp4', 'webm', 'ogv', 'ogg']
        },
        {
            player: 'html5audio',
            idx: 0,
            tag: 'audio',
            types: ['audio/mpeg', 'audio/ogg', 'audio/ogg', 'audio/wav'],
            exts: ['mp3', 'oga', 'ogg', 'wav']
        }
        //{
        //    player: 'pdfReader',
        //    idx: 0,
        //    tag: 'embed',
        //    types: ['application/pdf'],
        //    classid: 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
        //    codebase: 'http://download.macroallMedias.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0',
        //    pluginspage: 'http://www.macroallMedias.com/go/getflashplayer',
        //    exts: ['pdf']
        //}
    ];

    var previewPreloader;

    /**
     * 取得副檔名
     * @param uri {string} 檔名
     * @returns {string}
     */
    function getUriExt(uri) {
        return !uri ? '' : uri.substr(uri.lastIndexOf('.') + 1).toLowerCase();
    }

    /**
     * 偵測媒體類型
     * @param ext {string} 副檔名
     * @returns {{player, idx, types, classid, codebase, pluginspage, exts}|{player, idx, types, classid, codebase, pluginspage, src, exts}|*}
     */
    function getMediaType(ext) {
        var i, c, idx, mediaPlayer;

        if (!ext) {
            return mediaTypes[0];
        }

        for (i = 0, c = mediaTypes.length; i < c; i += 1) {
            mediaPlayer = mediaTypes[i];
            idx = mediaPlayer.exts.indexOf(ext);
            if (idx >= 0) {
                mediaPlayer.idx = idx;
                return mediaPlayer;
            }
        }

        return mediaTypes[0];
    }

    /**
     * 載入使用者設定的值到對話框內
     * @param embedNode
     */
    function loadValue(embedNode) {
        var value, tagName, isCheckbox, data, attributes = attributesMap[this.id];

        tagName = embedNode.getName();
        tagName = tagName.substr(tagName.indexOf(':') + 1);

        if (!embedNode || !attributes || !attributes.hasOwnProperty(tagName)) {
            return;
        }

        isCheckbox = (this instanceof CKEDITOR.ui.dialog.checkbox);
        value = embedNode.getAttribute(attributes[tagName].name);
        //console.log(attributes[tagName].name, typeof value, value);
        if (isCheckbox) {
            data = (value !== null) && (value.toLowerCase() === 'true');
        } else {
            data = (value === null) ? '' : value;
        }
        this.setValue(data);
    }

    /**
     * 儲存對話框內，使用者設定的值
     * @param embedNode
     */
    function commitValue(embedNode) {
        var value, tagName, attributes = attributesMap[this.id];

        tagName = embedNode.getName();
        tagName = tagName.substr(tagName.indexOf(':') + 1);

        if (!attributes || !attributes.hasOwnProperty(tagName)) {
            return;
        }

        value = this.getValue();
        if ((value === false) || (value === '')) {
            // console.log('Remove', attributes[tagName].name, typeof value, value);
            embedNode.removeAttribute(attributes[tagName].name);
        } else {
            // console.log('Add', attributes[tagName].name, typeof value, value);
            embedNode.setAttribute(attributes[tagName].name, value);
        }
    }

    /**
     * 顯示對話框
     * @param self
     * @param editor
     */
    function showAllMedias(self, editor) {
        var
            realElement, embedNode, fakeImage,
            tags = ['cke:video', 'cke:audio', 'cke:embed'];

        // Clear previously saved elements.
        self.fakeImage = self.embedNode = null;
        previewPreloader = new CKEDITOR.dom.element('embed', editor.document);

        fakeImage = self.getSelectedElement();
        if (fakeImage && fakeImage.data('cke-real-element-type') === 'allmedias') {
            self.fakeImage = fakeImage;
            realElement = editor.restoreRealElement(fakeImage);
            embedNode = (tags.indexOf(realElement.getName()) < 0) ? null : realElement;
            self.embedNode = embedNode;
            self.setupContent(embedNode, fakeImage);
        }
    }

    /**
     * 隱藏對話框
     * @param self
     */
    function hideAllMedias(self) {
        if (self.preview) {
            self.preview.setHtml('');
        }
    }

    /**
     * 載入並初始化對話框
     * @param self
     */
    function loadAllMedias(self) {
        var
            dialog = self.getDialog(),
            updatePreview = function (src) {
                var width, height, mp, objsrc, html;

                // Query the preloader to figure out the url impacted by based href.
                previewPreloader.setAttribute('src', src);
                mp = getMediaType(getUriExt(previewPreloader.getAttribute('src')));
                width = (dialog.getValueOf('tabInfo', 'width') || 400);
                height = (dialog.getValueOf('tabInfo', 'height') || 300);

                if (mp.player === 'flashvideo') {
                    objsrc = [
                        'src="' + CKEDITOR.getUrl((mp.src || '')) + '"',
                        'flashvars="autostart=true&file=' + CKEDITOR.tools.htmlEncode(src) + '"',
                        'pluginspage="' + (mp.pluginspage || '') + '"',
                        'style="height:' + height + 'px;width:' + width + 'px"'
                    ].join(' ');
                } else if (mp.player === 'wmpaudio') {
                    height = 45;
                    objsrc = [
                        'src="' + CKEDITOR.tools.htmlEncode(src) + '"',
                        'pluginspage="' + (mp.pluginspage || '') + '"',
                        'style="height:' + height + 'px;width:' + width + 'px"'
                    ].join(' ');
                } else if (mp.player === 'html5video') {
                    objsrc =[
                        'src="' + CKEDITOR.tools.htmlEncode(src) + '"',
                        'controls="true"',
                        'style="height:' + height + 'px;width:' + width + 'px"'
                    ].join(' ');
                } else if (mp.player === 'html5audio') {
                    height = 45;
                    objsrc =[
                        'src="' + CKEDITOR.tools.htmlEncode(src) + '"',
                        'controls="true"',
                        'style="height:' + height + 'px;width:' + width + 'px"'
                    ].join(' ');
                } else {
                    objsrc = [
                        'src="' + CKEDITOR.tools.htmlEncode(src) + '"',
                        'pluginspage="' + (mp.pluginspage || '') + '"',
                        'style="height:' + height + 'px;width:' + width + 'px"'
                    ].join(' ');
                }

                html = [
                    '<' + mp.tag,
                    objsrc,
                    attributesMap.play.hasOwnProperty(mp.tag) ? attributesMap.play[mp.tag].name + '="true"' : '',
                    'type="' + mp.types[mp.idx] + '"',
                    '></' + mp.tag + '>'
                ].join(' ');
                dialog.preview.setHtml(html);
            };

        // Preview element
        dialog.preview = dialog.getContentElement('tabInfo', 'preview').getElement('.FlashPreviewBox');

        // Sync on inital value loaded.
        self.on('change', function (evt) {
            if (evt.data && evt.data.value) {
                updatePreview(evt.data.value);
            }
        });
        // Sync when input value changed.
        self.getInputElement().on('change', function (evt) {
            updatePreview(this.getValue());
        }, self);
    }

    /**
     * 儲存設定，並將資料寫回編輯器內
     * @param self
     * @param editor
     */
    function doFinish(self, editor) {
        var
            embedNode = null, myExtPlayer, newFakeImage,
            attributes = {mtype: 'allmedias'},
            extraStyles = {},
            extraAttributes = {};

        myExtPlayer = getMediaType(getUriExt(self.getValueOf('tabInfo', 'src')));
        if (!self.fakeImage) {
            embedNode = CKEDITOR.dom.element.createFromHtml(
                '<cke:' + myExtPlayer.tag + '></cke:' + myExtPlayer.tag + '>',
                editor.document
            );
        } else {
            embedNode = self.embedNode;
        }
        attributes['type'] = myExtPlayer.types[myExtPlayer.idx];
        attributes['src'] = CKEDITOR.tools.htmlEncode(self.getValueOf('tabInfo', 'src') || '');
        if (['video', 'audio'].indexOf(myExtPlayer.tag) >= 0) {
            attributes['controls'] = true;
        }

        self.commitContent(embedNode);
        embedNode.setAttributes(attributes);

        newFakeImage = editor.createFakeElement(embedNode, 'cke_allMedias', 'allmedias', true);
        newFakeImage.setAttributes(extraAttributes);
        newFakeImage.setStyles(extraStyles);
        if (self.fakeImage) {
            newFakeImage.replace(self.fakeImage);
            editor.getSelection().selectElement(newFakeImage);
        } else {
            editor.insertElement(newFakeImage);
        }
    }

    CKEDITOR.dialog.add('allmedias', function (editor) {
        var
            previewAreaHtml = [
                '<div>',
                '<div>' + CKEDITOR.tools.htmlEncode(editor.lang.common.preview) + '</div>',
                '<div id="cke_FlashPreviewLoader' + CKEDITOR.tools.getNextNumber() + '" style="display:none">',
                '<div class="loading">&nbsp;</div>',
                '</div>',
                '<div id="cke_FlashPreviewBox' + CKEDITOR.tools.getNextNumber() + '" class="FlashPreviewBox" style="width:100%;"></div>',
                '</div>'
            ].join(''),
            tabInfo = {
                id: 'tabInfo',
                label: editor.lang.common.generalTab,
                accessKey: 'I',
                elements: [
                    {
                        type: 'vbox',
                        padding: 0,
                        children: [
                            {
                                type: 'hbox',
                                widths: ['280px', '110px'],
                                align: 'right',
                                children: [
                                    {
                                        id: 'src',
                                        type: 'text',
                                        label: editor.lang.common.url,
                                        required: true,
                                        validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.allmedias.validateSrc),
                                        setup: loadValue,
                                        commit: commitValue,
                                        onLoad: function () {
                                            loadAllMedias(this);
                                        }
                                    },
                                    {
                                        type: 'button',
                                        id: 'browse',
                                        filebrowser: {
                                            target: 'tabInfo:src', //update span area
                                            action: 'Browse', //QuickUpload, Upload, Browse
                                            params: { // optional
                                                mediaType: 'allmedias',
                                                by: 'ck'
                                            }
                                        },
                                        hidden: true,
                                        // v-align with the 'src' field.
                                        // TODO: We need something better than a fixed size here.
                                        style: 'display: inline-block;margin-top: 15px;',
                                        label: editor.lang.common.browseServer
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'hbox',
                        widths: ['25%', '25%', '25%', '25%', '25%'],
                        children: [
                            {
                                type: 'text',
                                id: 'width',
                                style: 'width: 95px;',
                                label: editor.lang.common.width,
                                validate: CKEDITOR.dialog.validate.htmlLength(editor.lang.common.invalidHtmlLength.replace('%1', editor.lang.common.width)),
                                setup: loadValue,
                                commit: commitValue
                            },
                            {
                                type: 'text',
                                id: 'height',
                                style: 'width: 95px;',
                                label: editor.lang.common.height,
                                validate: CKEDITOR.dialog.validate.htmlLength(editor.lang.common.invalidHtmlLength.replace('%1', editor.lang.common.height)),
                                setup: loadValue,
                                commit: commitValue
                            },
                            {
                                type: 'text',
                                id: 'hSpace',
                                style: 'width: 95px;',
                                label: editor.lang.allmedias.hSpace,
                                validate: CKEDITOR.dialog.validate.integer(editor.lang.allmedias.validateHSpace),
                                setup: loadValue,
                                commit: commitValue
                            },
                            {
                                type: 'text',
                                id: 'vSpace',
                                style: 'width: 95px;',
                                label: editor.lang.allmedias.vSpace,
                                validate: CKEDITOR.dialog.validate.integer(editor.lang.allmedias.validateVSpace),
                                setup: loadValue,
                                commit: commitValue
                            }
                        ]
                    },
                    {
                        type: 'vbox',
                        children: [
                            {
                                type: 'html',
                                id: 'preview',
                                style: 'width: 100%;border: 1px solid #B6B6B6; text-align: center;',
                                html: previewAreaHtml
                            },
                            {
                                type: 'text',
                                id: 'flashuri',
                                label: 'hid1',
                                'default': CKEDITOR.plugins.getPath('allmedias') + 'jwplayer.swf',
                                style: 'display : none;',
                                setup: loadValue,
                                commit: commitValue
                            }
                        ]
                    }
                ]
            },
            tabUpload = {
                id: 'tabUpload',
                hidden: true,
                filebrowser: 'uploadButton',
                label: editor.lang.common.upload,
                elements: [
                    {
                        type: 'file',
                        id: 'upload',
                        label: editor.lang.common.upload,
                        size: 38
                    },
                    {
                        type: 'fileButton',
                        id: 'uploadButton',
                        label: editor.lang.common.uploadSubmit,
                        filebrowser: 'tabInfo:src',
                        'for': ['tabUpload', 'upload']
                    }
                ]
            },
            tabProperties = {
                id: 'tabProperties',
                label: editor.lang.allmedias.propertiesTab,
                elements: [
                    {
                        type: 'hbox',
                        widths: ['50%', '50%'],
                        children: [
                            {
                                id: 'scale',
                                type: 'select',
                                label: editor.lang.allmedias.scale,
                                'default': '',
                                style: 'width: 100%;',
                                items: [
                                    [editor.lang.common.notSet, ''],
                                    [editor.lang.allmedias.scaleAll, 'showall'],
                                    [editor.lang.allmedias.scaleNoBorder, 'noborder'],
                                    [editor.lang.allmedias.scaleFit, 'exactfit']
                                ],
                                setup: loadValue,
                                commit: commitValue
                            },
                            {
                                id: 'allowScriptAccess',
                                type: 'select',
                                label: editor.lang.allmedias.access,
                                'default': '',
                                style: 'width: 100%;',
                                items: [
                                    [editor.lang.common.notSet, ''],
                                    [editor.lang.allmedias.accessAlways, 'always'],
                                    [editor.lang.allmedias.accessSameDomain, 'samedomain'],
                                    [editor.lang.allmedias.accessNever, 'never']
                                ],
                                setup: loadValue,
                                commit: commitValue
                            }
                        ]
                    },
                    {
                        type: 'hbox',
                        widths: ['50%', '50%'],
                        children: [
                            {
                                id: 'wmode',
                                type: 'select',
                                label: editor.lang.allmedias.windowMode,
                                'default': '',
                                style: 'width: 100%;',
                                items: [
                                    [editor.lang.common.notSet, ''],
                                    [editor.lang.allmedias.windowModeWindow, 'window'],
                                    [editor.lang.allmedias.windowModeOpaque, 'opaque'],
                                    [editor.lang.allmedias.windowModeTransparent, 'transparent']
                                ],
                                setup: loadValue,
                                commit: commitValue
                            },
                            {
                                id: 'quality',
                                type: 'select',
                                label: editor.lang.allmedias.quality,
                                'default': 'high',
                                style: 'width: 100%;',
                                items: [
                                    [editor.lang.common.notSet, ''],
                                    [editor.lang.allmedias.qualityBest, 'best'],
                                    [editor.lang.allmedias.qualityHigh, 'high'],
                                    [editor.lang.allmedias.qualityAutoHigh, 'autohigh'],
                                    [editor.lang.allmedias.qualityMedium, 'medium'],
                                    [editor.lang.allmedias.qualityAutoLow, 'autolow'],
                                    [editor.lang.allmedias.qualityLow, 'low']
                                ],
                                setup: loadValue,
                                commit: commitValue
                            }
                        ]
                    },
                    {
                        type: 'hbox',
                        widths: ['50%', '50%'],
                        children: [
                            {
                                id: 'align',
                                type: 'select',
                                label: editor.lang.common.align,
                                'default': '',
                                style: 'width: 100%;',
                                items: [
                                    [editor.lang.common.notSet, ''],
                                    [editor.lang.common.alignLeft, 'left'],
                                    [editor.lang.allmedias.alignAbsBottom, 'absBottom'],
                                    [editor.lang.allmedias.alignAbsMiddle, 'absMiddle'],
                                    [editor.lang.allmedias.alignBaseline, 'baseline'],
                                    [editor.lang.common.alignBottom, 'bottom'],
                                    [editor.lang.common.alignMiddle, 'middle'],
                                    [editor.lang.common.alignRight, 'right'],
                                    [editor.lang.allmedias.alignTextTop, 'textTop'],
                                    [editor.lang.common.alignTop, 'top']
                                ],
                                setup: loadValue,
                                commit: function (objectNode, embedNode, paramMap, extraStyles, extraAttributes) {
                                    var value = this.getValue();
                                    commitValue.apply(this, arguments);
                                    value && (extraAttributes.align = value);
                                }
                            },
                            {
                                type: 'html',
                                html: '<div></div>'
                            }
                        ]
                    },
                    {
                        type: 'fieldset',
                        label: CKEDITOR.tools.htmlEncode(editor.lang.allmedias.flashvars),
                        children: [
                            {
                                type: 'vbox',
                                padding: 0,
                                children: [
                                    {
                                        type: 'checkbox',
                                        id: 'loop',
                                        label: editor.lang.allmedias.chkLoop,
                                        'default': false,
                                        setup: loadValue,
                                        commit: commitValue
                                    },
                                    {
                                        type: 'checkbox',
                                        id: 'play',
                                        label: editor.lang.allmedias.chkPlay,
                                        'default': false,
                                        setup: loadValue,
                                        commit: commitValue
                                    },
                                    {
                                        type: 'checkbox',
                                        id: 'allowFullScreen',
                                        label: editor.lang.allmedias.chkFull,
                                        'default': true,
                                        setup: loadValue,
                                        commit: commitValue
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            tabAdvanced = {
                id: 'tabAdvanced',
                label: editor.lang.common.advancedTab,
                elements: [
                    {
                        type: 'hbox',
                        children: [
                            {
                                type: 'text',
                                id: 'id',
                                label: editor.lang.common.id,
                                setup: loadValue,
                                commit: commitValue
                            }
                        ]
                    },
                    {
                        type: 'hbox',
                        widths: ['45%', '55%'],
                        children: [
                            {
                                type: 'text',
                                id: 'bgcolor',
                                label: editor.lang.allmedias.bgcolor,
                                setup: loadValue,
                                commit: commitValue
                            },
                            {
                                type: 'text',
                                id: 'class',
                                label: editor.lang.common.cssClass,
                                setup: loadValue,
                                commit: commitValue
                            }
                        ]
                    },
                    {
                        type: 'text',
                        id: 'style',
                        validate: CKEDITOR.dialog.validate.inlineStyle(editor.lang.common.invalidInlineStyle),
                        label: editor.lang.common.cssStyle,
                        setup: loadValue,
                        commit: commitValue
                    }
                ]
            };

        return {
            title: editor.lang.allmedias.title,
            minWidth: 420,
            minHeight: 310,
            onShow: function () {
                showAllMedias(this, editor);
            },
            onHide: function () {
                hideAllMedias(this);
            },
            onOk: function () {
                doFinish(this, editor);
            },
            contents: [tabInfo, tabUpload, tabProperties, tabAdvanced]
        };
    });
})();