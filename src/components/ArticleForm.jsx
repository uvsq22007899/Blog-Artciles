import { Input } from 'antd'

export default function ArticleForm({title, content, setTitle, setContent}) {
  const handleChange = e => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value)
        break
      case 'content':
        setContent(e.target.value)
        break
      default:
        break
    }
  }

  return (
    <form>
      <label htmlFor='title'>Titre</label>
      <Input
        type='text'
        name='title'
        id='title'
        placeholder='Votre titre'
        value={title}
        onChange={handleChange}
      />
      <label htmlFor='content'>Contenu</label>
      <Input.TextArea
        name='content'
        id='content'
        placeholder='Votre contenu'
        value={content}
        onChange={handleChange}
      />
    </form>
  )
}