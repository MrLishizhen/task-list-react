import styles from './index.module.less'
import '@wangeditor/editor/dist/css/style.css'
import React, {useState, useEffect} from 'react'
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {IDomEditor, IEditorConfig, IToolbarConfig, DomEditor} from '@wangeditor/editor'

function MyEditor(props:{editor_html:string}) {
    // editor 实例
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // 编辑器内容
    const [html, setHtml] = useState('')

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {
        toolbarKeys: [
            "bold",
            "underline",
            "italic",
            "color",
            "bulletedList",
            "numberedList",
            "todo",
        ]
    }  // TS 语法

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: '在此输入更多内容…',
    }


    useEffect(()=>{
        setHtml(props.editor_html)
    },[props.editor_html])
    // 及时销毁 editor ，重要！
    useEffect(() => {
        // if(editor){
        //     const toolbar = DomEditor.getToolbar(editor)
        //     const curToolbarConfig = toolbar.getConfig()
        //     console.log( curToolbarConfig.toolbarKeys ) // 当前菜单排序和分组
        // }
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <div className={styles.editor}>

            <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => setHtml(editor.getHtml())}
                mode="simple"
                style={{height: '400px', overflowY: 'hidden'}}
            />
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{flexShrink: 0}}
            />

        </div>
    )
}

export default MyEditor
