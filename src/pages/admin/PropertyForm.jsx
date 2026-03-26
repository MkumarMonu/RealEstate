import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiUploadCloud, FiX } from 'react-icons/fi';

const PropertyForm = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [propertyType, setPropertyType] = useState('Apartment');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [area, setArea] = useState('');
    const [amenities, setAmenities] = useState('');
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState('Available');

    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(isEdit);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (isEdit) {
            const fetchProperty = async () => {
                try {
                    const { data } = await axios.get(`/api/properties/${id}`);
                    setTitle(data.title);
                    setDescription(data.description);
                    setPrice(data.price);
                    setLocation(data.location);
                    setAddress(data.address);
                    setPropertyType(data.propertyType);
                    setBedrooms(data.bedrooms);
                    setBathrooms(data.bathrooms);
                    setArea(data.area);
                    setAmenities(data.amenities.join(', '));
                    setImages(data.images);
                    setStatus(data.status);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching property Details');
                    setLoading(false);
                }
            };
            fetchProperty();
        }
    }, [id, isEdit]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            setImages([...images, data]);
            setUploading(false);
        } catch (error) {
            console.error('Upload error', error);
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' } };
            const payload = {
                title, description, price: Number(price), location, address,
                propertyType, bedrooms: Number(bedrooms), bathrooms: Number(bathrooms),
                area: Number(area), amenities: amenities.split(',').map(a => a.trim()),
                images, status
            };

            if (isEdit) {
                await axios.put(`/api/properties/${id}`, payload, config);
            } else {
                await axios.post('/api/properties', payload, config);
            }
            navigate('/admin/properties');
        } catch (error) {
            alert(error.response?.data?.message || error.message);
        }
    };

    if (loading) return <div className="animate-pulse">Loading form data...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center gap-4">
                <Link to="/admin/properties" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition">
                    <FiArrowLeft size={20} className="text-slate-600" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-dark">{isEdit ? 'Edit Property' : 'Add New Property'}</h1>
                    <p className="text-slate-500 mt-1">Fill in the details below</p>
                </div>
            </div>

            <form onSubmit={submitHandler} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
                
                {/* Basic Info */}
                <div>
                    <h3 className="text-xl font-bold text-dark mb-4 border-b border-slate-100 pb-2">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">Property Title *</label>
                            <input type="text" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Price ($) *</label>
                            <input type="number" required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Property Type *</label>
                            <select required className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                                <option value="Apartment">Apartment</option>
                                <option value="Villa">Villa</option>
                                <option value="Plot">Plot</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <h3 className="text-xl font-bold text-dark mb-4 border-b border-slate-100 pb-2">Location Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">City / Location *</label>
                            <input type="text" required placeholder="e.g. Los Angeles" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Full Address *</label>
                            <input type="text" required placeholder="e.g. 123 Main St..." className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div>
                    <h3 className="text-xl font-bold text-dark mb-4 border-b border-slate-100 pb-2">Property Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Bedrooms</label>
                            <input type="number" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Bathrooms</label>
                            <input type="number" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Area (sqft)</label>
                            <input type="number" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={area} onChange={(e) => setArea(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Description *</label>
                        <textarea required rows="5" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Amenities (Comma separated)</label>
                        <input type="text" placeholder="e.g. Pool, Gym, Parking" className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
                    </div>
                </div>

                {/* Media & Status */}
                <div>
                    <h3 className="text-xl font-bold text-dark mb-4 border-b border-slate-100 pb-2">Media & Status</h3>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                        <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="Available">Available</option>
                            <option value="Sold">Sold</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Upload Images</label>
                        <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition">
                            <input type="file" onChange={uploadFileHandler} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <FiUploadCloud className="mx-auto text-4xl text-slate-400 mb-3" />
                            <p className="text-slate-600 font-medium">Click or drag images here to upload</p>
                            {uploading && <p className="text-primary mt-2">Uploading...</p>}
                        </div>
                    </div>

                    {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            {images.map((img, index) => (
                                <div key={index} className="relative group rounded-xl overflow-hidden shadow-sm h-32">
                                    <img src={img} alt="Property" className="w-full h-full object-cover" />
                                    <button type="button" onClick={() => removeImage(index)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FiX className="text-white text-3xl hover:text-red-500 transition" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                    <button type="button" onClick={() => navigate('/admin/properties')} className="px-6 py-3 border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 transition">
                        Cancel
                    </button>
                    <button type="submit" className="px-8 py-3 bg-primary text-white rounded-xl font-bold py-3 hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                        {isEdit ? 'Update Property' : 'Save Property'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PropertyForm;
