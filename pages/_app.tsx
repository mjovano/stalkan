import DashboardLayout from "@/layouts/DashboardLayout";
import { useRouter } from 'next/router';
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }: any) {

  const router = useRouter();
  const noLayoutRoutes = ['/login', '/intermediary'];
  const shouldUseLayout = !noLayoutRoutes.includes(router.pathname);

  if (shouldUseLayout) {
    return (
      <>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </>
    );
  }
  else {
    return <Component {...pageProps} />;
  }
}
