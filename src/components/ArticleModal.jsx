import React from "react";
import { Modal } from "antd"
import ArticleForm from "./ArticleForm";
import { useState } from 'react'
import { addArticle } from '../fire'

export default function ArticleModal(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    let article = {
      title: title,
      content: content,
      createdAt: new Date(),
      comments: []
    }
    addArticle(article)
  }

  return (
    <Modal title="Basic Modal" open={props.isOpen} onCancel={props.handleCancel} onOk={handleSubmit} >
      <ArticleForm title={title} content={content} setTitle={setTitle} setContent={setContent} />
    </Modal>
  )
}