import React from "react";
import LogoSVG from '../assets/image8.svg';
import ObjectSVG from '../assets/objects1.svg';
import * as Components from '../component';

function App() {
    const [signIn, setSignIn] = React.useState(true);

    // Detect Android device
    const isAndroid = /Android/i.test(navigator.userAgent);

    return (
        <Components.Container>
            {/* Sign Up Form */}
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type="text" placeholder="Name" />
                    <Components.Input type="email" placeholder="Email" />
                    <Components.Input type="password" placeholder="Password" />
                    <Components.Button>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            {/* Sign In Form */}
            <Components.SignInContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Logo src={LogoSVG} alt="AI Talent Finder Logo" />
                    <Components.Input type="email" placeholder="Email" />
                    <Components.Input type="password" placeholder="Password" />
                    <Components.Button>Sign In</Components.Button>
                    <Components.Text>
                        Don't have an account?{" "}
                        <Components.SignUpLink onClick={() => setSignIn(false)}>
                            Sign up
                        </Components.SignUpLink>
                    </Components.Text>
                    <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                </Components.Form>
            </Components.SignInContainer>

            {/* Overlay Container */}
            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => setSignIn(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    {!isAndroid && (
                        <Components.RightOverlayPanel signinIn={signIn}>
                            <img 
                                src={ObjectSVG} 
                                alt="Adinda Illustration" 
                                style={{ width: '400%', height: 'auto', marginTop: '0px' }} 
                            />
                            <Components.Title>Featuring</Components.Title>
                            <Components.Paragraph>
                                Guided Assistance <b>Adinda</b>
                            </Components.Paragraph>
                        </Components.RightOverlayPanel>
                    )}
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    );
}

export default App;
