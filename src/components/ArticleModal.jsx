import React, { useState, useEffect } from "react";
import { Modal, Input, Form } from "antd";

const ArticleModal = ({ isOpen, handleOk, handleCancel, article }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({ title: "", content: "" });

  // Pré-remplit les champs si un article est passé
  useEffect(() => {
    if (article) {
      setFormData({ title: article.title, content: article.content });
      form.setFieldsValue({ title: article.title, content: article.content });
    } else {
      setFormData({ title: "", content: "" });
      form.resetFields();
    }
  }, [article, form]);

  const handleFormSubmit = () => {
    form.validateFields()
      .then(values => {
        values.createdAt = new Date()
        values.comments = []
        handleOk({ ...article, ...values }); // Retourne l'article modifié
        form.resetFields();
      })
      .catch(info => {
        console.log("Validation Failed:", info);
      });
      
  };

  return (
    <Modal
      title={article ? "Modifier l'article" : "Ajouter un article"}
      open={isOpen}
      onOk={handleFormSubmit}
      onCancel={handleCancel}
      okText="Enregistrer"
      cancelText="Annuler"
    >
      <Form form={form} layout="vertical" initialValues={formData}>
        <Form.Item
          name="title"
          label="Titre"
          rules={[{ required: true, message: "Veuillez entrer un titre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Contenu"
          rules={[{ required: true, message: "Veuillez entrer un contenu" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ArticleModal;
