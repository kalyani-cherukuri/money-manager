import React, { useState } from 'react';
import { assets } from '../assets/assets';
import Input from "../components/Input";
import { LoaderCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail } from '../util/validation';
import axiosConfig from '../util/axiosConfig';
import { API_ENDPOINTS } from '../util/apiEndpoints';
import { toast } from 'react-hot-toast';
import ProfilePhotoSelector from '../components/ProfilePhotoSelector';


export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto,setProfilePhoto]=useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    setIsLoading(true);
    setError(null); // Reset error state at start

    // ... Your existing validation logic (Full Name, Email, Password) ...

    try {
        if (profilePhoto) {
            const imageUrl = await uploadProfileImage(profilePhoto);
            profileImageUrl = imageUrl || "";
        }

        const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
            fullName,
            email,
            password,
            profileImageUrl
        });

        if (response.status === 201) {
            toast.success("Profile Created successfully");
            navigate("/login");
        }
    } catch (err) {
        console.error('Signup Error:', err);

        // Check if the server returned a response (e.g., 400 or 409 Conflict)
        if (err.response && err.response.data && err.response.data.message) {
            // This pulls the specific "User already exists" message from your backend
            setError(err.response.data.message);
        } else {
            // Fallback for general network errors
            setError("An unexpected error occurred. Please try again.");
        }
    } finally {
        setIsLoading(false);
    }
};
  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <img src={assets.login1_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 w-full max-w-lg px-6">

                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-semibold text-black text-center mb-2">
                            Create An Account
                        </h3>
                        <p className="text-sm text-slate-700 text-center mb-8">
                            Start tracking your spendings by joining with us.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex justify-center mb-6">
                                <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto}/>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                                <Input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    label="Full Name"
                                    placeholder="Enter Full Name"
                                    type="text"
                                />
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email Address"
                                    placeholder="name@example.com"
                                    type="text"
                                />
                                <div className="col-span-2">
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="Password"
                                        placeholder="*********"
                                        type="password"
                                    />
                                </div>
                            </div>
                            {error && (
                                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded mb-2">
                                     {error}
                                </p>
                            )}

                            <button disabled={isLoading} className="w-full py-3 text-lg font-medium bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-md shadow-md hover:from-purple-700 hover:to-purple-900 transition-all" type="submit">
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="animate-spin w-5 h-5"/>
                                        Signing up.. 
                                    </>
                                ):(
                                    "SIGN UP"
                                )}
                            </button>

                           <p className="text-sm text-slate-800 text-center mt-4">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-primary underline hover:text-primary-dark transition-colors">Login</Link>
                            </p>
                    </form>
                </div>

        </div>
    </div> 
  )
}
