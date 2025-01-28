function AppContainer({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
    </div>
  )
}

export default AppContainer