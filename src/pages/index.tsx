const Index = () => {
  return null;
};

export const getServerSideProps = () => {
  return {
    props: {},
    redirect: {
      destination: "/login",
      permanent: true,
    },
  };
};

export default Index;
