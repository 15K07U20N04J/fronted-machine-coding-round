import { useState, useRef } from 'react'
import File from './File';
import './Folder.css'

const Folder = ({ folder }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: true
    })
    const inputRef = useRef(null);

    function toggleOpen (e){
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    function handleNewFolder (e, isFolder) {
        e.stopPropagation()
        setIsOpen(true)
        setShowInput({
            visible: true,
            isFolder: isFolder
        })
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    }

    function closeInputBox (e) {
        e.stopPropagation()
        setShowInput({
            visible: false,
            isFolder: true
        })
    }

    function addNewElement (e) {
        e.stopPropagation()
        if (e.key === 'Enter') {
            const newElementName = e.target.value.trim();
            if (newElementName) {
                const newElement = {
                    id: Date.now().toString(),
                    name: newElementName,
                    isFolder: showInput.isFolder,
                    items: []
                };
                folder.items.push(newElement);
            }
            setShowInput({
                visible: false,
                isFolder: true
            })
        }
    }

    return (
        <div class="border" onClick={toggleOpen}>
            <div className='folder-item' onClick={() => setIsOpen(!isOpen)}>
                <span>{isOpen ? '📂' : '📁'} {folder.name}</span>
                <span>
                    <span className="badge" onClick={(e) => handleNewFolder(e,true)}>
                    Folder
                </span>
                <span className="badge" onClick={(e) => handleNewFolder(e, false)}>
                    File
                </span>
                </span>
            </div>
            <div>
                {showInput.visible && <input type="text" ref={inputRef} placeholder={showInput.isFolder ? "Folder name..." : "File name..."} onBlur={closeInputBox} onKeyDown={addNewElement}/>}
            </div>
            <ul>
                {isOpen && folder.items.map((item) => {
                    if (item.isFolder) {
                        return <Folder key={item.id} folder={item} isOpen={isOpen} setIsOpen={setIsOpen} />;
                    } else {
                        return <File key={item.id} file={item} />;
                    }
                })}
            </ul>
        </div>
    )
}

export default Folder
