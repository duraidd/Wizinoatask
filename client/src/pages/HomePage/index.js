import React from 'react'
import CustomAppBar from '../../components/CustomAppBar'
import BulkMailSender from './components/BulkMailSender'
import MyImages from './components/MyImages'

const HomePage = () => {
    const [selectedPage, setSelectedPage] = React.useState(0)
  return (
    <div>
        <CustomAppBar setSelectedPage={setSelectedPage} selectedPage={selectedPage}/>
        {
            selectedPage === 0 && <BulkMailSender />
        }
        {
            selectedPage === 1 && <MyImages />
        }

    </div>
  )
}

export default HomePage