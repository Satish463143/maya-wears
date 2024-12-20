import React from 'react'
import './MyAccount.css'
import { useListOrderForUserQuery } from '../../api/order.api'

const MyAccount = () => {
    const { data, error, isLoading } = useListOrderForUserQuery({ page: 1, limit: 10, search: '' });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    console.log(data);

  return (
    <div className='container'>
        <div className="my_account">
            <div className="peronal_info">
                <h1>Personal Infromation</h1>
                <div className="peronal_info_grid">
                    <div>
                        <label htmlFor="">Full name</label><br />
                        <input type="text"  readOnly/>
                    </div>
                </div>
                {/* <input type="text" value={}/> */}

            </div>
        <h1>Order List</h1>
        </div>
    </div>
  )
}

export default MyAccount  