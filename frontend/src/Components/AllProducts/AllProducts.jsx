import React ,{useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import './AllProducts.css'
import { useListForHomeQuery } from '../../api/product.api'
import AllProductItem from '../../Middlewares/AllProductItem/AllProductItem'
import LoadingComponent from '../../Middlewares/Loading/Loading.component'

const AllProducts = () => {
    const location = useLocation();
    const [search, setSearch] = useState(location.state?.searchQuery || '');
    const {data, error, isLoading, refetch}  = useListForHomeQuery({search})
    
    useEffect(() => {
        // Update search state if location changes (e.g., new search)
        if (location.state?.searchQuery !== undefined) {
          setSearch(location.state.searchQuery);
        }
      }, [location.state?.searchQuery]);
    
      useEffect(() => {
        // Trigger refetch when search changes
        refetch();
      }, [search, refetch]);
    
      if (isLoading) return <LoadingComponent
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            backgroundColor: '#f9f9f9',
        }}
      />;
      const products = data?.result?.data || [];

  return (
    <div className='container' style={{marginBottom:'15px'}}>
        <div>
            <div className="prouct_title">
                <div><span>Catogories</span><span>/</span>All Products</div>
            </div>
            <div className="products_grid">
                {products.length ? (
                    products.map((item, index) => (
                    <AllProductItem
                        key={index}
                        _id={item._id}
                        slug={item.slug}
                        images={item.mainImage}
                        title={item.title}
                        price={item.price}
                    />
                    ))
                ) : (
                    <p>No products found for "{search}"</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default AllProducts