const fs = require('fs')
const chalk = require('chalk')
const getNotes =  () => { 'Your notes...'}

const addNote = function (title, body) {
    const notes = loadNotes()
    // it is containing list of duplicate values
   // const duplicateNotes = notes.filter( (note) => note.title === title )
    const duplicateNote = notes.find( (note) => note.title === title )

    //debugger
    // run : node inspect app.js 

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}
const removeNote = (title) =>{
    const notes = loadNotes()
    const notestoKeep = notes.filter( (note) => note.title !== title)
    if (notes.length > notestoKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notestoKeep)    
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
    
}

const listNotes = () =>{ 
  console.log(chalk.blue.bold.inverse('Your Notes'))
  const notes = loadNotes() 

  notes.forEach( (note) => {
      console.log(note.title)
  });
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find( (note) => note.title === title )
    if(noteToRead){
        console.log(chalk.green('Title :' + noteToRead.title))
        console.log(chalk.blue('Body : ' + noteToRead.body))
    } else{
        console.log(chalk.red.inverse('No note with this title'))
    }
    

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}