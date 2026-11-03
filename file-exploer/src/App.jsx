import { useState } from 'react'
import './App.css'
import exploreData from './data/folderData.js'
import Folder from './components/Folder.jsx';
import File from './components/File.jsx';

function App() {
  const [explore, setExplore] = useState(exploreData)

  return (
    <div className="App">
      {explore.isFolder ? (
        <Folder key={explore.id} folder={explore} />
      ) : (
        <File key={explore.id} file={explore} />
      )}
    </div>
  )
}

export default App
