import LandingPageNavbar from "@/app/(landingpage)/_components/landingpage-navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LandingPageNavbar />
      {children}
    </>
  );
};

export default LandingPageLayout;
