import { Container, Row } from "react-bootstrap";
import oreo from '../img/oreo.svg'
import whyImg from '../img/Why EmoBuddy_.svg'
export function WhyEmoBuddy(){
    return(
        <>
            <Container className="">
            <div className="col-12 d-flex justify-content-end px-0">
                    <img src={oreo} className="col-lg-1 col-sm-1 oreo" alt="" />
                </div>
                <div className="container">
                    <Row>
                        <div className="d-flex justify-content-center col-lg-12">
                            <img className="empowerImg" src={whyImg} alt="" />
                        </div>
                    </Row>
                    <Row>
                        <p className="embrace-orange">
                        Embrace a transformative journey with EmoBuddy, where every step <br />empowers you to navigate life's ups and downs with confidence and grace.
                        </p>
                    </Row>
                </div>
                
                {/* YELLOW OVAL */}
                <div className="col-12 mt-5 d-flex justify-content-end px-0">
                    <div className="d-lg-flex col-lg-12 pe-0 ">
                        <div className="col-lg-2 col-sm-0">

                        </div>
                        <div className="col-lg-10 col-sm-12 mx-0 px-0 ">
                            <div className="yellowOval col-lg-12 mx-0">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="col-lg-3">
                                        <p className="whyHead">
                                            1 <span className="whyHeadIn">in</span> 5
                                        </p>
                                    </div>
                                    <div className="col-lg-9 my-auto">
                                        <p className="whyHeadSmaller">
                                        children experience <br />emotional challenges.
                                        </p>
                                    </div>
                                </div>
                                <p className="whyContent">
                                We provide essential tools for <br />understanding and managing emotions <br />effectively, addressing this critical need.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* PINK OVAL */}
                <div className="col-12 mt-5 d-flex justify-content-start px-0">
                    <div className="d-lg-flex col-lg-12 pe-0 ">
                        
                        <div className="col-lg-10 col-sm-12 mx-0 px-0 ">
                            <div className="pinkOval col-lg-12 mx-0">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="col-lg-3">
                                        <p className="whyHead">
                                            80%
                                        </p>
                                    </div>
                                    <div className="col-lg-9 my-auto">
                                        <p className="whyHeadSmaller">
                                        of lifelong success is attributed  <br />to emotional intelligence.
                                        </p>
                                    </div>
                                </div>
                                <p className="whyContent">
                                Our workshops are designed to enhance <br />communication, empathy, and <br />problem-solving skills, crucial for success.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-0">

                        </div>
                    </div>
                </div>



               

                {/* GRAY OVAL */}
                <div className="col-12 mt-5 d-flex justify-content-start px-0">
                    <div className="d-lg-flex col-lg-12 pe-0 ">
                    
                        <div className="col-lg-10 col-sm-12 mx-0 px-0 ">
                            <div className="grayOval col-lg-12 mx-0">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="col-lg-3">
                                        <p className="whyHead">
                                            30%
                                        </p>
                                    </div>
                                    <div className="col-lg-9 my-auto">
                                        <p className="whyHeadSmaller">
                                        of children in need <br /> receive timely support. 
                                        </p>
                                    </div>
                                </div>
                                <p className="whyContent">
                                EmoBuddy bridges this gap, offering <br />accessible, immediate assistance.
                                </p>
                            </div>
                        </div>
 
                        <div className="col-lg-2 col-sm-0">

                        </div>
                    </div>
                </div>

                 {/* GREEN OVAL */}
                 <div className="col-12 mt-5 d-flex justify-content-start px-0 heightCut">
                    <div className="d-lg-flex col-lg-12 pe-0 ">
                    <div className="col-lg-2 col-sm-0">

                    </div>
                        <div className="col-lg-10 col-sm-12 mx-0 px-0 ">
                            <div className="greenOval col-lg-12 mx-0">
                                <div className="col-lg-12 d-flex justify-content-center">
                                    <div className="col-lg-3">
                                        <p className="whyHead">
                                            50%
                                        </p>
                                    </div>
                                    <div className="col-lg-9 my-auto">
                                        <p className="whyHeadSmaller">
                                        of mental health issues   <br />start by age 14.
                                        </p>
                                    </div>
                                </div>
                                <p className="whyContent">
                                EmoBuddy offers early support with  <br />resources that foster resilience, <br />tackling challenges from a young age.
                                </p>
                            </div>
                        </div>
 
                    </div>
                </div>

            </Container>
        </>
    )
}