import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Home(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton/>
  // 2. user signed in, but missing username <UsernameForm/>
  // 3. user signed in, has username <SignOutButton/>
  return <main>{user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}</main>;
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider).catch(console.error);
  };

  return (
    <button className='btn-google' onClick={signInWithGoogle}>
      <img src={'/google.png'} /> Sign in with Google
    </button>
  );
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  return <></>;
}
