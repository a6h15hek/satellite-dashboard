import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper} from '@material-ui/core';
import Title from 'components/Title';
import { getDocument } from 'Services/Datastore';
import AceEditor from 'react-ace';
import getJSONParseError from './JSONParse';
import { setDocument } from 'Services/Datastore';
require('brace/mode/json');
require('brace/theme/monokai');

const useStyles = makeStyles({
    marginHorizontal :{
        marginRight : 5,
        marginLeft : 5
    },
    DataObjectInfo : {
        margin : 8,
        padding : 3,
        fontSize : 15
    },
    ErrorStatus : {
        margin : 5,
        padding : 3,
        fontSize : 13,
        color : 'red'
    }
});


const DataObjectEditor = ({collection_name, document_name}) => {
    const classes = useStyles();
    const [status, setStatus] = React.useState("");
    var newDataObjectString = "";

    //data object 
    const [timeObject, setTimeObject] = React.useState({
        updated_at : "",
        created_at : ""
    });
    const [dataObject, setDataObject] = React.useState("");

    React.useEffect(()=>{
        if(collection_name !== "" && document_name !== ""){
            getDocument(collection_name, document_name, ()=>{
                //wait
                setStatus("Loading...");
            }, response=>{
                setDataObject(response.data.dataObject)
                setTimeObject({
                    updated_at : response.data.updatedAt,
                    created_at : response.data.createdAt
                });
                setStatus(response.message)
            })
        }else{
            setDataObject("")
            setTimeObject({updated_at : "",created_at : ""});
            setStatus("")
        }
    },[collection_name, document_name]);

    const handleEditorCodeOnChange = (newDataString) =>{
        newDataObjectString = newDataString;
    }

    const convertStringToJSON = (jsonString) =>{
        if(jsonString) {
            try {
                var a = JSON.parse(jsonString);
                return a;
            } catch(e) {
                return false
            }
        }else {
            setStatus("Content not changed.")
            return false;
        }
    }
    const handleRefreshClick = (message="") =>{
        if(collection_name !== "" && document_name !== ""){
            getDocument(collection_name, document_name, ()=>{
                //wait
                setStatus("Loading...");
            }, response=>{
                if(response.success){
                    setDataObject(response.data.dataObject);
                    setTimeObject({
                        updated_at : response.data.updatedAt,
                        created_at : response.data.createdAt
                    });
                    setStatus(message+" : "+response.message)
                }
            })
        }
    }

    const handleSaveClick = () =>{
        const newDataObject = convertStringToJSON(newDataObjectString);
        document.getElementById("errorStatus").innerHTML = "";
        if(newDataObject) {
            console.log("correct called");
            setDocument(collection_name, document_name, newDataObject, false, ()=>{
                //wait
                setStatus("Loading...");
            },response=>{
                if(response.success){
                    handleRefreshClick(response.message);
                }else{
                    setStatus(response.message)
                }
            })
        }else{
             const error = getJSONParseError(newDataObjectString);
             console.log("Line " + error.line + ":" + error.column + ": '" + error.snippet +"' " + error.message);
             document.getElementById("errorStatus").innerHTML = "Line " + error.line + ":" + error.column + ": '" + error.snippet +"' " + error.message;
        }
    } 


    return (
        <div>
             <Box flexDirection="row" alignItems="center">
                <Title>Editor</Title>
                <Button className={classes.marginHorizontal} size="small" variant="contained" color="primary" onClick={handleRefreshClick}>Refresh</Button>
                <Button className={classes.marginHorizontal} size="small" variant="contained" style={{backgroundColor : '#4caf50'}} onClick={handleSaveClick}>Save</Button>
                {status}
            </Box>
            <Paper variant="outlined" elevation={3} className={classes.DataObjectInfo} square >
                <div>Document Name : <b>{document_name}</b></div> 
                <div>Updated At : <b>{timeObject.updated_at}</b></div>
                <div>Created At : <b>{timeObject.created_at}</b></div>
            </Paper>
            <Paper variant="outlined" elevation={3} className={classes.ErrorStatus} square >
                <div><b id="errorStatus"></b></div> 
            </Paper>
            <AceEditor
                width ="100%"
                placeholder="Document Editor"
                mode="json"
                theme="monokai"
                name="blah2"
                onLoad={()=>console.log("loaded")}
                onChange={handleEditorCodeOnChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={JSON.stringify(dataObject,null,'\t')}
                setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
            }}/>
            
        </div>
    )
}

export default DataObjectEditor;
