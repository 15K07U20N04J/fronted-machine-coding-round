import { useState } from "react"
function usePasswordGenerator() {

    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    function generatePassword(checkboxData, length) {
        const selectedOption = checkboxData.filter((data) => data.state)

        if (selectedOption <= 0) {
            setErrorMessage("Select at least one option.");
            setPassword("");
            return;
        }

        let charset = "";
        let generatedPassword = "";

        selectedOption.forEach((options) => {
            if(options.title === "Include Uppercase Letters") {
                charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            } else if(options.title === "Include Lowercase Letters") {
                charset += "abcdefghijklmnopqrstuvwxyz"
            } else if(options.title === "Include Numbers") {
                charset += "0123456789"
            } else if(options.title === "Include Symbols") {
                charset += "~`!@#$%^&*()_+=-{[}]|';:?/><.,"
            }
        })

        for(let i =0; i < length; i++) {
            generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        setPassword(generatedPassword);
        setErrorMessage("")
    }



    return { password, errorMessage, generatePassword };

}

export default usePasswordGenerator

