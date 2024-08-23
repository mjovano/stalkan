import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Intermediary = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {  // Redirect to the home page after 1 second
      router.push('/');
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        Signing in...
      </h1>
    </div>
  );
};

export default Intermediary;
