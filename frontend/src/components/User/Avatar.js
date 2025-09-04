import React, {useState} from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Avatar() {

    let userId = localStorage.getItem("currentUser");

    const [img, setImg] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      if(selectedValue!==""){
      console.log("Seçilen deger : "+selectedValue);
      handleAvatarChange();
      }
    };

    const getUserAvatar = async () => {
        fetch("/users/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
        }).then((response) => response.json())
        .then((result) => {
            setImg("/avatars/avatar" + result.avatar_id + ".png");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }

    React.useEffect(() => {
        getUserAvatar();
    }, []);


    const handleAvatarChange = async () => {
        fetch("/users/" + userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                userName : localStorage.getItem("userName"),
                password : "null",
                avatar_id : selectedValue
            }),
        }).then((response) => {
            if (response.ok) {
                console.log("Avatar updated successfully");
                setImg("/avatars/avatar" + selectedValue + ".png");
                window.location.href = "/users/" + userId;
            } else {
                console.error("Failed to update avatar");
            }
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    return (
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            
            
            <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          image = {img}
          alt="User Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {localStorage.getItem("userName")}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <p>Kullanıcı ID: {userId}</p>
          </Typography>
        </CardContent>
      <CardActions>
        <Button onClick={handleOpen} size="small" color="primary">
          Avatarı Değiştir
        </Button>
      </CardActions>
    </Card>

    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Avatar
          </Typography>
          <FormControl style={{marginTop:"20px",display:"flex"}}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="1"
              name="radio-buttons-group"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              <div style={{display:"flex",justifyContent:"flex-start",flexDirection:"row",flexWrap:"wrap"}}>
                <div style={{display:"flex",justifyContent:"flex-start",width:"50%",marginTop:"10px"}}>
                <img id="photo" src="/avatars/avatar1.png" alt="avatar" style={{width:"100px",marginRight:"30px"}} ></img>
                <FormControlLabel value="1" control={<Radio />} />
                </div>
                <div style={{display:"flex",justifyContent:"flex-start",width:"50%",marginTop:"10px"}}>
                <img id="photo" src="/avatars/avatar2.png" alt="avatar" style={{width:"100px",marginRight:"30px"}} ></img>
                <FormControlLabel value="2" control={<Radio />} /></div>
                <div style={{display:"flex",justifyContent:"flex-start",width:"50%",marginTop:"10px"}}>
                <img id="photo" src="/avatars/avatar3.png" alt="avatar" style={{width:"100px",marginRight:"30px"}} ></img>
                <FormControlLabel value="3" control={<Radio />} />
                </div>
                <div style={{display:"flex",justifyContent:"flex-start",width:"50%",marginTop:"10px"}}>
                <img id="photo" src="/avatars/avatar4.png" alt="avatar" style={{width:"100px",marginRight:"30px"}} ></img>
                <FormControlLabel value="4" control={<Radio />} />
                </div>
                <div style={{display:"flex",justifyContent:"flex-start",width:"50%",marginTop:"10px"}}>
                <img id="photo" src="/avatars/avatar5.png" alt="avatar" style={{width:"100px",marginRight:"30px"}} ></img>
                <FormControlLabel value="5" control={<Radio />} />
                </div>
                <div style={{display:"flex",justifyContent:"flex-start",width:"50%",marginTop:"10px"}}>
                <img id="photo" src="/avatars/avatar6.png" alt="avatar" style={{width:"100px",marginRight:"30px"}} ></img>
                <FormControlLabel value="6" control={<Radio />} />
                </div>
                </div>
            </RadioGroup>
          </FormControl>
          <Button style={{marginTop:"20px",marginRight:"20px"}} onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
        </div>
    );
}

export default Avatar;