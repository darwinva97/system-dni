import type { GetStaticProps } from "next";

const Index = () => {
  return null;
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
    redirect: {
      destination: "/login",
      permanent: true,
    },
  };
};

export default Index;
