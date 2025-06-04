import { Button, Tooltip, Spin, Card } from "antd";
import logo from "/logo.webp";
import "./App.css";
import { EditOutlined } from "@ant-design/icons";
import ArticleModal from "./components/ArticleModal";
import { useEffect, useState } from "react";
import { getArticles, deleteArticle } from "./fire";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);


  useEffect(() => {
    getArticles(posts => {
      setArticles(posts)
      setLoading(false)

    })
  }, [])

  // Fonction appelée au clique sur un bouton de suppression
  const removeArticle = () => {
    // Supprimer l'article cliqué de la base de données
    deleteArticle(selectedArticle)
  }

  const actions = [
    <EditOutlined key="edit" />,
  ];


  console.log(articles, loading);

  return (
    <>
      <div>
        <a href="https://vite.dev/" target="_blank">
          <img src={logo} className="logo" alt="logo" />
        </a>
      </div>




      <h1>SpaceTitle</h1>
      {loading ? (
        <Spin />
      ) : (
        // Sinon, affiche tous les articles dans des cartes Ant Design
        articles.map(article => (
          <Card
            key={article.id}
            title={article.title}
            bordered={false}
            style={{ width: 300 }}
            actions={actions}
          >
            <p>{article.content}</p>
          </Card>
        ))
      )}

      <Tooltip title="Cliquez ici pour ajouter un article">
        <Button
          type="primary"
          className="btn"
          icon={<EditOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Rédiger un article
        </Button>
      </Tooltip>
      {isModalOpen && (
        <ArticleModal
          handleOk={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          handleCancel={() => setIsModalOpen(false)}
        ></ArticleModal>
      )}
    </>
  );
}

export default App;