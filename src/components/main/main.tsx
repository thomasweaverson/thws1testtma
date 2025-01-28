function Main({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <main className="flex-1 overflow-y-auto min-h-full flex flex-col justify-center my-1">
      {children}
    </main>
  );
}

export default Main;