import "../styles/ArticlesCarComponentStyle.css";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText, Pagination, PaginationItem, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import CAR_LOGO from "../page-images/Green-sports-car.png";
import axios from "axios";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const BASE_URL = "http://localhost:8080";

function ArticlesCarComponent() {

  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const articlePerPage = 4;
  const indexOfLastArticle = currentPage * articlePerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlePerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const numberOfPages = Math.ceil(articles.length / articlePerPage);

  useEffect(() => {
    getAllArticles();
  }, []);

  const paginateArticles = (target, value) => {
    setCurrentPage(value);
  };

  const getAllArticles = () => {
    axios.get(BASE_URL + "/get-all-articles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const openArticleEditor = () => {
    navigate("/add-new-article");
  }

  return (
    <div className="articles-outer-div">
      <h1 className="articles-header">Articles</h1>
      <div className="articles-inner-div">
        <div className="add-new-article-div">
          <Button color="success" variant="contained" onClick={() => {openArticleEditor()}}>Add new article</Button>
        </div>
        <div className="articles-div-list">
          <List dense sx={{ width: '100%' }}>
            {currentArticles.map((article, index) => (
              <ListItem key={index} style={{marginBottom: "0.5rem"}}>
                <ListItemAvatar>
                  <Avatar alt={`Avatar nr 1`} src={CAR_LOGO}/>
                </ListItemAvatar>
                <ListItemText>
                  <h2>{article.articleHeader}</h2>
                  <div className="inline-paragraph-div">
                    <p id="paragraph-text">{(article.articleBody).slice(0, 120)}</p>
                  </div>
                  <div className="inline-paragraph-div right-align-href">
                    <a className="href-redirect" href={`/article-details/${article.articleId}`}><p>show more...</p></a>
                  </div>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div className="articles-pagination-div">
        <Stack className="articles-pagination-stack" spacing={2}>
          <Pagination className="articles-center-pagination-div" count={numberOfPages} color="success" onChange={paginateArticles}/>
        </Stack>
      </div>
    </div>
  );
}

export default ArticlesCarComponent