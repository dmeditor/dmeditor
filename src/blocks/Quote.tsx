import { TitleOutlined } from '@mui/icons-material'
import { RenderMainProps, RenderSettingProps } from '../blocktype'
import { BlockData, BlockLayoutData } from '../types'
import { CommonSetting } from '../Property'
import { Ranger } from '../utils/Ranger'

export interface DataQuote {
  text: string
  style: {
    level: number
  }
}

const Quote = (props: {
  data: BlockData
  isActive: boolean
  onChange?: any
}) => {
  const content = props.data.data as DataQuote

  const change = (e: any) => {
    const text = e.target.innerText
    if (props.onChange) {
      content.text = text
      let newData = props.data
      newData.data = content
      props.onChange(newData)
    }
  }

  const common = {
    onBlur: change,
    contentEditable: props.isActive,
    style: { ...props.data.layout },
  }

  return <blockquote className='blockquote' {...common}>{content.text}</blockquote>
 
}

const QuoteSettings = (props: RenderSettingProps) => {

  const changeCommon = (settings: BlockLayoutData) => {
    let data = props.data
    data.layout = settings
    props.onSetting(data)
  }

  return (
    <div>
      <label>Quote</label>
           <CommonSetting settings={props.data.layout} onChange={changeCommon} />
    </div>
  )
}

export const QuoteHandler = {
  type: 'quote',
  menu: { text: 'Quote', category: 'basic', icon: <TitleOutlined /> },
  renderMain: (props: RenderMainProps) => <Quote {...props} />,
  getDefaultData: (): BlockData => {
    return {
      layout: { padding: 0 },
      data: { text: 'Test111222', style: { level: 2 } },
    }
  },
  renderSetting: (props: RenderSettingProps) => <QuoteSettings {...props} />,
}
