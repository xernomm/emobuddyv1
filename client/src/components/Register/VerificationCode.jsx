import '../../style/icons.css'
import React, { useRef, useState } from 'react';
import axios from '../../utils/axios';
import Swal from 'sweetalert2';

export function VerificationCode()
{
    const baseUrl = process.env.REACT_APP_BASE_URL
    const protocol = window.location.protocol;
    const verifyUrl = `${protocol}//${baseUrl}/verify-code`;
    const sendCodeUrl = `${protocol}//${baseUrl}/send-verification-code`;

    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (index, event) => {
        const value = event.target.value;

        // Allow only digits
        if (/^\d*$/.test(value)) {
            const updatedCode = [...verificationCode];
            updatedCode[index] = value;
            setVerificationCode(updatedCode);

            // Move focus to the next input field if not on the last input field
            if (value !== '' && index < 5 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, event) => {
        // Check if backspace key is pressed and the current input field is empty
        if (event.key === 'Backspace' && verificationCode[index] === '') {
            // Move focus to the previous input field if not on the first input field
            if (index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1].focus();
            }
        }
    };
    
    

      const handleSubmit = async (event) => {
        event.preventDefault(); 
        const code = verificationCode.join(''); 
        console.log('Verification code:', code); 
    
        try {
          const response = await axios.post(verifyUrl, { verificationCode: code });
          console.log(response.data); 
          Swal.fire({
            icon: "success",
            title: "Verified!",
            text: "Thank you for verifying!",
            showCancelButton: true,
            confirmButtonText: "Login",
            cancelButtonText: "Close",
          }).then((result) => {
            if (result.isConfirmed) {
              sessionStorage.clear();
              window.location.href = "/login";
            }
          }); 
        } catch (error) {
          setVerificationCode(['', '', '', '', '', '']);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="/contact-us">Why do I have this issue?</a>'
          });
          console.error('Error verifying email:', error.response.data); 
        }
      };

      const sendVerificationCode = async () => {
        try {
          const email = sessionStorage.getItem('userEmail');
      
          // Send the verification code request to the server
          const response = await axios.post(sendCodeUrl, { email });
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "Sent!",
            text: "Please check your email!",
          })
          // Handle success
        } catch (error) {
          console.error('Error sending verification code:', error.response.data);
          Swal.fire({
            icon:"error",
            title:"Oops..",
            text:"Something went wrong.. try again later!"
          })
        }
      };
      

      return(
        <>
            <h1 className="interBlue px18 mb-5 text-center">Enter your verification code</h1>
            <form onSubmit={handleSubmit}>
                <div className="verification-code-container">
                {verificationCode.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            className="verification-code-input"
                            maxLength="1"
                            ref={ref => inputRefs.current[index] = ref}
                            value={digit}
                            onChange={(event) => handleChange(index, event)}
                            onKeyDown={(event) => handleKeyDown(index, event)}
                        />
                    ))}
                </div>
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <button type='submit' className="btn btn-ytp-primary col-5">Verify</button>
                </div>
                <div className='mt-5'>
                    <p className="interBlue px16 text-center">
                        Didn't Receive an email?
                        <span><a href="#" onClick={sendVerificationCode} className='archivoOrange px-16'> Click here.</a></span>
                    </p>
                </div>
            </form>
        </>
      )
}