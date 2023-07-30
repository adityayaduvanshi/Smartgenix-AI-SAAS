const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-[#111827] overflow-auto dark:bg-[#111827]">
      <div className="mx-auto max-w-screen-xl h-full w-full"> {children}</div>
    </div>
  );
};

export default LandingLayout;
