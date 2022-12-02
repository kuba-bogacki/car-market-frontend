import "../styles/ArticleDetailsComponentStyle.css";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

function ArticleDetailsComponent() {

  const {articleId} = useParams();
  const [article, setArticle] = useState("");

  useEffect(() => {
    getArticle();
  }, []);

  const getArticle = () => {
    axios.get(BASE_URL + `/get-individual-article/${articleId}`)
      .then((response) => {
        console.log(response.data);
        setArticle(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="article-outer-div">
      <h1 className="article-header">Article details</h1>
      <div className="article-inner-div">
        <div className="article-details-header"><hr/><br/>
          <h2 style={{textAlign: "left"}}><i>{article.articleHeader}</i></h2>
        </div>
        <div className="article-details-author-date">
          <p style={{textAlign: "right"}}><i>{article.articleDate}</i></p>
        </div>
        <div className="article-details-body"><hr/><br/>
          <h4 style={{textAlign: "left"}}>{article.articleBody}</h4>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetailsComponent;