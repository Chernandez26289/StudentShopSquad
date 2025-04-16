import "./CreateListing.css";
import Navbar from "../Navbar/Navbar";
import {useState, useEffect} from "react";


//FIXME: 
//Payload Error
function CreateListing(){
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        product: "",
        description: "",
        image: null, 
        price: "",
        username: "",
        email: ""
    });
    const handleFileChange = (event) =>{
        setSelectedFile(event.target.files[0]); 
        if (event.target.files[0]) { 
            //filereader allows you to read file contents intuitively when calling the event
            const reader = new FileReader(); 

            /*onloadend is a callback function that is called  
            when the reader has finished reading the file */
            reader.onloadend = () => {  
                /*base64 allows images to be stored as text,  
                 for later use in the database */
                const base64Image = reader.result;
                setPreview(base64Image);
                setFormData((prevStateData) => 
                    ({...prevStateData, image: base64Image}) 
                );
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleRemoveFile = () =>{
        setSelectedFile(null); 
        setPreview(null); 
        setFormData((prevStateData) => 
            ({...prevStateData, image: null}) 
        );
        document.getElementById("picture").value = ""; //Resets the file input
    };
    const handleChange = (event) =>{
        setFormData({...formData, [event.target.name]: event.target.value});
    }; 
    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        try{
            const response = await fetch("/api/createlisting", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include"
            });
            if (response.ok){
                console.log("Listing created successfully");
            } else {
                console.error("Failed to create listing");
            } 

            const data = await response.json();
            console.log(data);  
            console.log("Listing created successfully: " + data);
        } catch (error) {
            console.error("Create listing error:", error);
        }
    }; 
    useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await fetch('/api/login/status', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const userData = await response.json(); 
                    setFormData(prev => ({
                        ...prev,
                        username: userData.username,
                        email: userData.email
                    }));
                }
            } catch (error) {
                console.error('Error getting user data:', error);
            }
        };
        checkUser();
    }, []);
    return(
        <div className="createlisting-page-container">
            <Navbar />
            <div className="maintitle">Welcome to the Listing Creation Page!</div>
            <div id="about">Please enter listing information below!</div>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div id="productnamecss">
                    <label htmlFor="product">Product name: </label>
                    <input type="text" 
                    id="product" 
                    name="product" 
                    placeholder="Please enter Product name" 
                    required 
                    value={formData.product}
                    onChange={(event) => {handleChange(event);}}
                    />
                </div>    
                <br/> 
                <div id="picturecss"> 
                    <label htmlFor="picture">Picture: </label>
                    <input 
                        type="file" 
                        id="picture" 
                        name="picture" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        required 
                       
                    />
                    {selectedFile && (
                        <div>
                            <p>Uploaded: {selectedFile.name}</p>
                            {preview && (
                                <img 
                                    src={preview} 
                                    alt="Preview" 
                                    style={{ 
                                        maxWidth: '250px', 
                                        maxHeight: '250px', 
                                        marginTop: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '10px'
                                    }}
                                />
                            )} 
                            <br/>
                            <button type="button" onClick={handleRemoveFile}>Remove File</button>
                        </div>
                    )}
                </div>
                <br/>
                <div id="descriptioncss">
                    <label htmlFor="description">Description of state and/or issues: </label>
                    <input 
                    type="description" 
                    id="description" 
                    name="description" 
                    placeholder="Please enter Description" 
                    required
                    value={formData.description}
                    onChange={(event) => {handleChange(event);}}
                    />
                </div> 
                <div id="pricecss"> 
                    <label htmlFor="price">Price: </label> 
                    <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    placeholder="Please enter Price" 
                    required 
                    value={formData.price}
                    onChange={(event) => {handleChange(event);}}
                    />
                </div>
                <br/>
                <div id="submitbutton">
                    <input type="submit" value="Create Listing"/>
                </div>
            </form>
        </div>
    );
}

export default CreateListing;