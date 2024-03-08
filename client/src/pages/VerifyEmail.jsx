import { VerificationCode } from "../components/Register/VerificationCode";

export function VerifyEmail() 
{
    return(
        <>
            <div className="d-flex justify-content-center vh-100 align-items-center">
                <div className="d-flex col-12 justify-content-center align-items-center">
                    <div className="col-6 p-4">
                        <VerificationCode />
                    </div>
                </div>
            </div>
        </>
    )
}