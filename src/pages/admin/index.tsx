import type { GetStaticProps } from "next";

const Index = () => {
  return null;
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
    redirect: {
      destination: "/admin/me",
      permanent: true,
    },
  };
};

export default Index;
