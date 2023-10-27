const Index = () => {
  return null;
};

export const getServerSideProps = () => {
  return {
    props: {},
    redirect: {
      destination: "/admin/me",
      permanent: true,
    },
  };
};

export default Index;
