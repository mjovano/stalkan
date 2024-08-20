import DashboardLayout from "@/layouts/DashboardLayout";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </>
  );
}
