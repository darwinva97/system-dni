import { GetStaticProps } from "next";

const Index = () => {
  return null;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
    redirect: {
      destination: "/login",
      permanent: true,
    },
  };
};

export default Index;
