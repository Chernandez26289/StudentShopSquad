import "./CreateListing.css";
import Navbar from "../Navbar/Navbar";
import {useState} from "react";

function CreateListing(){
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) =>{
        setSelectedFile(event.target.files[0]);
    };

    const handleRemoveFile = () =>{
        setSelectedFile(null);
        document.getElementById("picture").value = ""; //Resets the file input
    };

    return(
        <div className="createlisting-page-container">
            <Navbar />
            <div className="maintitle">Welcome to the Listing Creation page!</div>
            <div id="about">Please enter listing information below!</div>
            <br></br>
            <form>
                <div id="productnamecss">
                    <label htmlFor="productname">Product name: </label>
                    <input type="text" id="productname" name="productname" placeholder="Please enter Product name" required/>
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
                            <button type="button" onClick={handleRemoveFile}>Remove File</button>
                        </div>
                    )}
                </div>
                <br/>
                <div id="emailcss">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" placeholder="Please enter Email" required/>
                </div>
                <br/>
                <div id="descriptioncss">
                    <label htmlFor="description">Description of state and/or issues: </label>
                    <input type="description" id="description" name="description" placeholder="Please enter Description" required/>
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