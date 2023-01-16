import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SnackbarProvider, useSnackbar } from 'notistack';



const originalData = [
  { "id": 1, "cpt": "121,122", "dx": "20,21", "description": "description1", "age": 21 },
  { "id": 2, "cpt": "122,122", "dx": "20,21", "description": "description2", "age": 22 },
  { "id": 3, "cpt": "123,122", "dx": "20,21", "description": "description2", "age": 23 },
  { "id": 4, "cpt": "124,122", "dx": "20,21", "description": "description3", "age": 24 },
  { "id": 5, "cpt": "125,122", "dx": "20,21", "description": "description4", "age": 25 },
  { "id": 6, "cpt": "126,122", "dx": "20,21", "description": "description5", "age": 26 },
]

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MyApp = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [dx, setDx] = useState('');
  const [cpt, setCpt] = useState('');
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [resultLength, setResultLength] = useState(0);
  const [count, setCount] = useState(0);
  const [current, setCurrent] = useState(1);
  const [table, setTable] = useState(originalData);


  // form 
  const [formDx, setFormDx] = useState('');
  const [formCpt, setFormCpt] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formDesc, setFormDesc] = useState('');


  const [open, setOpen] = React.useState(false);

  const handleEditFormOpen = (id) => {

    setIsEditing(true)
    setOpen(true);
    let obj = table.filter(item => item.id == id)[0]
    setFormDx(obj?.dx)
    setFormCpt(obj?.cpt)
    setFormAge(obj?.age)
    setFormDesc(obj?.description)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const search = () => {

    setCurrent(1)
    setShowResult(true)

    let cptFound = []
    let dxFound = []
    let status

    if (dx == "" && cpt == "") {
      status = "No data"
    } else if (cpt == "") {
      status = "No CPT"
    } else if (dx == "") {
      status = "No Dx"
    } else if (dx !== "" && cpt !== "") {
      status = "Dx and Cpt"
    } else {
      console.log("else error")
    }

    //take actions as per the status
    switch (status) {
      case "No data":
        console.log(status)
        setResult([])
        setResultLength(0)
        setShowResult(false)
        window.alert("Provide CPT and/or CPT")
        // code block
        break;

      case "No CPT":
        console.log(status)
        for (let i = 0; i < table.length; i++) {
          if (table[i].cpt.includes(cpt)) {
            dxFound.push(table[i])
          }
        }
        setResult(dxFound)
        setResultLength(dxFound.length)
        break;

      case "No Dx":
        console.log(status)
        for (let i = 0; i < table.length; i++) {
          if (table[i].cpt.includes(cpt)) {
            cptFound.push(table[i])
          }
        }
        setResult(cptFound)
        setResultLength(cptFound.length)
        break;


      case "Dx and Cpt":
        console.log(status)
        for (let i = 0; i < table.length; i++) {
          if (table[i].cpt.includes(cpt)) {
            cptFound.push(table[i])
          }
        }
        // let dxFound = []
        for (let i = 0; i < cptFound.length; i++) {
          if (cptFound[i].dx.includes(dx)) {
            dxFound.push(cptFound[i])
          }
        }
        setResult(dxFound)
        setResultLength(dxFound.length)
        // code block
        break;
      default:
        console.log("error in case", status)
    }


  }

  const handleDelete = (id) => {
    let filteredTable = table.filter(item => item.id !== id)
    setTable(filteredTable)
    let type = "warning"
    enqueueSnackbar('Item deleted', { type })


  }


  const handleClear = () => {
    setCurrent(1)
    setResult([])
    setResultLength(0)
    setShowResult(false)
    setCpt('')
    setDx('')
  }

  const handleAdd = () => {
    // console.log("handle adding")
    if (!formDx || !formDesc || !formCpt) {
      window.alert("Please enter CPT, Dx and Descriptoin")
      return
    }
    table.push({
      id: table.length + 1,
      dx: formDx,
      cpt: formCpt,
      age: formAge,
      description: formDesc
    });
    setOpen(false);
    const variant = 'success'
    enqueueSnackbar('Item added', { variant })

  }


  const handleNext = (e) => {
    // console.log(e.target.value)
    setCurrent(current + 1)
  }

  const handlePrevious = (e) => {
    // console.log(e.target.value)
    setCurrent(current - 1)
  }

  const handleChangeDx = (e) => {
    // console.log(e.target.value)
    setDx(e.target.value)
  }
  const handleChangeCpt = (e) => {
    // console.log(e.target.value)
    setCpt(e.target.value)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SR
          </Typography>
          <Button color="inherit">PC GRID</Button>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: 20, marginLeft: 20, }}>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{ marginBottom: 10 }}>
            <TextField
              id="outlined-required"
              label="DX"
              // defaultValue="Enter DX"
              value={dx}
              // onChange={(text) => setDx(text)}
              onChange={handleChangeDx}

            />
            <TextField
              id="outlined-disabled"
              label="CPT"
              // defaultValue="Enter CPT"
              value={cpt}
              // onChange={(text) => setCpt(text)}
              onChange={handleChangeCpt}
            />

          </div>
          <div style={{
            marginLeft: 10, marginBottom: 30
          }}>
            <Stack spacing={2} direction="row">
              <Button onClick={search} variant="contained">Search</Button>
              <Button onClick={handleClear} variant="outlined">Clear</Button>
            </Stack>
          </div>
        </Box>
        <div style={{ marginLeft: 10, width: 520, }}>
          {showResult && <Alert severity={resultLength > 0 ? "success" : "error"}>{resultLength + " Results found"}</Alert>}
        </div>
        <Stack sx={{ mt: 2, ml: 1 }} spacing={0} direction="row">
          <IconButton disabled={current < 2} onClick={handlePrevious} > <ArrowBackIosIcon /> </IconButton>

          <div style={{ width: 40, height: 40, borderRadius: 40 / 2, backgroundColor: "#dad7cd", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", textAlign: "center" }}>
            <Typography style={{ textAlign: "center", alignSelf: "center" }}>{current}</Typography>
          </div>

          <IconButton disabled={current >= resultLength} onClick={handleNext} variant="outlined"><ArrowForwardIosIcon /> </IconButton>
        </Stack>
        <Box sx={{ borderWidth: 1, borderColor: "red", backgroundColor: "#dad7cd", maxWidth: 520, height: 300, mt: 2, ml: 1 }}>
          <div style={{ padding: 20 }}>
            <Typography>{result[current - 1]?.description}</Typography>
          </div>
          <div style={{ padding: 20 }}>
            {result[current - 1]?.age && <Typography>{"Age: " + result[current - 1]?.age}</Typography>
            }
          </div>
        </Box>
      </div>


      <Box sx={{ mt: 5, ml: 4, mr: 10, mb: 10 }}>
        <div>
          <Button sx={{ mb: 2 }} variant="outlined" onClick={handleClickOpen}>
            Add Data
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Data Form</DialogTitle>
            <DialogContent>
              <Stack spacing={2} direction="row">
                <TextField
                  // margin="dense"
                  id="dx"
                  label="Dx"
                  // fullWidth
                  variant="standard"
                  value={formDx}
                  onChange={e => setFormDx(e.target.value)}

                />
                <TextField
                  // margin="dense"
                  id="cpt"
                  label="CPT"
                  // fullWidth
                  variant="standard"
                  value={formCpt}
                  onChange={e => setFormCpt(e.target.value)}
                />
              </Stack>
              <Stack spacing={2} direction="column">
                <TextField
                  // margin="dense"
                  id="age"
                  label="Age"
                  // fullWidth
                  variant="standard"
                  value={formAge}
                  onChange={e => setFormAge(e.target.value)}
                />
                <TextField
                  sx={{ width: 500 }}
                  // margin="dense"
                  id="description"
                  label="Description"
                  // fullWidth
                  variant="standard"
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">DX</TableCell>
                <TableCell align="right">CPT</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Edit</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {table.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{row.dx}</TableCell>
                  <TableCell align="right">{row.cpt}</TableCell>
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right"><EditIcon onClick={() => handleEditFormOpen(row.id)} /> <DeleteIcon onClick={() => handleDelete(row.id)} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box >
  );
}

// export default MyApp

export default function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}