import express from "express"
import {google} from "googleapis"

const app = express()
app.use(express.json())

async function getAuthentication(){
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
      })

    const spreadsheetId = "1TyPimBnVru-FL0NYpdhTteblhE50PRvUBn8jRdOX6M4"
    const client = await auth.getClient()
    const googleSheets = google.sheets({
        version: "v4",
        auth: client
    })

    return {
        auth,
        client,
        googleSheets,
        spreadsheetId
    }
}

app.get("/metadata", async(req, res)=>{
    const {googleSheets, auth, spreadsheetId} = await getAuthentication()
    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    })
    res.send(metadata)
})

//get all
app.get("/notes", async(req, res)=>{
    const {googleSheets, auth, spreadsheetId} = await getAuthentication()
    const notes = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1" 
    })
    res.send(notes.data.values)
})

//get by id
app.get("/notes/:id", async(req, res)=>{
    const id = req.params.id
    const {googleSheets, auth, spreadsheetId} = await getAuthentication()
    const notes = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1" 
    })
    res.send(notes.data.values[id])
})

//post
app.post("/notes", async(req, res)=>{
    const {googleSheets, auth, spreadsheetId} = await getAuthentication()
    const {values} = req.body
    const note = await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1",
        valueInputOption: "RAW",
        resource: {
            values: values
        } 
    })
    res.send(note.value)
})

//delete
app.delete("/notes/:id", async(req, res)=>{
    const id = req.params.id
    const {googleSheets, auth, spreadsheetId} = await getAuthentication()
    const response = await googleSheets.spreadsheets.values.clear({
        auth,
        spreadsheetId,
        range: `Sheet1!A${id}` 
    })
    res.send(response)
})

//patch
app.patch("/notes/:id", async(req, res)=>{
    const id = req.params.id
    const {values} = req.body
    const {googleSheets, auth, spreadsheetId} = await getAuthentication()
    const note = await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: `Sheet1!A${id}`,
        valueInputOption: "RAW",
        resource: {
            values: values
        } 
    })
    res.send(note)
})


app.listen(3000, () => console.log("http://localhost:3000/notes"))