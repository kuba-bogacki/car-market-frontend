import "../styles/AddNewArticleComponentStyle.css";
import {Modal, TextField} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import authHeader from "../service/AuthHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

const BASE_URL = "http://localhost:8080";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddNewArticleComponent() {

  const customer = authHeader();
  const navigate = useNavigate();
  const [articleHeader, setArticleHeader] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [showArticle, setShowArticle] = useState(false);

  const addNewArticle = () => {
    if (customer === null) {
      setModalHeader("You are not logged in");
      setModalBody("If you want to add an article, you need to login first.")
      openModal();
    } else {
      let data = {articleHeader, articleBody};
      axios.post(BASE_URL + "/add-new-article", data, {
        headers : customer
      })
        .then(() => {
          setModalHeader("Article saved");
          setModalBody("Your article saved successfully")
          openModal();
        });
    }
  }

  const openModal = () => {
    setShowArticle(true);
  }

  const closeModal = () => {
    setShowArticle(false);
    if (modalHeader === "Article saved") {
      navigate("/articles");
    }
  }

  return (
    <div className="new-article-outer-div">
      <h1 className="new-article-header">Add new article</h1>
      <div className="new-article-inner-div">
        <TextField
          id="outlined-textarea" label="Article title" placeholder="Article title" fullWidth color="success"
          type="title" multiline onChange={(e) => setArticleHeader(e.target.value)} style={{marginBottom: "1rem"}}
        />
        <TextField
          id="outlined-multiline-static" label="Article text" placeholder="Article text" fullWidth color="success"
          type="text" multiline rows={9} onChange={(e) => setArticleBody(e.target.value)}
        />
        <Button color="success" variant="contained" onClick={addNewArticle} style={{marginTop: "1rem"}}>Save</Button>
      </div>
      {showArticle &&
        <Modal open={() => {openModal()}} onClose={() => {closeModal()}}
               aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalHeader}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalBody}
            </Typography>
          </Box>
        </Modal>}
    </div>
  );
}

export default AddNewArticleComponent;