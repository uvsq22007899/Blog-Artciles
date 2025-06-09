import { Button, Tooltip, Spin, Card, Popconfirm } from "antd";
import logo from "./assets/Sujet.png";
import "./App.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ArticleModal from "./components/ArticleModal";
import { useEffect, useState } from "react";
import { getArticles, addArticle, updateArticle, deleteArticle } from "./fire";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    getArticles((posts) => {
      setArticles(posts);
      setLoading(false);
    });
  }, []);

  const handleEditArticle = (article) => {
    setSelectedArticle(article); // Définit l'article sélectionné
    setIsModalOpen(true); // Ouvre le modal
  };

  const handleModalClose = (updatedArticle) => {
    if (updatedArticle) {
      const saveArticle = updatedArticle.id
        ? updateArticle // Si l'article a un ID, on le met à jour
        : addArticle; // Sinon, on l'ajoute

      saveArticle(updatedArticle)
        .then(() => {
          setArticles((prevArticles) => {
            const articleExists = prevArticles.some(
              (article) => article.id === updatedArticle.id
            );
            if (articleExists) {
              return prevArticles.map((article) =>
                article.id === updatedArticle.id ? updatedArticle : article
              );
            }
            return [...prevArticles, updatedArticle]; // Ajoute le nouvel article
          });
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement de l'article :", error);
        });
    }
    setSelectedArticle(null); // Réinitialise l'article sélectionné
    setIsModalOpen(false); // Ferme le modal
  };

  const handleDeleteArticle = (articleToDelete) => {
    deleteArticle(articleToDelete)
  };

  return (
    <>
      <div>
        <a href="https://vite.dev/" target="_blank">
        </a>
      </div>

      <h1>À LA RENCONTRE DU COSMOS ✨🚀</h1>

      <Tooltip title="Donnez nous votre avis sur notre Hotel">
        <Button
          type="primary"
          className="btn"
          icon={<EditOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Décrivez votre voyage spatial
        </Button>
      </Tooltip>
      {isModalOpen && (
        <ArticleModal
          isOpen={isModalOpen}
          handleOk={handleModalClose}
          handleCancel={() => setIsModalOpen(false)}
          article={selectedArticle}
        />
      )}
      <div className="d-flex">
        {loading ? (
          <Spin />
        ) : (
          articles.map((article) => (
            <Card
              className="carte"
              key={article.id}
              title={article.title}
              bordered={false}
              style={{ width: 300 }}
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => handleEditArticle(article)}
                />,
                <Popconfirm
                  title="Supprimer cet article ?"
                  description="Êtes-vous sûr de vouloir supprimer cet article ?"
                  onConfirm={() => handleDeleteArticle(article)}
                  onCancel={() => console.log("Suppression annulée")}
                  okText="Oui"
                  cancelText="Non"
                >
                  <DeleteOutlined key="trash" />
                </Popconfirm>,
              ]}
            >
              <p>{article.content}</p>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export default App;
