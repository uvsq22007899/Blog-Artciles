import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

export default function MyButton() {
  return (
    <Tooltip title="Cliquez ici">
      <Button className="butt" type="primary" icon={<EditOutlined />} onClick={() => console.log("coucou")}>Holà que tàl</Button>
    </Tooltip>

  )
}
