import React, {useState} from 'react'
import AdminTitle from '../../../Middlewares/AdminTitle/AdminTitle'
import { Link } from 'react-router-dom';

const Banner_1_Edit = () => {
    const [loading,setLoading] = useState(false)
    const [selectedCategory, setSelectedCategory ] = useState('')
  return (
    <div className='admin_margin_box'>
        <div className="admin_titles">
            <AdminTitle label1=" Banner 1 List" label2="/Edit_Banner" url="/admin/banner_1"/>
            <div className='Dashboard_title'>
                <h1>Edit Banner 1</h1>
            </div>
        </div>

        <div className="banner_form">
            <form action="" method='put' >
                <h3>Content</h3>
                <div className="from_grid">
                    <div>
                        <label htmlFor="title">Title</label><br />
                        <textarea type="text" name='title'  /><br />
                    </div>
                    <div>
                        <label htmlFor="content">Content</label><br />
                        <textarea type="text" name='content'/><br />
                    </div>
                    <div>
                        <label htmlFor="link">Link</label><br />
                        <input type="text" name='link'  /><br />
                    </div>
                    <div>
                        <label htmlFor="category">Category</label><br />
                        <select name="category" id="category"  onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select><br />
                    </div>
                </div>
                <h3>Image/Video</h3>
                <div className="from_grid">
                    {selectedCategory === 'image' && 
                        <div>
                            <label htmlFor="desktopVideo">Desktop Image</label><br />
                            <input type="file" name='desktopVideo'  /><br />
                        </div> 
                    }
                    {selectedCategory === 'video' && 
                        <div>
                            <label htmlFor="desktopImage">Desktop Video</label><br />
                            <input type="file" name='desktopImage'  /><br />
                        </div>
                    }
                    {selectedCategory === 'image' && 
                        <div>
                            <label htmlFor="mobileImage">Mobile Image</label><br />
                            <input type="file" name='mobileImage'  /><br />
                        </div>
                    }
                    {selectedCategory === 'video' && 
                        <div>
                            <label htmlFor="mobileVideo">Mobile Video</label><br />
                            <input type="file" name='mobileVideo'  /><br />
                        </div>
                    }
                </div>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <input type="submit" value='Update Banner' name='updateBanner_1' disabled={loading}/>
                </div>
            </form>
        </div>


    </div>
  )
}

export default Banner_1_Edit