import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Loader from '../components/Loader';

export default function Home() {
  return (
    <div>
      <Link
        prefetch={false}
        href={{
          pathname: '/[username]',
          query: { username: 'jeffd23' },
        }}
      >
        <a href='Jeff'>Jeff's Profile</a>
      </Link>
      <Loader show/>
    </div>
  );
}