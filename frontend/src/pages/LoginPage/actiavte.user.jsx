import { useEffect, useState } from "react";
import { useNavigate, useParams,useOutletContext } from "react-router-dom";
import '../LoginPage/LoginPage.css';
import { toast } from "react-toastify";
import authSvc from "./auth.service";
import LoadingComponent from "../../Middlewares/Loading/Loading.component";

const UserActivation = () => {
    const {setIsVisible} = useOutletContext()
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);

    const activateUser = async () => {
        try {
            await authSvc.getRequest('/auth/activate/' + params.token);
            toast.success("Your Account has been activated. Please proceed ahead.");
            setModal(false);
            navigate('/')
            setIsVisible(true)

        } catch (exception) {
            if (+exception.status === 422 && exception.data.message === 'Token Expired') {
                setModal(true);
                toast.error(exception.data.message);
            }
            if (+exception.status === 404 && exception.data.message === 'User does not exits') {
                setIsVisible(true);
                toast.error("User does not exist. Please proceed to signup");
                
                // Small delay before navigating
                setTimeout(() => {
                    navigate('/');
                }, 300); // Delay in milliseconds
             }
            
        } finally {
            setLoading(false);
        }
    };

    const resendToken =async ()=>{
        try{
            await authSvc.getRequest("/auth/resend-activationtoken/"+params.token)
            setMsg("A new token has been sent to your email. Please check your email")  
            setLoading(false)
            setModal(false)   

        }catch(exception){
            toast.error("Error sending reset token")
            throw exception
        }
    }

    useEffect(() => {
        activateUser();
    }, []);

    return (
        <div className="activation">
            <div>
                {loading ? <LoadingComponent /> : <div>{msg}</div>}
            </div>

            {/* Render modal if modal state is true */}
            {modal && (
                <div id="popup-modal" className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 text-center">
                                <svg
                                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Your token has expired. Would you like to request a new one?
                                </h3>
                                <button
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5"
                                    onClick={() => {
                                        // Handle token renewal action
                                        resendToken();
                                        
                                    }}
                                    disabled={loading}
                                >
                                    Yes, renew token
                                </button>
                                <button
                                    type="button"
                                    className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                                    onClick={() => setModal(false)}
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserActivation;
